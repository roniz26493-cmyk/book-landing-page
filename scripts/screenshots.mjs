#!/usr/bin/env node
/**
 * בדיקת צילומי מסך — עמוד מלא בכמה רוחבים, דרך Chrome Headless ו-DevTools Protocol.
 * ללא תלויות: Node 22+ (WebSocket מובנה) ו-Google Chrome מותקן.
 *
 * שימוש:
 *   npm run shots                          # build + preview אוטומטי, ואז צילום
 *   npm run shots -- --url http://localhost:5173/   # צילום שרת פיתוח שכבר רץ
 *   npm run shots -- --only mobile         # רק תצוגה אחת (desktop|tablet|mobile|reduced)
 *
 * תוצרים: screenshots/<תאריך-שעה>/{desktop,tablet,mobile,reduced}.jpg + report.json
 * קוד יציאה 1 אם נמצאה גלילה אופקית או שגיאה/אזהרה/exception בקונסולה.
 *
 * הערה: אנימציות החשיפה בגלילה (.reveal) מופעלות בכוח לפני הצילום, כי בצילום
 * עמוד מלא ה-rootMargin התחתון מסתיר את הבלוקים הנמוכים — בגלישה רגילה הם מופיעים.
 */
import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const args = process.argv.slice(2)
const arg = (name) => {
  const i = args.indexOf(`--${name}`)
  return i === -1 ? undefined : args[i + 1]
}

const VIEWS = {
  desktop: { width: 1440, height: 900, mobile: false },
  tablet: { width: 820, height: 1180, mobile: true },
  mobile: { width: 390, height: 844, mobile: true },
  reduced: { width: 1440, height: 900, mobile: false, reducedMotion: true },
}

const CHROME =
  process.env.CHROME_PATH ||
  [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].find((p) => fs.existsSync(p))

if (!CHROME) {
  console.error('לא נמצא Google Chrome. אפשר להגדיר CHROME_PATH.')
  process.exit(2)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function startPreview() {
  console.log('• build…')
  const build = spawnSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit' })
  if (build.status !== 0) {
    console.error('ה-Build נכשל')
    process.exit(1)
  }
  const port = 4179
  console.log(`• vite preview על פורט ${port}…`)
  const server = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], {
    cwd: ROOT,
    stdio: 'ignore',
  })
  const url = `http://localhost:${port}/`
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(url)).ok) return { url, server }
    } catch {
      /* not up yet */
    }
    await sleep(200)
  }
  server.kill()
  throw new Error('שרת ה-preview לא עלה')
}

async function capture(url, view, outFile) {
  const port = 9300 + Math.floor(Math.random() * 600)
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'shots-chrome-'))
  const chrome = spawn(
    CHROME,
    ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'],
    { stdio: 'ignore' },
  )

  try {
    let target
    for (let i = 0; i < 60 && !target; i++) {
      try {
        target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page')
      } catch {
        await sleep(200)
      }
    }
    if (!target) throw new Error('Chrome לא עלה')

    const ws = new WebSocket(target.webSocketDebuggerUrl)
    await new Promise((r, j) => {
      ws.addEventListener('open', r)
      ws.addEventListener('error', j)
    })
    let id = 0
    const pending = new Map()
    const logs = []
    ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data)
      if (m.id && pending.has(m.id)) {
        pending.get(m.id)(m)
        pending.delete(m.id)
      }
      if (m.method === 'Runtime.consoleAPICalled')
        logs.push({ level: m.params.type, text: m.params.args.map((a) => a.value ?? a.description).join(' ') })
      if (m.method === 'Runtime.exceptionThrown')
        logs.push({ level: 'exception', text: m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text })
      if (m.method === 'Log.entryAdded')
        logs.push({ level: m.params.entry.level, text: `${m.params.entry.text} ${m.params.entry.url || ''}`.trim() })
    })
    const send = (method, params = {}) =>
      new Promise((r) => {
        const i = ++id
        pending.set(i, r)
        ws.send(JSON.stringify({ id: i, method, params }))
      })

    await send('Runtime.enable')
    await send('Log.enable')
    await send('Page.enable')
    const scale = view.mobile ? 2 : 1
    await send('Emulation.setDeviceMetricsOverride', { width: view.width, height: view.height, deviceScaleFactor: scale, mobile: view.mobile })
    if (view.mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true })
    if (view.reducedMotion)
      await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })

    await send('Page.navigate', { url })
    await sleep(3500)

    const m = await send('Runtime.evaluate', {
      expression:
        'JSON.stringify({h: document.documentElement.scrollHeight, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth})',
      returnByValue: true,
    })
    const { h, sw, cw } = JSON.parse(m.result.result.value)

    // צילום עמוד מלא: חלון בגובה העמוד, וחשיפת כל בלוקי ה-reveal
    await send('Emulation.setDeviceMetricsOverride', { width: view.width, height: h, deviceScaleFactor: scale, mobile: view.mobile })
    await send('Runtime.evaluate', {
      expression: "document.querySelectorAll('.reveal').forEach((el) => el.setAttribute('data-visible', 'true'))",
    })
    await sleep(2200)
    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 85, captureBeyondViewport: true })
    fs.writeFileSync(outFile, Buffer.from(shot.result.data, 'base64'))
    ws.close()

    const problems = logs.filter((l) => ['error', 'warning', 'exception', 'assert'].includes(l.level))
    return { file: path.relative(ROOT, outFile), width: view.width, pageHeight: h, horizontalOverflow: sw > cw, problems, logs }
  } finally {
    // מחכים ש-Chrome ייסגר לפני מחיקת הפרופיל הזמני, אחרת הוא עוד כותב אליו
    const exited = new Promise((r) => chrome.once('exit', r))
    chrome.kill()
    await Promise.race([exited, sleep(3000)])
    try {
      fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
    } catch {
      /* תיקייה זמנית במערכת — לא קריטי אם נשארה */
    }
  }
}

const only = arg('only')
const names = only ? only.split(',') : Object.keys(VIEWS)
for (const n of names) {
  if (!VIEWS[n]) {
    console.error(`תצוגה לא מוכרת: ${n}. אפשרויות: ${Object.keys(VIEWS).join(', ')}`)
    process.exit(2)
  }
}

const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')
const outDir = path.resolve(ROOT, arg('out') || path.join('screenshots', stamp))
fs.mkdirSync(outDir, { recursive: true })

let server
let url = arg('url')
if (!url) ({ url, server } = await startPreview())

const results = []
try {
  for (const n of names) {
    process.stdout.write(`• ${n} (${VIEWS[n].width}px)… `)
    const r = await capture(url, VIEWS[n], path.join(outDir, `${n}.jpg`))
    results.push({ view: n, ...r })
    console.log(r.horizontalOverflow || r.problems.length ? 'בעיות' : 'תקין')
  }
} finally {
  server?.kill()
}

fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify({ url, date: new Date().toISOString(), results }, null, 2))

console.log(`\nתוצרים: ${path.relative(ROOT, outDir)}/`)
let failed = false
for (const r of results) {
  const issues = []
  if (r.horizontalOverflow) issues.push('גלילה אופקית')
  if (r.problems.length) issues.push(`${r.problems.length} הודעות קונסולה: ${r.problems.map((p) => `${p.level}: ${p.text}`).join(' | ')}`)
  console.log(`  ${r.view.padEnd(8)} ${String(r.width).padStart(4)}px  גובה ${r.pageHeight}px  ${issues.length ? '✗ ' + issues.join('; ') : '✓'}`)
  if (issues.length) failed = true
}
process.exit(failed ? 1 : 0)
