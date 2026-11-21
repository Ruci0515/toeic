/* ==========================================================================
   成績紀錄與學習曲線
   - 每次交卷（app.js 發出 exam:submitted 事件）自動存一筆：日期時間、回數、模式、
     聽力／閱讀答對數與估計分數、總分、用時。
   - 紀錄存在這台裝置（localStorage）。
   - 雲端同步（選用）：貼上只有「gist」權限的 GitHub token，紀錄會存到你自己的
     私密 Gist（toeic-records.json），手機、平板、電腦共用同一份。token 只存在
     這台裝置的瀏覽器裡，不會出現在網站原始碼。
   ========================================================================== */
(function () {
  'use strict';

  const KEY = 'toeic-records-v1';
  const CFG_KEY = 'toeic-sync-v1';
  const GOAL_KEY = 'toeic-goal-v1';
  const FILE = 'toeic-records.json';
  const API = 'https://api.github.com';

  const ui = { tab: 'total', syncOpen: false, status: '', busy: false };

  /* ---------- 儲存 ---------- */
  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* 私密模式等情況寫不進去就算了 */ }
  }
  const loadAll = () => readJson(KEY, []);
  const saveAll = (list) => writeJson(KEY, list);
  const cfg = () => readJson(CFG_KEY, {});
  const setCfg = (c) => writeJson(CFG_KEY, c);
  function goal() {
    const v = Number(readJson(GOAL_KEY, 650));
    return v > 0 ? v : 650;
  }

  function merge(a, b) {
    const map = new Map();
    a.concat(b).forEach((r) => {
      if (!r || !r.id) return;
      const prev = map.get(r.id);
      map.set(r.id, prev && prev.deleted ? prev : r);
    });
    return Array.from(map.values()).sort((x, y) => String(x.ts).localeCompare(String(y.ts)));
  }
  const visible = () => loadAll().filter((r) => !r.deleted);

  /* ---------- 雲端（GitHub Gist） ---------- */
  async function gh(path, options) {
    const c = cfg();
    const res = await fetch(API + path, Object.assign({}, options, {
      headers: { Authorization: 'Bearer ' + c.token, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' }
    }));
    if (res.status === 401) throw new Error('token 無效或已過期');
    if (!res.ok) throw new Error('GitHub 回應 ' + res.status);
    return res.status === 204 ? null : res.json();
  }

  async function pull() {
    const c = cfg();
    const gist = await gh('/gists/' + c.gistId);
    const file = gist.files && gist.files[FILE];
    if (!file) return;
    const text = file.truncated ? await (await fetch(file.raw_url)).text() : file.content;
    let remote = [];
    try { const data = JSON.parse(text || '{}'); remote = Array.isArray(data) ? data : (data.records || []); } catch (e) { remote = []; }
    saveAll(merge(loadAll(), remote));
  }

  async function push() {
    const c = cfg();
    await gh('/gists/' + c.gistId, {
      method: 'PATCH',
      body: JSON.stringify({ files: { [FILE]: { content: JSON.stringify({ version: 1, updated: new Date().toISOString(), records: loadAll() }, null, 1) } } })
    });
  }

  async function sync(quiet) {
    const c = cfg();
    if (!c.token || !c.gistId || ui.busy) return;
    ui.busy = true;
    ui.status = '同步中…';
    render();
    try {
      await pull();
      await push();
      c.lastSync = new Date().toISOString();
      setCfg(c);
      ui.status = '已同步 ' + fmtTime(c.lastSync);
    } catch (e) {
      ui.status = '同步失敗：' + e.message + (quiet ? '' : '（紀錄仍保存在這台裝置）');
    }
    ui.busy = false;
    render();
  }

  async function connect(token) {
    const clean = String(token || '').trim();
    if (!clean) { ui.status = '請先貼上 token'; render(); return; }
    setCfg({ token: clean });
    ui.busy = true;
    ui.status = '連結中…';
    render();
    try {
      // 先找有沒有其他裝置已經建立的紀錄 Gist，有就共用
      const gists = await gh('/gists?per_page=100');
      const found = (gists || []).find((g) => g.files && g.files[FILE]);
      let gistId = found && found.id;
      if (!gistId) {
        const created = await gh('/gists', {
          method: 'POST',
          body: JSON.stringify({ description: 'TOEIC 模擬測驗成績紀錄（自動同步）', public: false,
            files: { [FILE]: { content: JSON.stringify({ version: 1, records: loadAll() }, null, 1) } } })
        });
        gistId = created.id;
      }
      setCfg({ token: clean, gistId });
      ui.busy = false;
      ui.syncOpen = false;
      await sync();
    } catch (e) {
      setCfg({});
      ui.busy = false;
      ui.status = '連結失敗：' + e.message;
      render();
    }
  }

  function disconnect() {
    setCfg({});
    ui.status = '已中斷雲端同步（這台裝置的紀錄保留）';
    render();
  }

  /* ---------- 新增／刪除 ---------- */
  function addRecord(detail) {
    const rec = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      ts: new Date().toISOString(),
      testId: detail.testId,
      testLabel: detail.testLabel,
      mode: detail.mode,
      auto: detail.auto,
      durationSec: detail.durationSec,
      listening: detail.listening,
      reading: detail.reading,
      total: detail.total
    };
    saveAll(merge(loadAll(), [rec]));
    render();
    sync(true);
    return rec;
  }

  function removeRecord(id) {
    const list = loadAll().map((r) => (r.id === id ? Object.assign({}, r, { deleted: true }) : r));
    saveAll(list);
    render();
    sync(true);
  }

  /* ---------- 呈現 ---------- */
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = (n) => String(n).padStart(2, '0');
  function fmtDate(iso) { const d = new Date(iso); return d.getFullYear() + '/' + pad(d.getMonth() + 1) + '/' + pad(d.getDate()); }
  function fmtTime(iso) { const d = new Date(iso); return pad(d.getMonth() + 1) + '/' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); }
  function fmtDur(sec) { const s = Math.max(0, Math.round(sec || 0)); return Math.floor(s / 60) + ':' + pad(s % 60); }
  const modeName = (m) => (m === 'full' ? '完整' : m === 'listening' ? '只聽力' : '只閱讀');

  function seriesFor(tab, list) {
    if (tab === 'listening') return list.filter((r) => r.listening).map((r) => ({ r, v: r.listening.score }));
    if (tab === 'reading') return list.filter((r) => r.reading).map((r) => ({ r, v: r.reading.score }));
    return list.filter((r) => r.total != null).map((r) => ({ r, v: r.total }));
  }

  function chartSvg(tab, list) {
    const pts = seriesFor(tab, list);
    const max = tab === 'total' ? 990 : 495;
    const target = tab === 'total' ? goal() : Math.round(goal() / 2);
    if (!pts.length) {
      return '<div class="hist-empty">' + (tab === 'total' ? '還沒有「完整測驗」的紀錄。做一次完整測驗就會出現總分曲線。' : '還沒有這一科的紀錄。') + '</div>';
    }
    const W = 640, H = 230, L = 44, R = 16, T = 16, B = 34;
    const iw = W - L - R, ih = H - T - B;
    const x = (i) => L + (pts.length === 1 ? iw / 2 : (iw * i) / (pts.length - 1));
    const y = (v) => T + ih - (ih * v) / max;
    const ticks = tab === 'total' ? [0, 200, 400, 600, 800, 990] : [0, 100, 200, 300, 400, 495];
    let g = '';
    ticks.forEach((t) => {
      g += '<line class="hc-grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(t).toFixed(1) + '" y2="' + y(t).toFixed(1) + '"/>' +
        '<text class="hc-tick" x="' + (L - 8) + '" y="' + (y(t) + 4).toFixed(1) + '" text-anchor="end">' + t + '</text>';
    });
    g += '<line class="hc-goal" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(target).toFixed(1) + '" y2="' + y(target).toFixed(1) + '"/>' +
      '<text class="hc-goal-label" x="' + (W - R) + '" y="' + (y(target) - 6).toFixed(1) + '" text-anchor="end">目標 ' + target + '</text>';
    const path = pts.map((p, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(p.v).toFixed(1)).join(' ');
    g += '<path class="hc-line" d="' + path + '"/>';
    const step = Math.max(1, Math.ceil(pts.length / 6));
    pts.forEach((p, i) => {
      const label = fmtDate(p.r.ts).slice(5) + ' · ' + p.r.testLabel + ' · ' + p.v + ' 分';
      g += '<g class="hc-pt" tabindex="0" data-tip="' + esc(label) + '">' +
        '<circle class="hc-hit" cx="' + x(i).toFixed(1) + '" cy="' + y(p.v).toFixed(1) + '" r="14"/>' +
        '<circle class="hc-dot" cx="' + x(i).toFixed(1) + '" cy="' + y(p.v).toFixed(1) + '" r="4.5"/>' +
        '<title>' + esc(label) + '</title></g>';
      if (i % step === 0 || i === pts.length - 1) {
        g += '<text class="hc-tick" x="' + x(i).toFixed(1) + '" y="' + (H - 12) + '" text-anchor="middle">' + fmtDate(p.r.ts).slice(5) + '</text>';
      }
    });
    const last = pts[pts.length - 1];
    g += '<text class="hc-last" x="' + Math.min(x(pts.length - 1), W - R - 4).toFixed(1) + '" y="' + (y(last.v) - 12).toFixed(1) + '" text-anchor="' + (pts.length > 1 ? 'end' : 'middle') + '">' + last.v + '</text>';
    return '<div class="hist-chart-wrap"><svg class="hist-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + (tab === 'total' ? '估計總分' : tab === 'listening' ? '聽力估計分數' : '閱讀估計分數') + '學習曲線">' + g + '</svg><div class="hc-tip" hidden></div></div>';
  }

  function render() {
    const host = document.getElementById('historyPanel');
    if (!host) return;
    const list = visible();
    const totals = list.filter((r) => r.total != null);
    const best = totals.length ? Math.max.apply(null, totals.map((r) => r.total)) : null;
    const latest = totals.length ? totals[totals.length - 1].total : null;
    const first = totals.length ? totals[0].total : null;
    const c = cfg();
    const connected = Boolean(c.token && c.gistId);

    const rows = list.slice().reverse().map((r) => (
      '<tr>' +
        '<td><b>' + fmtDate(r.ts) + '</b><small>' + fmtTime(r.ts).slice(6) + '</small></td>' +
        '<td>' + esc(r.testLabel) + '<small>' + modeName(r.mode) + (r.auto ? '・時間到' : '') + '</small></td>' +
        '<td>' + (r.listening ? '<b>' + r.listening.score + '</b><small>' + r.listening.correct + '/' + r.listening.total + '</small>' : '—') + '</td>' +
        '<td>' + (r.reading ? '<b>' + r.reading.score + '</b><small>' + r.reading.correct + '/' + r.reading.total + '</small>' : '—') + '</td>' +
        '<td>' + (r.total != null ? '<b class="hist-total">' + r.total + '</b>' : '—') + '</td>' +
        '<td>' + fmtDur(r.durationSec) + '</td>' +
        '<td><button type="button" class="hist-del" data-rec-del="' + esc(r.id) + '" aria-label="刪除這筆紀錄">✕</button></td>' +
      '</tr>'
    )).join('');

    const syncBox = ui.syncOpen
      ? '<div class="hist-sync-form">' +
          '<p><b>讓手機、平板、電腦共用成績紀錄：</b></p>' +
          '<ol>' +
            '<li>到 GitHub → Settings → Developer settings → Personal access tokens → <b>Tokens (classic)</b> → Generate new token。</li>' +
            '<li>Note 填「TOEIC 紀錄」，Expiration 選 No expiration 或一年，<b>只勾 gist</b> 這一個權限，產生後複製。</li>' +
            '<li>貼在下面按「連結」。每台裝置第一次使用時都貼一次即可，會自動找到同一份紀錄。</li>' +
          '</ol>' +
          '<div class="hist-sync-row"><input type="password" id="histToken" autocomplete="off" placeholder="貼上 ghp_ 開頭的 token"><button type="button" class="btn btn-primary btn-sm" data-rec-act="connect">連結</button></div>' +
          '<p class="hist-note">token 只存在這台裝置的瀏覽器；紀錄存在你帳號下的私密 Gist，只有你看得到。</p>' +
        '</div>'
      : '';

    host.innerHTML =
      '<div class="hist-head">' +
        '<div><h2 id="historyTitle">📈 我的成績紀錄</h2><p>每次交卷自動記錄日期、時間、分數與用時。分數是依答對率換算的估計值。</p></div>' +
        '<div class="hist-sync">' +
          (connected
            ? '<span class="hist-badge ok">☁️ 雲端同步中</span><button type="button" class="btn btn-secondary btn-sm" data-rec-act="sync"' + (ui.busy ? ' disabled' : '') + '>立即同步</button><button type="button" class="btn btn-secondary btn-sm" data-rec-act="disconnect">中斷</button>'
            : '<span class="hist-badge">💾 只存在這台裝置</span><button type="button" class="btn btn-secondary btn-sm" data-rec-act="open-sync">' + (ui.syncOpen ? '收起' : '☁️ 設定雲端同步') + '</button>') +
          (ui.status ? '<span class="hist-status">' + esc(ui.status) + '</span>' : '') +
        '</div>' +
      '</div>' +
      syncBox +
      '<div class="hist-stats">' +
        '<div class="hist-stat"><span>測驗次數</span><strong>' + list.length + '</strong></div>' +
        '<div class="hist-stat"><span>最近總分</span><strong>' + (latest != null ? latest : '—') + '</strong></div>' +
        '<div class="hist-stat"><span>最高總分</span><strong>' + (best != null ? best : '—') + '</strong></div>' +
        '<div class="hist-stat"><span>進步</span><strong>' + (totals.length > 1 ? ((latest - first >= 0 ? '+' : '') + (latest - first)) : '—') + '</strong></div>' +
        '<label class="hist-stat hist-goal"><span>目標總分</span><input type="number" min="10" max="990" step="5" value="' + goal() + '" data-rec-goal></label>' +
      '</div>' +
      '<div class="hist-tabs" role="tablist" aria-label="學習曲線">' +
        [['total', '總分'], ['listening', '聽力'], ['reading', '閱讀']].map((t) =>
          '<button type="button" role="tab" aria-selected="' + (ui.tab === t[0]) + '" data-rec-tab="' + t[0] + '">' + t[1] + '</button>').join('') +
      '</div>' +
      chartSvg(ui.tab, list) +
      (list.length
        ? '<div class="hist-table-wrap"><table class="hist-table"><thead><tr><th>日期</th><th>回數</th><th>聽力</th><th>閱讀</th><th>總分</th><th>用時</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div>'
        : '<div class="hist-empty">還沒有任何紀錄。做完一回並交卷，這裡就會出現第一筆。</div>');
  }

  /* ---------- 事件 ---------- */
  document.addEventListener('exam:submitted', (e) => addRecord(e.detail || {}));

  document.addEventListener('click', (e) => {
    const host = document.getElementById('historyPanel');
    if (!host || !host.contains(e.target)) return;
    const tab = e.target.closest('[data-rec-tab]');
    if (tab) { ui.tab = tab.getAttribute('data-rec-tab'); render(); return; }
    const del = e.target.closest('[data-rec-del]');
    if (del) {
      if (window.confirm('確定刪除這筆紀錄？')) removeRecord(del.getAttribute('data-rec-del'));
      return;
    }
    const act = e.target.closest('[data-rec-act]');
    if (!act) return;
    const a = act.getAttribute('data-rec-act');
    if (a === 'open-sync') { ui.syncOpen = !ui.syncOpen; render(); }
    if (a === 'connect') { const input = document.getElementById('histToken'); connect(input ? input.value : ''); }
    if (a === 'sync') sync();
    if (a === 'disconnect') { if (window.confirm('中斷後這台裝置不再同步（紀錄會保留）。確定？')) disconnect(); }
  });

  document.addEventListener('change', (e) => {
    if (!e.target.matches || !e.target.matches('[data-rec-goal]')) return;
    const v = Math.max(10, Math.min(990, Math.round(Number(e.target.value) / 5) * 5 || 650));
    writeJson(GOAL_KEY, v);
    render();
  });

  // 折線圖的提示框（滑鼠移上或手指點擊資料點）
  function showTip(pt) {
    const wrap = pt.closest('.hist-chart-wrap');
    const tip = wrap && wrap.querySelector('.hc-tip');
    if (!tip) return;
    const dot = pt.querySelector('.hc-dot').getBoundingClientRect();
    const box = wrap.getBoundingClientRect();
    tip.textContent = pt.getAttribute('data-tip');
    tip.hidden = false;
    tip.style.left = Math.max(4, Math.min(box.width - 160, dot.left - box.left - 70)) + 'px';
    tip.style.top = Math.max(0, dot.top - box.top - 40) + 'px';
  }
  document.addEventListener('pointerover', (e) => { const pt = e.target.closest && e.target.closest('.hc-pt'); if (pt) showTip(pt); });
  document.addEventListener('focusin', (e) => { const pt = e.target.closest && e.target.closest('.hc-pt'); if (pt) showTip(pt); });
  document.addEventListener('pointerout', (e) => {
    const pt = e.target.closest && e.target.closest('.hc-pt');
    if (!pt) return;
    const tip = pt.closest('.hist-chart-wrap').querySelector('.hc-tip');
    if (tip) tip.hidden = true;
  });

  window.TOEIC_RECORDS = { render, goal, list: visible, add: addRecord, sync };

  document.addEventListener('DOMContentLoaded', () => { render(); sync(true); });
})();
