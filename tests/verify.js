#!/usr/bin/env node
/* ==========================================================================
   TOEIC 模擬測驗 — 自動化驗收腳本（不需安裝任何套件，Node 22+）
   用法：  node tests/verify.js           （靜態檢查 + 手機瀏覽器檢查）
           node tests/verify.js --static  （只做靜態檢查，sync.sh 用這個）
   ========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');
const { spawn, execFileSync } = require('child_process');
const os = require('os');

const ROOT = path.resolve(__dirname, '..');
const SUBPATH = '/toeic/';
const results = [];
function check(ok, label, detail) {
  results.push({ ok: !!ok, label, detail });
  console.log((ok ? '  ✅ ' : '  ❌ ') + label + (detail ? '  — ' + detail : ''));
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const dataFiles = () => fs.readdirSync(path.join(ROOT, 'data')).filter((f) => f.endsWith('.js')).sort();

function loadData() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  dataFiles().forEach((f) => vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', f), 'utf8'), ctx, { filename: f }));
  return ctx.window;
}

/* ---------------------------------------------------------------- 1. 題庫 */
function checkQuestionBanks() {
  console.log('\n【1】題庫完整性');
  const w = loadData();
  const banks = Object.entries(w.BESTEP_DATA || {});
  check(banks.length >= 2, '至少一回聽力＋閱讀題庫', banks.map(([k, d]) => k + ' ' + d.questions.length + ' 題').join('、'));
  banks.forEach(([key, d]) => {
    const tag = d.testId + (d.section === 'listening' ? 'L' : 'R');
    const bad = [];
    const ids = new Set();
    let lastSrc = '';
    d.questions.forEach((q) => {
      if (ids.has(q.id)) bad.push(q.id + ' 題號重複');
      ids.add(q.id);
      const letters = (q.options || []).map((_, i) => 'ABCDE'[i]);
      String(q.answer).split('').forEach((a) => { if (letters.indexOf(a) === -1) bad.push(q.id + ' 答案 ' + q.answer + ' 不在選項內'); });
      if (!q.explanation) bad.push(q.id + ' 缺詳解');
      if (!(q.recommendedSeconds > 0)) bad.push(q.id + ' 缺建議秒數');
      if (q.script && q.script.length) lastSrc = q.script.map((l) => l.text).join(' ');
      else if (q.passage) lastSrc = (q.passage.title || '') + ' ' + (q.passage.blocks || []).map((b) => b.text || (b.items || []).join(' ')).join(' ');
      const n = ((w.BESTEP_NOTES || {})[tag] || {})[q.id] || {};
      (n.ev || []).forEach((e) => { if (lastSrc.indexOf(e) === -1) bad.push(q.id + ' 依據句找不到：' + e.slice(0, 30)); });
      (n.kw || []).forEach((k) => { if (q.question.toLowerCase().indexOf(k.toLowerCase()) === -1) bad.push(q.id + ' 關鍵字不在題目：' + k); });
      if (!n.oz || n.oz.length !== (q.options || []).length) bad.push(q.id + ' 選項中文數量不符');
      if (d.section === 'listening' && !(q.script && q.script.length)) bad.push(q.id + ' 缺逐字稿');
    });
    const dist = {};
    d.questions.forEach((q) => { dist[q.answer] = (dist[q.answer] || 0) + 1; });
    check(!bad.length, key + '：' + d.questions.length + ' 題皆有答案、詳解、配速、中文、答案依據', bad.slice(0, 3).join(' | ') || '答案分布 ' + JSON.stringify(dist));
  });
}

/* ------------------------------------------------------- 2. 路徑與語法 */
function checkPathsAndSyntax() {
  console.log('\n【2】檔案路徑與語法');
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const refs = [];
  html.replace(/<(?:script|link|img|source|audio)\b[^>]*?\s(?:src|href)=["']([^"']+)["']/gi, (_, u) => refs.push(u));
  const local = refs.filter((u) => !/^(https?:)?\/\//i.test(u) && !u.startsWith('data:') && !u.startsWith('#'));
  check(local.every((u) => !u.startsWith('/')), 'index.html 全部使用相對路徑', local.length + ' 個本機引用');
  const missing = local.filter((u) => !fs.existsSync(path.join(ROOT, u.split(/[?#]/)[0])));
  check(missing.length === 0, 'index.html 引用的檔案都存在', missing.join(', ') || 'OK');
  const notLoaded = dataFiles().filter((f) => local.indexOf('data/' + f) === -1);
  check(notLoaded.length === 0, 'data/ 底下每個檔案都有在 index.html 載入', notLoaded.join(', ') || 'OK');
  const js = ['js/app.js', 'js/dictionary.js', 'js/records.js'].concat(dataFiles().map((f) => 'data/' + f));
  const syntaxErr = [];
  js.forEach((f) => {
    try { execFileSync(process.execPath, ['--check', path.join(ROOT, f)], { stdio: 'pipe' }); }
    catch (e) { syntaxErr.push(f + ': ' + String(e.stderr || e.message).split('\n').slice(0, 3).join(' ')); }
  });
  check(syntaxErr.length === 0, '所有 JS 檔語法正確（node --check）', syntaxErr.join(' | ') || js.length + ' 個檔案');
}

/* ------------------------------------------------------- 2b. 聽力音檔 */
function checkAudio() {
  console.log('\n【2b】聽力音檔與時間軸');
  const w = loadData();
  Object.values(w.BESTEP_DATA || {}).filter((d) => d.section === 'listening').forEach((d) => {
    const tl = (w.BESTEP_AUDIO || {})[String(d.testId)];
    if (!tl) { check(false, 'Test ' + d.testId + ' 有聽力音檔（請執行 python3 tools/build_audio.py）'); return; }
    const file = path.join(ROOT, tl.src);
    check(fs.existsSync(file) && !tl.src.startsWith('/'), 'Test ' + d.testId + ' 音檔存在', tl.src + ' · ' + (tl.duration / 60).toFixed(1) + ' 分鐘');
    const groupFirsts = [];
    let prev = null;
    d.questions.forEach((q) => { const g = q.group || 'Q' + q.id; if (g !== prev) groupFirsts.push(q.id); prev = g; });
    const firsts = tl.segments.map((s) => s.firstQ);
    let contiguous = true;
    tl.segments.forEach((s, i) => { if (s.end <= s.start || (i && Math.abs(s.start - tl.segments[i - 1].end) > 0.02)) contiguous = false; });
    check(JSON.stringify(firsts) === JSON.stringify(groupFirsts) && contiguous, 'Test ' + d.testId + ' 時間軸 ' + tl.segments.length + ' 段，與題組一一對應', contiguous ? 'OK' : '時間軸不連續');
    check((tl.gaps || []).length >= tl.segments.length, 'Test ' + d.testId + ' 已偵測作答空白（跳過等待用）', (tl.gaps || []).length + ' 段');
  });
}

/* ------------------------------------------------- 3. 手機瀏覽器檢查 */
function findBrowser() {
  return [process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find((p) => { try { return fs.existsSync(p); } catch (e) { return false; } });
}

function startServer() {
  // 模擬 GitHub Pages：網站在子路徑底下，並支援 Range（音檔跳轉用）
  const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg' };
  const notFound = [];
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0]);
    if (!url.startsWith(SUBPATH)) { notFound.push(url); res.writeHead(404); res.end(); return; }
    const file = path.join(ROOT, url.slice(SUBPATH.length) || 'index.html');
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { notFound.push(url); res.writeHead(404); res.end(); return; }
    const type = mime[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const buf = fs.readFileSync(file);
    const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
    if (range) {
      const start = range[1] ? Number(range[1]) : 0;
      const end = range[2] ? Math.min(Number(range[2]), buf.length - 1) : buf.length - 1;
      res.writeHead(206, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Range': 'bytes ' + start + '-' + end + '/' + buf.length, 'Content-Length': end - start + 1 });
      res.end(buf.subarray(start, end + 1));
      return;
    }
    res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Length': buf.length });
    res.end(buf);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port, notFound })));
}

async function checkMobile() {
  console.log('\n【3】手機版（375 × 812）實機瀏覽器檢查');
  const browserPath = findBrowser();
  if (!browserPath) { check(true, '找不到 Chrome／Edge，略過瀏覽器檢查'); return; }
  const { server, port, notFound } = await startServer();
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'toeic-cdp-'));
  const debugPort = 9300 + Math.floor(Math.random() * 500);
  const proc = spawn(browserPath, ['--headless=new', '--disable-gpu', '--autoplay-policy=no-user-gesture-required', '--mute-audio', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=' + debugPort, '--user-data-dir=' + profile, 'about:blank'], { stdio: 'ignore' });
  let ws;
  const errors = [];
  try {
    let target;
    for (let i = 0; i < 50 && !target; i += 1) {
      await sleep(200);
      try { target = (await (await fetch('http://127.0.0.1:' + debugPort + '/json/list')).json()).find((t) => t.type === 'page'); } catch (e) { /* not ready */ }
    }
    if (!target) throw new Error('無法連線到無頭瀏覽器');
    ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
    let seq = 0; const pending = new Map();
    ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(JSON.stringify(m.error))) : p.resolve(m.result); return; }
      if (m.method === 'Runtime.exceptionThrown') errors.push((m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text);
      if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push(m.params.args.map((a) => a.value || a.description || '').join(' '));
    };
    const send = (method, params) => new Promise((resolve, reject) => { const id = ++seq; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params: params || {} })); });
    const evaluate = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true, userGesture: true }); if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text); return r.result.value; };
    const shot = async (name) => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.mkdirSync(path.join(ROOT, 'tests', 'screenshots'), { recursive: true }); fs.writeFileSync(path.join(ROOT, 'tests', 'screenshots', name), Buffer.from(r.data, 'base64')); };
    const overflow = () => evaluate('document.documentElement.scrollWidth - window.innerWidth');
    const load = async () => {
      await send('Page.navigate', { url: 'http://127.0.0.1:' + port + SUBPATH });
      for (let i = 0; i < 60; i += 1) { await sleep(200); if (await evaluate('Boolean(window.BESTEP_APP && window.TOEIC_RECORDS)').catch(() => false)) break; }
      await sleep(400);
    };
    const submitNow = async () => {
      await evaluate('document.querySelector(\'[data-action="confirm-submit"]\').click()');
      await sleep(300);
      await evaluate('document.querySelector(\'#submitModal [data-action="submit-exam"]\').click()');
      await sleep(900);
    };

    await send('Runtime.enable'); await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
    await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
    await load();

    check(notFound.length === 0, '子路徑 ' + SUBPATH + ' 下所有資源載入成功', notFound.join(', ') || 'OK');
    const lobby = await evaluate('({ cards: document.querySelectorAll(".test-card").length, hist: !!document.querySelector("#historyPanel .hist-head"), empty: !!document.querySelector("#historyPanel .hist-empty") })');
    check(lobby.cards >= 1 && lobby.hist && lobby.empty, '大廳顯示試題卡片與「我的成績紀錄」（目前沒有紀錄）', JSON.stringify(lobby));
    check(await overflow() <= 1, '大廳無水平捲動');
    await shot('t01-lobby.png');

    // 完整測驗：聽力
    await evaluate('window.BESTEP_APP.startExam(1, "full")');
    await sleep(500);
    const lis = await evaluate(`(async () => {
      const s = window.BESTEP_APP.getState();
      const audioOnly = document.querySelectorAll('.option-text.audio-only').length;
      document.querySelector('[data-action="official-start"]').click();
      const a = s.official.audio;
      for (let i = 0; i < 50 && !(a.readyState >= 1); i += 1) await new Promise((r) => setTimeout(r, 100));
      await new Promise((r) => setTimeout(r, 500));
      const g = s.official.timeline.gaps[0];
      a.currentTime = g[0] + 1;
      await new Promise((r) => setTimeout(r, 700));
      document.getElementById('skipGapBtn').click();
      await new Promise((r) => setTimeout(r, 300));
      const skipped = a.currentTime >= g[1] - 0.6;
      const seg = s.official.timeline.segments.find((x) => x.firstQ === 10);
      a.currentTime = seg.start + 1;
      await new Promise((r) => setTimeout(r, 1200));
      const grp = s.sections.listening.groups[s.listeningGroupIndex].questions.map((q) => q.num).join('-');
      return { audioOnly, playing: !a.paused, skipped, grp };
    })()`);
    check(lis.audioOnly === 3 && lis.playing, 'Part 2 選項只用聽的（畫面不顯示選項文字），音檔連續播放', JSON.stringify(lis));
    check(lis.skipped && lis.grp === '10-11-12', '可跳過作答空白；播到 Part 3 自動切到第 10–12 題', JSON.stringify(lis));
    check(await overflow() <= 1, '聽力畫面無水平捲動');
    await shot('t02-listening.png');

    // 全部答對後交卷 → 估計總分 990，並寫入紀錄
    await evaluate('(() => { const s = window.BESTEP_APP.getState(); ["listening","reading"].forEach((k) => s.sections[k].questions.forEach((q) => { s.answers[q.key] = q.answer.slice(); })); })()');
    await submitNow();
    const r1 = await evaluate(`(() => ({ view: window.BESTEP_APP.getState().view, cards: Array.from(document.querySelectorAll('.score-card')).map((c) => c.textContent.replace(/\\s+/g, ' ')), groups: document.querySelectorAll('.review-group').length, recs: window.TOEIC_RECORDS.list().length }))()`);
    check(r1.view === 'review' && /990/.test(r1.cards[0] || '') && /495/.test(r1.cards[1] || ''), '交卷後顯示估計總分（990）與聽力／閱讀估分', r1.cards.join(' | '));
    check(r1.recs === 1 && r1.groups >= 15, '自動寫入一筆成績紀錄；檢討依題組呈現', JSON.stringify({ recs: r1.recs, groups: r1.groups }));
    await shot('t03-review.png');

    // 只考閱讀：題組一次顯示、配速圓盤，答對一半後交卷
    await evaluate('window.BESTEP_APP.startExam(1, "reading")');
    await sleep(500);
    const rd = await evaluate(`(() => {
      const s = window.BESTEP_APP.getState();
      const q = s.sections.reading.questions.find((x) => x.num === 121);
      document.querySelector('.answer-cell[data-key="' + q.key + '"]').click();
      const cards = document.querySelectorAll('.question-panel .question-card').length;
      const dial = document.getElementById('paceDial');
      s.sections.reading.questions.forEach((x, i) => { s.answers[x.key] = i % 2 ? x.answer.slice() : ['E']; });
      return { cards, dial: dial && !dial.hidden };
    })()`);
    check(rd.cards === 5 && rd.dial, '閱讀雙篇題組 5 題一次顯示，上方有配速圓盤', JSON.stringify(rd));
    check(await overflow() <= 1, '閱讀畫面無水平捲動');
    await shot('t04-reading.png');
    await submitNow();

    // 重新整理：學習曲線與紀錄表
    await load();
    const hist = await evaluate(`(() => {
      const rows = document.querySelectorAll('#historyPanel .hist-table tbody tr').length;
      const totalLine = !!document.querySelector('#historyPanel .hc-line');
      document.querySelector('[data-rec-tab="reading"]').click();
      const readingPts = document.querySelectorAll('#historyPanel .hc-pt').length;
      return { rows, totalLine, readingPts, stats: document.querySelector('.hist-stats').textContent.replace(/\\s+/g, ' ') };
    })()`);
    check(hist.rows === 2 && hist.totalLine && hist.readingPts === 2, '重新整理後紀錄還在：2 筆紀錄與學習曲線（可切換總分／聽力／閱讀）', JSON.stringify(hist));
    check(await overflow() <= 1, '紀錄區無水平捲動');
    await evaluate('document.getElementById("historyPanel").scrollIntoView()');
    await sleep(300);
    await shot('t05-history.png');

    check(errors.length === 0, '整個流程沒有任何 JavaScript 錯誤', errors.slice(0, 3).join(' | ') || 'OK');
    console.log('  📸 截圖已存到 tests/screenshots/');
  } catch (e) {
    check(false, '瀏覽器檢查執行失敗', e.message);
  } finally {
    try { ws && ws.close(); } catch (e) { /* ignore */ }
    proc.kill();
    server.close();
  }
}

(async () => {
  console.log('TOEIC 模擬測驗 自動化驗收  (' + ROOT + ')');
  checkQuestionBanks();
  checkPathsAndSyntax();
  checkAudio();
  if (!process.argv.includes('--static')) await checkMobile();
  const failed = results.filter((r) => !r.ok);
  console.log('\n結果：' + (results.length - failed.length) + ' / ' + results.length + ' 項通過' + (failed.length ? '，' + failed.length + ' 項失敗' : ' 🎉'));
  process.exit(failed.length ? 1 : 0);
})();
