/* ==========================================================================
   BESTEP 全真模擬考 — 核心測驗引擎
   --------------------------------------------------------------------------
   模組責任：
   1. 題庫正規化（data/*.js → 統一 Section / Group / Question 結構）
   2. 考試大廳、模式選擇、音量測試
   3. 聽力：官方原音連續播放（data/audio_timeline.js）；無音檔時退回 Web Speech 播報
   4. 閱讀左文右題、50 分鐘倒數、逐題停留配速
   5. 閱卷、詳解檢討、配速分析、點單字查詢
   ========================================================================== */
(function () {
  'use strict';

  /* ======================================================================
     常數與狀態
     ====================================================================== */
  const APP_VERSION = '1.0.0';
  const THEME_KEY = 'bestep-theme';
  const READ_DURATION_DEFAULT = 50 * 60; // 50 分鐘
  const LISTEN_ANSWER_WINDOW = { 0: 12, 1: 30, 2: 60 }; // Part I / II / III 預設作答秒數
  // 多益建議配速：Part 5（單句）／Part 6（段落填空）／Part 7（閱讀）；聽力 Part 2／3／4 沿用同一索引
  const PACING_RANGES = [
    { min: 20, max: 30, label: '20–30 秒' },
    { min: 30, max: 45, label: '30–45 秒' },
    { min: 45, max: 70, label: '45–70 秒' }
  ];
  const FIGURE_COLORS = ['var(--primary)', 'var(--accent)', 'var(--warning)', 'var(--purple)', '#dc7f9b', '#58a6a0'];

  const TEST_META = [
    { id: 1, label: 'Test 1', files: { listening: 'data/test1_1l.js', reading: 'data/test1_4r.js' } }
  ];

  const state = {
    view: 'lobby',
    testId: null,
    mode: null,
    sections: { listening: null, reading: null },
    activeSection: null,
    listeningUnlocked: false,
    readingUnlocked: false,
    listeningGroupIndex: 0,
    readingQuestionIndex: 0,
    answers: {},
    flags: new Set(),
    dwell: {},
    dwellKey: null,
    dwellStart: 0,
    listeningPlayed: new Set(),
    listeningBusy: false,
    speechToken: 0,
    preRead: null,
    preReadTimer: null,
    answerWindow: null,
    answerWindowTimer: null,
    autoAdvanceTimer: null,
    timerId: null,
    readingDeadline: null,
    readingStart: null,
    listeningStart: null,
    submitted: false,
    result: null,
    reviewFilter: 'all',
    pendingStart: { testId: null, mode: 'full' },
    dictRequest: 0,
    dictEntry: null,
    lastFocus: null,
    volumeBusy: false,
    audioUnlocked: false,
    readingPane: 'passage',
    official: null,
    replayBtn: null
  };

  const sectionCache = {};
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ======================================================================
     通用工具
     ====================================================================== */
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/\n/g, ' ');
  }

  function formatClock(totalSeconds) {
    const sec = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return h + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function formatDuration(seconds) {
    const sec = Math.max(0, Math.round(Number(seconds) || 0));
    if (sec < 60) return sec + ' 秒';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return s ? m + ' 分 ' + s + ' 秒' : m + ' 分';
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function sameSet(a, b) {
    const x = (a || []).slice().sort();
    const y = (b || []).slice().sort();
    return x.length === y.length && x.every((v, i) => v === y[i]);
  }

  function unique(list) {
    return list.filter((v, i, arr) => arr.indexOf(v) === i);
  }

  function getSectionData(testId, key) {
    const cacheKey = testId + ':' + key;
    if (sectionCache[cacheKey]) return sectionCache[cacheKey];
    const globalData = window.BESTEP_DATA || {};
    const rawKey = 'test' + testId + (key === 'listening' ? 'Listening' : 'Reading');
    const raw = globalData[rawKey] || {};
    const built = buildSection(testId, key, raw);
    sectionCache[cacheKey] = built;
    return built;
  }

  function getTest(testId) {
    return TEST_META.find((t) => t.id === Number(testId)) || null;
  }

  /* ======================================================================
     題庫正規化
     ====================================================================== */
  function normalizeBlocks(input) {
    if (!input) return [];
    if (typeof input === 'string') return [{ type: 'p', text: input }];
    const blocks = input.blocks || input.paragraphs || input.content || [];
    if (!Array.isArray(blocks)) return [];
    return blocks.map((block) => {
      if (typeof block === 'string') return { type: 'p', text: block };
      const type = block.type || 'p';
      const out = {
        type,
        text: block.text || block.content || '',
        items: Array.isArray(block.items) ? block.items.slice() : null,
        title: block.title || '',
        src: block.src || '',
        alt: block.alt || ''
      };
      if (block.figure) out.figure = block.figure;
      return out;
    });
  }

  function normalizePassage(passage) {
    if (!passage) return null;
    if (typeof passage === 'string') {
      return { title: '', subtitle: '', blocks: [{ type: 'p', text: passage }] };
    }
    return {
      title: passage.title || '',
      subtitle: passage.subtitle || '',
      label: passage.label || '',
      blocks: normalizeBlocks(passage),
      className: passage.className || ''
    };
  }

  function normalizeHeadings(headings) {
    if (!Array.isArray(headings)) return [];
    return headings.map((h, i) => {
      if (typeof h === 'string') {
        const match = h.match(/^\s*([A-F])[.)、]\s*(.+)$/i);
        if (match) return { key: match[1].toUpperCase(), text: match[2].trim() };
        return { key: String.fromCharCode(65 + i), text: h.trim() };
      }
      return {
        key: String(h.key || h.letter || String.fromCharCode(65 + i)).toUpperCase(),
        text: h.text || h.label || h.title || ''
      };
    });
  }

  function stripOptionPrefix(text) {
    return String(text == null ? '' : text).replace(/^\s*[A-Ea-e][.)、]\s*/, '');
  }

  function normalizeOptions(options) {
    if (!Array.isArray(options)) return [];
    return options.map((opt, i) => ({
      letter: String.fromCharCode(65 + i),
      text: stripOptionPrefix(typeof opt === 'string' ? opt : (opt.text || opt.label || ''))
    }));
  }

  function normalizeAnswer(answer) {
    if (Array.isArray(answer)) {
      return unique(answer.map((a) => String(a).trim().toUpperCase()).filter((a) => /^[A-F]$/.test(a)));
    }
    const raw = String(answer == null ? '' : answer).toUpperCase().replace(/[^A-F]/g, '');
    return unique(raw.split(''));
  }

  function inferType(q, group) {
    if (q.type) {
      const rawType = String(q.type).toLowerCase();
      if (rawType === 'multiple' || rawType === 'multi' || rawType === 'multi-select') return 'multi';
      if (rawType === 'heading' || rawType === 'matching' || rawType === 'match') return 'matching';
      if (rawType === 'single' || rawType === 'one') return 'single';
      return rawType;
    }
    if (group && group.headings && group.headings.length) return 'matching';
    const answer = normalizeAnswer(q.answer != null ? q.answer : q.key);
    if (answer.length > 1) return 'multi';
    if (/choose\s+\d+\s+answers?/i.test(String(q.stem || q.question || ''))) return 'multi';
    return 'single';
  }

  function defaultTargetSec(key, partIndex) {
    if (key === 'reading') return [38, 68, 105][partIndex] || 68;
    return [15, 45, 55][partIndex] || 45;
  }

  function defaultPreRead(key, partIndex) {
    if (key !== 'listening') return 0;
    return partIndex >= 2 ? 20 : 0;
  }

  function partsFromFlatQuestions(flatQuestions, sectionKey) {
    const partOrder = [];
    const partMap = {};
    const groupMap = {};
    flatQuestions.forEach((rawQuestion, index) => {
      if (!rawQuestion || typeof rawQuestion !== 'object') return;
      const partTitle = rawQuestion.part || 'Part I';
      if (!partMap[partTitle]) {
        partMap[partTitle] = {
          id: (sectionKey === 'listening' ? 'L' : 'R') + (partOrder.length + 1),
          title: partTitle,
          description: rawQuestion.partDescription || '',
          groups: []
        };
        partOrder.push(partTitle);
      }
      const part = partMap[partTitle];
      const groupKey = rawQuestion.group || rawQuestion.groupKey || rawQuestion.taskGroup || ('Q' + (rawQuestion.id || index + 1));
      const mapKey = partTitle + '|' + groupKey;
      let group = groupMap[mapKey];
      if (!group) {
        group = {
          id: String(groupKey),
          taskTitle: rawQuestion.taskTitle || '',
          preReadSec: rawQuestion.preReadSec != null ? rawQuestion.preReadSec : 0,
          answerWindowSec: rawQuestion.answerWindowSec != null ? rawQuestion.answerWindowSec : 0,
          script: [],
          passage: null,
          headings: [],
          audioFile: rawQuestion.audioFile || '',
          preferAudio: Boolean(rawQuestion.preferAudio),
          description: rawQuestion.groupDescription || '',
          questions: []
        };
        groupMap[mapKey] = group;
        part.groups.push(group);
      }
      if (!group.script.length && Array.isArray(rawQuestion.script) && rawQuestion.script.length) group.script = rawQuestion.script;
      if (!group.passage && rawQuestion.passage) group.passage = rawQuestion.passage;
      if (!group.headings.length && Array.isArray(rawQuestion.headings) && rawQuestion.headings.length) group.headings = rawQuestion.headings;
      if (rawQuestion.preReadSec != null) group.preReadSec = rawQuestion.preReadSec;
      if (rawQuestion.answerWindowSec != null) group.answerWindowSec = rawQuestion.answerWindowSec;
      if (rawQuestion.taskTitle) group.taskTitle = rawQuestion.taskTitle;
      group.questions.push(rawQuestion);
    });
    return partOrder.map((title) => partMap[title]);
  }

  function buildSection(testId, key, raw) {
    const source = raw || {};
    const parts = (Array.isArray(source.parts) && source.parts.length)
      ? source.parts
      : (Array.isArray(source.questions) ? partsFromFlatQuestions(source.questions, key) : []);
    const groups = [];
    const questions = [];
    let sequence = 0;

    parts.forEach((part, partIndex) => {
      const partTitle = part.title || part.label || ('Part ' + (partIndex + 1));
      const base = {
        id: part.id || (key === 'listening' ? 'L' : 'R') + (partIndex + 1),
        title: partTitle,
        description: part.description || part.instructions || '',
        partIndex,
        sectionKey: key
      };

      const rawGroups = [];
      if (Array.isArray(part.groups) && part.groups.length) rawGroups.push.apply(rawGroups, part.groups);
      if (Array.isArray(part.questions) && part.questions.length) {
        rawGroups.push({
          id: base.id + '-questions',
          questions: part.questions,
          passage: part.passage,
          script: part.script,
          headings: part.headings,
          preReadSec: part.preReadSec,
          answerWindowSec: part.answerWindowSec
        });
      }

      rawGroups.forEach((rawGroup, groupIndex) => {
        const group = {
          id: rawGroup.id || (base.id + '-G' + (groupIndex + 1)),
          partId: base.id,
          partTitle,
          partIndex,
          sectionKey: key,
          description: rawGroup.description || rawGroup.instructions || base.description,
          passage: normalizePassage(rawGroup.passage || part.passage),
          script: normalizeScript(rawGroup.script || part.script || rawGroup.audioScript),
          headings: normalizeHeadings(rawGroup.headings || part.headings),
          audioFile: rawGroup.audioFile || part.audioFile || '',
          preferAudio: Boolean(rawGroup.preferAudio || part.preferAudio),
          preReadSec: Number(
            rawGroup.preReadSec != null ? rawGroup.preReadSec
              : (part.preReadSec != null ? part.preReadSec : defaultPreRead(key, partIndex))
          ) || 0,
          answerWindowSec: Number(rawGroup.answerWindowSec || part.answerWindowSec || 0) || 0,
          taskTitle: rawGroup.taskTitle || part.taskTitle || '',
          questions: []
        };

        const list = Array.isArray(rawGroup.questions) ? rawGroup.questions : [];
        list.forEach((rawQuestion) => {
          sequence += 1;
          const groupHeadings = group.headings;
          const type = inferType(rawQuestion, group);
          const answerSource = rawQuestion.answer != null ? rawQuestion.answer : rawQuestion.key;
          const options = normalizeOptions(
            rawQuestion.options ||
            (type === 'matching' ? groupHeadings.map((h) => h.key + '. ' + h.text) : [])
          );
          const num = Number(rawQuestion.num || rawQuestion.id || rawQuestion.number) || sequence;
          let figure = rawQuestion.figure || null;
          if (!figure && rawQuestion.svgGraphic) {
            figure = typeof rawQuestion.svgGraphic === 'string'
              ? rawQuestion.svgGraphic
              : { type: 'svg', svg: String(rawQuestion.svgGraphic) };
          }
          if (!figure && rawQuestion.image) {
            figure = { type: 'image', src: rawQuestion.image, caption: rawQuestion.imageCaption || '' };
          }
          const figSet = window.BESTEP_FIGS && window.BESTEP_FIGS[String(testId) + (key === 'listening' ? 'L' : 'R')];
          if (figSet && figSet[num]) figure = { type: 'image', src: figSet[num], alt: '講義原圖' };
          const q = {
            num,
            type,
            stem: String(rawQuestion.stem || rawQuestion.question || rawQuestion.text || ''),
            instruction: rawQuestion.instruction || rawQuestion.instructions || '',
            options,
            answer: normalizeAnswer(answerSource),
            acceptCount: Math.max(1, Number(rawQuestion.acceptCount || rawQuestion.choose || 0) || (type === 'multi' ? Math.max(2, normalizeAnswer(answerSource).length) : 1)),
            explanation: rawQuestion.explanation || rawQuestion.analysis || '',
            translation: rawQuestion.translation || rawQuestion.zh || '',
            targetSec: Number(rawQuestion.targetSec || rawQuestion.recommendedSeconds) || defaultTargetSec(key, partIndex),
            figure,
            audioOnly: Boolean(rawQuestion.audioOnly),
            audioFile: rawQuestion.audioFile || group.audioFile || '',
            tags: Array.isArray(rawQuestion.tags) ? rawQuestion.tags : [],
            group,
            partIndex,
            partTitle,
            sectionKey: key,
            sequence,
            key: key + ':' + (rawQuestion.num || sequence)
          };
          if (!q.stem && group.passage) q.stem = '請依文章內容選出最適當的答案。';
          if (type === 'matching' && !q.options.length && groupHeadings.length) {
            q.options = groupHeadings.map((h) => ({ letter: h.key, text: h.text }));
          }
          group.questions.push(q);
          questions.push(q);
        });

        if (group.questions.length) groups.push(group);
      });
    });

    // 確保 key 唯一，並補上全域索引
    const used = {};
    questions.forEach((q, i) => {
      if (used[q.key]) {
        q.key = q.sectionKey + ':' + q.num + '-' + (i + 1);
      }
      used[q.key] = true;
      q.index = i;
    });

    const durationSec = Number(source.durationSec) ||
      (key === 'reading' ? READ_DURATION_DEFAULT : 0);

    return {
      testId,
      key,
      title: source.title || (key === 'listening' ? '聽力測驗' : '閱讀測驗'),
      description: source.description || '',
      instructions: source.instructions || '',
      durationSec,
      parts,
      groups,
      questions,
      available: questions.length > 0
    };
  }

  function normalizeScript(script) {
    if (!script) return [];
    if (typeof script === 'string') return [{ speaker: 'Narrator', text: script }];
    if (!Array.isArray(script)) return [];
    return script.map((line) => {
      if (typeof line === 'string') return { speaker: 'Narrator', text: line };
      return {
        speaker: line.speaker || line.role || line.who || 'Narrator',
        text: line.text || line.line || '',
        rate: Number(line.rate) || null
      };
    }).filter((line) => line.text);
  }

  function getQuestion(key) {
    const found = [];
    ['listening', 'reading'].forEach((sectionKey) => {
      const section = state.sections[sectionKey];
      if (!section) return;
      const q = section.questions.find((item) => item.key === key);
      if (q) found.push(q);
    });
    return found[0] || null;
  }

  function currentReadingQuestion() {
    const section = state.sections.reading;
    if (!section || !section.questions.length) return null;
    return section.questions[clamp(state.readingQuestionIndex, 0, section.questions.length - 1)];
  }

  function currentListeningGroup() {
    const section = state.sections.listening;
    if (!section || !section.groups.length) return null;
    return section.groups[clamp(state.listeningGroupIndex, 0, section.groups.length - 1)];
  }

  function activeQuestions() {
    const list = [];
    if (state.mode === 'full' || state.mode === 'listening') {
      if (state.sections.listening) list.push.apply(list, state.sections.listening.questions);
    }
    if (state.mode === 'full' || state.mode === 'reading') {
      if (state.sections.reading) list.push.apply(list, state.sections.reading.questions);
    }
    return list;
  }

  function sectionQuestionsInMode(sectionKey) {
    if (sectionKey === 'listening' && state.mode === 'reading') return [];
    if (sectionKey === 'reading' && state.mode === 'listening') return [];
    const section = state.sections[sectionKey];
    return section ? section.questions : [];
  }

  /* ======================================================================
     單字 token 化（僅檢討模式使用）
     ====================================================================== */
  function tokenizeEn(text) {
    const source = String(text == null ? '' : text);
    if (!source || !/[A-Za-z]/.test(source)) return escapeHtml(source).replace(/\n/g, '<br>');
    const parts = source.split(/([A-Za-z]+(?:['’\-][A-Za-z]+)*)/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return '<span class="word-token" data-word="' + escapeAttr(part) + '" title="點擊查詢：' + escapeAttr(part) + '">' + escapeHtml(part) + '</span>';
      }
      return escapeHtml(part).replace(/\n/g, '<br>');
    }).join('');
  }

  /* ======================================================================
     SVG 圖表／示意圖產生器
     ====================================================================== */
  let figureSeq = 0;

  function svgFrame(fig, width, height, inner) {
    figureSeq += 1;
    const title = fig.title || '';
    const caption = fig.caption ? escapeHtml(fig.caption) : '';
    return (
      '<div class="figure-card">' +
        (title ? '<div class="figure-title">' + escapeHtml(title) + '</div>' : '') +
        '<svg class="svg-figure" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + escapeAttr(title || '試題圖表') + '" preserveAspectRatio="xMidYMid meet">' +
          inner +
        '</svg>' +
        (caption ? '<div class="figure-caption">' + caption + '</div>' : '') +
      '</div>'
    );
  }

  function niceMax(value) {
    const v = Math.max(1, Number(value) || 1);
    const power = Math.pow(10, Math.floor(Math.log10(v)));
    const norm = v / power;
    let step;
    if (norm <= 1) step = 1;
    else if (norm <= 2) step = 2;
    else if (norm <= 2.5) step = 2.5;
    else if (norm <= 5) step = 5;
    else step = 10;
    return step * power;
  }

  function renderBarFigure(fig) {
    const width = 640;
    const height = 360;
    const pad = { l: 58, r: 22, t: 58, b: 58 };
    const labels = (fig.labels || []).map(String);
    const series = (fig.series || []).map((s, i) => ({
      name: s.name || ('Series ' + (i + 1)),
      color: s.color || FIGURE_COLORS[i % FIGURE_COLORS.length],
      data: (s.data || []).map(Number)
    }));
    const allValues = series.reduce((acc, s) => acc.concat(s.data.filter((n) => Number.isFinite(n))), []);
    if (!labels.length || !series.length || !allValues.length) {
      return svgFrame(fig, width, height, '<text x="320" y="180" text-anchor="middle" class="axis-label">No chart data</text>');
    }
    const maxValue = niceMax(Math.max.apply(null, allValues.concat([1])));
    const plotW = width - pad.l - pad.r;
    const plotH = height - pad.t - pad.b;
    const groupW = plotW / labels.length;
    const barW = Math.min(42, (groupW * 0.66) / series.length);
    const gap = 5;
    const totalBarsW = series.length * barW + (series.length - 1) * gap;
    let inner = '';

    for (let i = 0; i <= 4; i += 1) {
      const y = pad.t + plotH - (plotH * i / 4);
      const value = maxValue * i / 4;
      inner += '<line class="grid" x1="' + pad.l + '" y1="' + y + '" x2="' + (width - pad.r) + '" y2="' + y + '"/>';
      inner += '<text class="axis-label" x="' + (pad.l - 8) + '" y="' + (y + 3) + '" text-anchor="end">' + (Math.round(value * 10) / 10) + (fig.valueSuffix || '') + '</text>';
    }

    labels.forEach((label, li) => {
      const center = pad.l + groupW * li + groupW / 2;
      inner += '<text class="axis-label" x="' + center + '" y="' + (height - pad.b + 19) + '" text-anchor="middle">' + escapeHtml(label) + '</text>';
      series.forEach((s, si) => {
        const value = Number(s.data[li]) || 0;
        const barH = Math.max(0, (value / maxValue) * plotH);
        const x = center - totalBarsW / 2 + si * (barW + gap);
        const y = pad.t + plotH - barH;
        inner += '<rect x="' + x + '" y="' + y + '" width="' + barW + '" height="' + barH + '" rx="3" fill="' + s.color + '" opacity="0.9"/>';
        if (fig.showValues !== false && barH > 14) {
          inner += '<text class="value-label" x="' + (x + barW / 2) + '" y="' + (y - 5) + '" text-anchor="middle">' + value + (fig.valueSuffix || '') + '</text>';
        }
      });
    });

    inner += '<line class="axis" x1="' + pad.l + '" y1="' + (pad.t + plotH) + '" x2="' + (width - pad.r) + '" y2="' + (pad.t + plotH) + '"/>';
    inner += '<line class="axis" x1="' + pad.l + '" y1="' + pad.t + '" x2="' + pad.l + '" y2="' + (pad.t + plotH) + '"/>';

    let legendX = pad.l;
    series.forEach((s) => {
      inner += '<rect x="' + legendX + '" y="18" width="11" height="11" rx="2" fill="' + s.color + '"/>';
      inner += '<text class="legend-label" x="' + (legendX + 16) + '" y="27">' + escapeHtml(s.name) + '</text>';
      legendX += 24 + String(s.name).length * 7;
    });

    if (fig.yTitle) {
      inner += '<text class="axis-label" transform="translate(16 ' + (pad.t + plotH / 2) + ') rotate(-90)" text-anchor="middle">' + escapeHtml(fig.yTitle) + '</text>';
    }

    return svgFrame(fig, width, height, inner);
  }

  function renderLineFigure(fig) {
    const width = 640;
    const height = 360;
    const pad = { l: 58, r: 24, t: 58, b: 58 };
    const labels = (fig.labels || []).map(String);
    const series = (fig.series || []).map((s, i) => ({
      name: s.name || ('Series ' + (i + 1)),
      color: s.color || FIGURE_COLORS[i % FIGURE_COLORS.length],
      data: (s.data || []).map(Number)
    }));
    const allValues = series.reduce((acc, s) => acc.concat(s.data.filter((n) => Number.isFinite(n))), []);
    if (!labels.length || !series.length || !allValues.length) {
      return svgFrame(fig, width, height, '<text x="320" y="180" text-anchor="middle" class="axis-label">No chart data</text>');
    }
    const maxValue = niceMax(Math.max.apply(null, allValues.concat([1])));
    const plotW = width - pad.l - pad.r;
    const plotH = height - pad.t - pad.b;
    const stepX = labels.length > 1 ? plotW / (labels.length - 1) : 0;
    let inner = '';

    for (let i = 0; i <= 4; i += 1) {
      const y = pad.t + plotH - (plotH * i / 4);
      inner += '<line class="grid" x1="' + pad.l + '" y1="' + y + '" x2="' + (width - pad.r) + '" y2="' + y + '"/>';
      inner += '<text class="axis-label" x="' + (pad.l - 8) + '" y="' + (y + 3) + '" text-anchor="end">' + (Math.round(maxValue * i / 4 * 10) / 10) + (fig.valueSuffix || '') + '</text>';
    }
    labels.forEach((label, i) => {
      const x = pad.l + stepX * i;
      inner += '<text class="axis-label" x="' + x + '" y="' + (height - pad.b + 19) + '" text-anchor="middle">' + escapeHtml(label) + '</text>';
    });

    series.forEach((s) => {
      const points = s.data.map((value, i) => {
        const x = pad.l + (labels.length > 1 ? stepX * i : plotW / 2);
        const y = pad.t + plotH - (Math.max(0, Number(value) || 0) / maxValue) * plotH;
        return { x, y, value };
      });
      if (points.length > 1) {
        const path = points.map((p, i) => (i === 0 ? 'M' : 'L') + p.x + ' ' + p.y).join(' ');
        if (fig.area) {
          inner += '<path d="' + path + ' L' + points[points.length - 1].x + ' ' + (pad.t + plotH) + ' L' + points[0].x + ' ' + (pad.t + plotH) + ' Z" fill="' + s.color + '" opacity="0.08"/>';
        }
        inner += '<path d="' + path + '" fill="none" stroke="' + s.color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
      }
      points.forEach((p) => {
        inner += '<circle cx="' + p.x + '" cy="' + p.y + '" r="4" fill="' + s.color + '" stroke="var(--surface)" stroke-width="2"/>';
        if (fig.showValues !== false) {
          inner += '<text class="value-label" x="' + p.x + '" y="' + (p.y - 9) + '" text-anchor="middle">' + p.value + (fig.valueSuffix || '') + '</text>';
        }
      });
    });

    inner += '<line class="axis" x1="' + pad.l + '" y1="' + (pad.t + plotH) + '" x2="' + (width - pad.r) + '" y2="' + (pad.t + plotH) + '"/>';
    inner += '<line class="axis" x1="' + pad.l + '" y1="' + pad.t + '" x2="' + pad.l + '" y2="' + (pad.t + plotH) + '"/>';

    let legendX = pad.l;
    series.forEach((s) => {
      inner += '<line x1="' + legendX + '" y1="24" x2="' + (legendX + 14) + '" y2="24" stroke="' + s.color + '" stroke-width="3" stroke-linecap="round"/>';
      inner += '<text class="legend-label" x="' + (legendX + 20) + '" y="27">' + escapeHtml(s.name) + '</text>';
      legendX += 30 + String(s.name).length * 7;
    });

    return svgFrame(fig, width, height, inner);
  }

  function renderMapFigure(fig) {
    const width = Number(fig.width) || 640;
    const height = Number(fig.height) || 400;
    const nodes = Array.isArray(fig.nodes) ? fig.nodes : [];
    const nodeById = {};
    nodes.forEach((n) => { nodeById[String(n.id)] = n; });
    let inner = '';
    inner += '<rect class="map-water" x="0" y="0" width="' + width + '" height="' + height + '" rx="18"/>';
    inner += '<path class="map-land" d="M24 70 Q140 34 260 58 T610 44 L616 360 Q470 336 330 356 T28 334 Z"/>';

    (fig.areas || []).forEach((area) => {
      inner += '<rect x="' + area.x + '" y="' + area.y + '" width="' + area.w + '" height="' + area.h + '" rx="' + (area.rx || 14) + '" fill="' + (area.color || 'var(--surface-3)') + '" opacity="' + (area.opacity != null ? area.opacity : 0.85) + '" stroke="var(--line)" stroke-width="1"/>';
      if (area.label) {
        inner += '<text class="map-label" x="' + (area.x + area.w / 2) + '" y="' + (area.y + area.h / 2 + 4) + '" text-anchor="middle">' + escapeHtml(area.label) + '</text>';
      }
    });

    (fig.labels || []).forEach((label) => {
      inner += '<text class="map-label" x="' + label.x + '" y="' + label.y + '" text-anchor="' + (label.anchor || 'start') + '">' + escapeHtml(label.text || '') + '</text>';
    });

    const routeIds = Array.isArray(fig.route) ? fig.route.map(String) : [];
    const routeNodes = routeIds.map((id) => nodeById[id]).filter(Boolean);
    if (routeNodes.length > 1) {
      const d = routeNodes.map((n, i) => (i === 0 ? 'M' : 'L') + n.x + ' ' + n.y).join(' ');
      inner += '<path class="route-line" d="' + d + '"/>';
    }

    nodes.forEach((node) => {
      const type = node.type || '';
      const cls = 'route-node' + (type ? ' ' + type : '');
      inner += '<circle class="' + cls + '" cx="' + node.x + '" cy="' + node.y + '" r="15"/>';
      inner += '<text class="node-label" x="' + node.x + '" y="' + (node.y + 4) + '" text-anchor="middle" fill="' + (type === 'start' || type === 'finish' ? '#fff' : 'var(--ink)') + '">' + escapeHtml(String(node.id)) + '</text>';
      if (node.label) {
        const dy = node.labelDy != null ? node.labelDy : 30;
        inner += '<text class="map-label" x="' + (node.x + (node.labelDx || 0)) + '" y="' + (node.y + dy) + '" text-anchor="' + (node.anchor || 'middle') + '">' + escapeHtml(node.label) + '</text>';
      }
    });

    if (fig.legend) {
      inner += '<text class="map-label" x="' + (width - 24) + '" y="' + (height - 18) + '" text-anchor="end">' + escapeHtml(fig.legend) + '</text>';
    }

    return svgFrame(fig, width, height, inner);
  }

  function tortoiseSvg(x, y, scale, facing) {
    const flip = facing === 'left' ? -1 : 1;
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + (scale * flip) + ' ' + scale + ')">' +
      '<ellipse cx="0" cy="0" rx="17" ry="11" class="animal"/>' +
      '<path d="M-15 -3 Q-6 -14 10 -10 Q17 -8 17 -2 Q9 5 -8 5 Z" fill="var(--success-soft)" stroke="color-mix(in srgb, var(--success) 70%, #000)" stroke-width="1"/>' +
      '<circle cx="21" cy="-2" r="4.5" class="animal"/>' +
      '<path d="M-10 9 L-12 15 M2 10 L2 16 M11 8 L13 14" stroke="color-mix(in srgb, var(--success) 80%, #000)" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="22" cy="-3" r="0.9" fill="var(--surface)"/>' +
    '</g>';
  }

  function renderExperimentFigure(fig) {
    const width = 640;
    const height = 390;
    const animalCount = clamp(Number(fig.animalCount != null ? fig.animalCount : (fig.animals || 1)) || 1, 0, 4);
    const facing = fig.facing === 'left' ? 'left' : 'right';
    const floorScreen = Boolean(fig.floorScreen);
    const opacity = fig.opacity != null ? fig.opacity : 1;
    let inner = '';
    let markerId = 'arrow-' + figureSeq;

    inner += '<defs><marker id="' + markerId + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker></defs>';

    // 箱體（無蓋透視）
    inner += '<polygon class="box-top" points="150,92 470,92 520,140 205,140"/>';
    inner += '<polygon class="box-side" points="470,92 520,140 520,322 470,285"/>';
    inner += '<rect class="box-face" x="150" y="140" width="320" height="185" rx="3"/>';
    inner += '<polygon class="box-side" points="150,140 205,140 205,325 150,325" opacity="0.55"/>';

    // 兩側牆面螢幕（預設）
    if (!floorScreen) {
      inner += '<polygon class="screen" points="158,158 198,166 198,300 158,306"/>';
      inner += '<polygon class="screen" points="422,166 462,158 462,306 422,300"/>';
      ['Biological motion', 'Random movement'].forEach((label, i) => {
        const cx = i === 0 ? 178 : 442;
        inner += '<text class="figure-label" x="' + cx + '" y="150" text-anchor="middle">' + label + '</text>';
        for (let d = 0; d < 6; d += 1) {
          const dx = i === 0 ? cx - 8 + (d % 3) * 8 : cx - 8 + ((d * 5) % 20);
          const dy = 195 + Math.floor(d / 3) * 28 + (i === 0 ? (d % 2) * 4 : (d * 7) % 13);
          inner += '<circle cx="' + dx + '" cy="' + dy + '" r="2.4" fill="' + (i === 0 ? 'var(--primary)' : 'var(--muted)') + '" opacity="' + opacity + '"/>';
        }
      });
    } else {
      // 地面投影（對照錯誤示意）
      inner += '<polygon class="screen floor" points="225,270 405,270 440,322 190,322"/>';
      inner += '<text class="figure-label" x="315" y="302" text-anchor="middle">Video screen on the floor</text>';
    }

    // 烏龜
    if (animalCount === 0) {
      inner += '<text class="figure-label" x="310" y="238" text-anchor="middle">No animal in the box</text>';
    } else {
      const positions = animalCount === 1 ? [310] : animalCount === 2 ? [255, 375] : animalCount === 3 ? [230, 310, 390] : [215, 280, 345, 405];
      positions.forEach((px, i) => {
        inner += tortoiseSvg(px, 238 + (i % 2) * 17, 1.05, facing);
      });
      inner += '<line class="arrow-line" x1="' + (positions[0] + (facing === 'right' ? 32 : -32)) + '" y1="250" x2="' + (positions[0] + (facing === 'right' ? 66 : -66)) + '" y2="250" marker-end="url(#' + markerId + ')"/>';
    }

    if (fig.note) {
      inner += '<text class="figure-label" x="320" y="356" text-anchor="middle">' + escapeHtml(fig.note) + '</text>';
    }

    return svgFrame(fig, width, height, inner);
  }

  function renderTableFigure(fig) {
    const headers = Array.isArray(fig.headers) ? fig.headers : [];
    const rows = Array.isArray(fig.rows) ? fig.rows : [];
    const caption = fig.caption ? '<div class="figure-caption">' + escapeHtml(fig.caption) + '</div>' : '';
    const head = headers.length ? '<thead><tr>' + headers.map((h) => '<th>' + escapeHtml(h) + '</th>').join('') + '</tr></thead>' : '';
    const body = '<tbody>' + rows.map((row) => '<tr>' + (Array.isArray(row) ? row : [row]).map((cell) => '<td>' + escapeHtml(cell) + '</td>').join('') + '</tr>').join('') + '</tbody>';
    return (
      '<div class="figure-card">' +
        (fig.title ? '<div class="figure-title">' + escapeHtml(fig.title) + '</div>' : '') +
        '<div class="figure-table-wrap"><table class="figure-table">' + head + body + '</table></div>' +
        caption +
      '</div>'
    );
  }

  function renderFigure(fig) {
    const html = renderFigureInner(fig);
    if (!html) return '';
    return html.replace('<div class="figure-card">', '<div class="figure-card zoomable" data-action="zoom-figure" role="button" tabindex="0" aria-label="點一下放大圖表"><span class="zoom-hint">🔍 點圖放大</span>');
  }

  let figZoom = 1;
  function setFigureZoom(value) {
    figZoom = clamp(Math.round(value * 10) / 10, 1, 4);
    const stage = $('#figZoomStage');
    if (stage) stage.style.width = (figZoom * 100) + '%';
    const label = $('#figZoomLevel');
    if (label) label.textContent = Math.round(figZoom * 100) + '%';
  }

  function openFigureZoom(card) {
    const box = $('#figZoom');
    const stage = $('#figZoomStage');
    if (!box || !stage || !card) return;
    const clone = card.cloneNode(true);
    const hint = clone.querySelector('.zoom-hint');
    if (hint) hint.remove();
    stage.innerHTML = clone.innerHTML;
    // SVG 內的 id（箭頭 marker 等）避免和原圖重複
    $$('[id]', stage).forEach((node) => node.removeAttribute('id'));
    box.hidden = false;
    document.body.classList.add('modal-open');
    setFigureZoom(1);
    const scroller = $('#figZoomScroll');
    if (scroller) { scroller.scrollTop = 0; scroller.scrollLeft = 0; }
  }

  function closeFigureZoom() {
    const box = $('#figZoom');
    if (!box || box.hidden) return false;
    box.hidden = true;
    const stage = $('#figZoomStage');
    if (stage) stage.innerHTML = '';
    if (!$$('.modal-overlay.open').length) document.body.classList.remove('modal-open');
    return true;
  }

  function renderFigureInner(fig) {
    if (!fig) return '';
    if (typeof fig === 'string') return '<div class="figure-card">' + fig + '</div>';
    if (fig.svg) return '<div class="figure-card">' + fig.svg + '</div>';
    if (fig.type === 'image' || fig.src) {
      const caption = fig.caption ? '<div class="figure-caption">' + tokenizeEn(fig.caption) + '</div>' : '';
      return '<div class="figure-card"><img src="' + escapeAttr(fig.src || '') + '" alt="' + escapeAttr(fig.alt || fig.caption || '試題圖片') + '" class="handout-img" style="display:block;width:100%;height:auto;margin:0 auto;border-radius:6px;background:#fff;">' + caption + '</div>';
    }
    switch (String(fig.type || 'bar').toLowerCase()) {
      case 'line':
      case '折線':
        return renderLineFigure(fig);
      case 'map':
      case '地圖':
        return renderMapFigure(fig);
      case 'experiment':
      case 'experiment-box':
      case '實驗箱':
        return renderExperimentFigure(fig);
      case 'table':
      case '表格':
        return renderTableFigure(fig);
      case 'bar':
      case 'chart':
      case '長條圖':
      default:
        return renderBarFigure(fig);
    }
  }

  /* ======================================================================
     主題 / Modal / Toast
     ====================================================================== */
  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const next = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#11161f' : '#f5f3ec');
    const toggle = $('#themeToggle');
    if (toggle) {
      const icon = $('.theme-icon', toggle);
      const label = $('.theme-label', toggle);
      if (icon) icon.textContent = next === 'dark' ? '☀' : '☾';
      if (label) label.textContent = next === 'dark' ? '淺色' : '深色';
      toggle.setAttribute('aria-label', next === 'dark' ? '切換為護眼淺色主題' : '切換為深色主題');
    }
  }

  let toastTimer = null;
  function showToast(message, type) {
    const toast = $('#toast');
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.className = 'toast show' + (type === 'error' ? ' error' : '');
    toastTimer = setTimeout(() => {
      toast.className = 'toast' + (type === 'error' ? ' error' : '');
    }, 3200);
  }

  function openModal(modal) {
    if (!modal) return;
    state.lastFocus = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('open'));
    document.body.classList.add('modal-open');
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      if (!modal.classList.contains('open')) modal.hidden = true;
    }, 240);
    if (state.lastFocus && typeof state.lastFocus.focus === 'function') {
      setTimeout(() => state.lastFocus.focus(), 250);
    }
  }

  function closeAllModals() {
    $$('.modal-overlay').forEach((modal) => {
      if (!modal.hidden) closeModal(modal);
    });
  }

  function switchView(view) {
    state.view = view;
    ['lobby', 'exam', 'review'].forEach((name) => {
      const el = $('#' + name + 'View');
      if (el) el.hidden = name !== view;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ======================================================================
     Web Speech 語音工具
     ====================================================================== */
  let voices = [];

  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    try {
      voices = window.speechSynthesis.getVoices().filter((v) => /^en([-_]|$)/i.test(v.lang || ''));
    } catch (e) { voices = []; }
  }

  loadVoices();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
  }

  function genderOf(speaker) {
    const s = String(speaker || '').trim();
    if (/^m/i.test(s)) return 'male';
    if (/^w/i.test(s)) return 'female';
    return 'neutral';
  }

  function speakerSlot(speaker) {
    const match = String(speaker || '').match(/(\d)$/);
    return match ? Number(match[1]) : 0;
  }

  const FEMALE_HINTS = ['aria', 'jenny', 'zira', 'samantha', 'karen', 'moira', 'tessa', 'victoria', 'susan', 'fiona', 'serena', 'ava', 'allison', 'female', 'google us english'];
  const MALE_HINTS = ['guy', 'david', 'mark', 'daniel', 'alex', 'fred', 'tom', 'george', 'ryan', 'christopher', 'eric', 'male', 'aaron', 'arthur'];

  function chooseVoice(gender, slot) {
    if (!voices.length) loadVoices();
    if (!voices.length) return null;
    const us = voices.filter((v) => /en[-_]US/i.test(v.lang));
    const pool = us.length ? us : voices;
    if (gender === 'neutral') return pool[0] || null;
    const hints = gender === 'male' ? MALE_HINTS : FEMALE_HINTS;
    const matches = pool.filter((v) => hints.some((hint) => (v.name || '').toLowerCase().indexOf(hint) !== -1));
    if (matches.length) return matches[slot % matches.length];
    return pool[slot % pool.length] || pool[0] || null;
  }

  function voiceProfile(speaker, baseRate) {
    const gender = genderOf(speaker);
    const slot = speakerSlot(speaker);
    const voice = chooseVoice(gender, slot);
    const gendered = voice && (
      (gender === 'male' && MALE_HINTS.some((hint) => voice.name.toLowerCase().indexOf(hint) !== -1)) ||
      (gender === 'female' && FEMALE_HINTS.some((hint) => voice.name.toLowerCase().indexOf(hint) !== -1))
    );
    let rate = (baseRate || 1) * getSpeed();
    if (gender === 'male') rate *= 0.96;
    if (gender === 'female') rate *= 1.0;
    if (gender === 'neutral') rate *= 0.97;
    return {
      voice,
      rate: clamp(rate, 0.6, 1.7),
      pitch: gendered ? 1 : (gender === 'male' ? 0.82 : gender === 'female' ? 1.14 : 1)
    };
  }

  function splitSpeechText(text, maxLength) {
    const limit = maxLength || 170;
    const source = String(text || '').replace(/\s+/g, ' ').trim();
    if (!source) return [];
    const sentences = source.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) || [source];
    const chunks = [];
    sentences.forEach((sentence) => {
      const clean = sentence.trim();
      if (!clean) return;
      if (clean.length <= limit) {
        chunks.push(clean);
        return;
      }
      let current = '';
      clean.split(/\s+/).forEach((word) => {
        if ((current + ' ' + word).trim().length > limit) {
          if (current) chunks.push(current.trim());
          current = word;
        } else {
          current += ' ' + word;
        }
      });
      if (current.trim()) chunks.push(current.trim());
    });
    return chunks;
  }

  function speakChunk(text, speaker, baseRate, pitchOverride) {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window) || !text) {
        resolve(false);
        return;
      }
      const profile = voiceProfile(speaker, baseRate);
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = profile.rate;
      utter.pitch = pitchOverride || profile.pitch;
      utter.volume = 1;
      if (profile.voice) utter.voice = profile.voice;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        resolve(true);
      };
      utter.onend = finish;
      utter.onerror = finish;
      const estimate = clamp((text.split(/\s+/).length / 2.6) * 1000 / profile.rate + 2500, 3500, 30000);
      const timer = setTimeout(finish, estimate);
      const wrapped = () => {
        clearTimeout(timer);
        finish();
      };
      utter.onend = wrapped;
      utter.onerror = wrapped;
      try {
        // Safari／Chrome 偶爾會卡在 paused 狀態，先 resume 再說話。
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
        window.speechSynthesis.speak(utter);
      } catch (e) {
        clearTimeout(timer);
        finish();
      }
    });
  }

  function runOfficialVolumeTest(timeline, button, statusEl) {
    stopSpeech();
    state.volumeBusy = true;
    state.audioUnlocked = true;
    const original = button ? button.textContent : '';
    if (button) { button.disabled = true; button.textContent = '播放中…'; }
    if (statusEl) { statusEl.textContent = '正在播放聽力音檔開頭（約 10 秒），請調整到聽得清楚的音量…'; statusEl.className = ''; }
    const audio = new Audio(timeline.src);
    audio.setAttribute('playsinline', '');
    state.currentAudio = audio;
    const token = state.speechToken;
    let done = false;
    const finish = (ok) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      try { audio.pause(); } catch (e) { /* ignore */ }
      if (state.currentAudio === audio) state.currentAudio = null;
      state.volumeBusy = false;
      if (button) { button.disabled = false; button.textContent = original || '🔊 播放音量測試'; }
      if (statusEl && token === state.speechToken) {
        statusEl.textContent = ok ? '音量測試完成。正式測驗的聲音就是這個官方錄音，聽得清楚就可以開始。' : '無法播放音檔：請確認網路連線，iPhone 請關閉靜音模式後再試一次。';
        statusEl.className = ok ? 'ok' : 'error';
      }
    };
    const timer = setTimeout(() => finish(true), 10000);
    audio.addEventListener('ended', () => finish(true));
    audio.addEventListener('error', () => finish(false));
    const pr = audio.play();
    if (pr && pr.catch) pr.catch(() => finish(false));
  }

  /* ----------------------------------------------------------------------
     行動裝置語音解鎖（iOS Safari／Chrome、Android Chrome）
     手機瀏覽器規定：第一次發聲必須發生在「使用者點擊」的同一個事件裡。
     之後由計時器自動播放的聽力，才不會被瀏覽器靜音擋掉。
     ---------------------------------------------------------------------- */
  const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';

  function unlockAudio() {
    if (state.audioUnlocked) return;
    state.audioUnlocked = true;
    // 1) 播一段靜音 <audio>，讓 iOS 把音訊工作階段切到「播放」模式。
    try {
      const a = new Audio(SILENT_WAV);
      a.setAttribute('playsinline', '');
      a.volume = 0;
      const pr = a.play();
      if (pr && pr.catch) pr.catch(() => {});
    } catch (e) { /* ignore */ }
    // 2) 在手勢內送出一段無聲語句，解鎖 speechSynthesis。
    if ('speechSynthesis' in window) {
      try {
        const synth = window.speechSynthesis;
        if (synth.paused) synth.resume();
        const u = new SpeechSynthesisUtterance(' ');
        u.volume = 0;
        u.rate = 10;
        u.lang = 'en-US';
        synth.speak(u);
        loadVoices();
      } catch (e) { /* ignore */ }
    }
  }

  function stopSpeech() {
    state.speechToken += 1;
    if (state.currentAudio) {
      try {
        state.currentAudio.pause();
        state.currentAudio.src = '';
      } catch (e) { /* ignore */ }
      state.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      try {
        // iOS 在 cancel() 後立刻 speak() 常會無聲，所以只有真的在播時才取消。
        const synth = window.speechSynthesis;
        if (synth.speaking || synth.pending) synth.cancel();
      } catch (e) { /* ignore */ }
    }
  }

  async function runVolumeTest(button, statusEl) {
    if (state.volumeBusy) return;
    if (!('speechSynthesis' in window)) {
      if (statusEl) {
        statusEl.textContent = '此瀏覽器不支援 Web Speech API，請改用 Chrome、Edge 或 Safari。';
        statusEl.className = 'error';
      }
      showToast('瀏覽器不支援語音播報', 'error');
      return;
    }
    if (state.listeningBusy) {
      showToast('聽力播報中，請等本段結束再測試音量。');
      return;
    }
    const officialTest = officialAudioFor(state.pendingStart.testId || state.testId);
    if (officialTest) {
      runOfficialVolumeTest(officialTest, button, statusEl);
      return;
    }
    state.volumeBusy = true;
    const original = button ? button.textContent : '';
    if (button) { button.disabled = true; button.textContent = '播放中…'; }
    if (statusEl) {
      statusEl.textContent = '正在播放中英混合測試音，請調整音量…';
      statusEl.className = '';
    }
    stopSpeech();
    state.audioUnlocked = true; // 本次點擊直接發聲，即完成解鎖
    const token = state.speechToken;
    const demo = [
      { speaker: 'Narrator', text: 'This is a volume test for the TOEIC listening section. You will hear each recording only once.' },
      { speaker: 'M', text: 'Excuse me. Could you tell me where the library is?' },
      { speaker: 'W', text: 'Sure. Go straight and turn left at the second corner.' }
    ];
    try {
      for (let i = 0; i < demo.length; i += 1) {
        if (token !== state.speechToken) break;
        const line = demo[i];
        const chunks = splitSpeechText(line.text, 170);
        for (let j = 0; j < chunks.length; j += 1) {
          if (token !== state.speechToken) break;
          await speakChunk(chunks[j], line.speaker, 0.98);
        }
      }
    } finally {
      state.volumeBusy = false;
      if (button) { button.disabled = false; button.textContent = original || '🔊 播放音量測試'; }
      if (statusEl && token === state.speechToken) {
        statusEl.textContent = '音量測試完成。若三個角色的音量都清楚，就可以開始測驗。';
        statusEl.className = 'ok';
      }
    }
  }

  /* ======================================================================
     考試大廳
     ====================================================================== */
  function renderLobby() {
    const container = $('#testCards');
    if (!container) return;

    container.innerHTML = TEST_META.map((meta) => {
      const listening = getSectionData(meta.id, 'listening');
      const reading = getSectionData(meta.id, 'reading');
      const lCount = listening.questions.length;
      const rCount = reading.questions.length;
      const total = lCount + rCount;
      const any = total > 0;
      const both = lCount > 0 && rCount > 0;
      const title = 'TOEIC 模擬測驗 ' + meta.label;
      const description = (listening.description || reading.description || '完整聽力與閱讀測驗，依正式流程計時與閱卷。');

      let actions;
      if (!any) {
        actions = '<div class="empty-note"><span>📥</span><div><b>題庫尚未匯入</b><br>請在 <code>' + meta.files.listening + '</code> 與 <code>' + meta.files.reading + '</code> 填入題庫資料，重新整理後即可開始。</div></div>';
      } else {
        const primaryMode = both ? 'full' : (lCount ? 'listening' : 'reading');
        const primaryLabel = both ? '開始完整測驗' : (lCount ? '開始聽力測驗' : '開始閱讀測驗');
        const secondary = [];
        if (both) {
          secondary.push('<button type="button" class="btn btn-secondary" data-action="choose-test" data-test="' + meta.id + '" data-mode="listening">只考聽力</button>');
          secondary.push('<button type="button" class="btn btn-secondary" data-action="choose-test" data-test="' + meta.id + '" data-mode="reading">只考閱讀</button>');
        } else if (lCount) {
          secondary.push('<button type="button" class="btn btn-secondary" data-action="choose-test" data-test="' + meta.id + '" data-mode="listening">聽力說明</button>');
        } else {
          secondary.push('<button type="button" class="btn btn-secondary" data-action="choose-test" data-test="' + meta.id + '" data-mode="reading">閱讀說明</button>');
        }
        actions =
          '<button type="button" class="btn btn-primary" data-action="choose-test" data-test="' + meta.id + '" data-mode="' + primaryMode + '">' + primaryLabel + '</button>' +
          '<div class="test-card-actions-row">' + secondary.join('') + '</div>';
      }

      return (
        '<article class="test-card' + (any ? '' : ' is-empty') + '">' +
          '<div class="test-card-head">' +
            '<div>' +
              '<span class="test-card-tag">' + (any ? 'Mock Test ' + meta.id : 'Awaiting Data') + '</span>' +
              '<h2 class="test-card-title">' + escapeHtml(title) + '</h2>' +
              '<p class="test-card-desc">' + escapeHtml(description) + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="test-card-stats">' +
            '<div class="test-card-stat"><strong>' + (lCount || '—') + '</strong><span>聽力題數</span></div>' +
            '<div class="test-card-stat"><strong>' + (rCount || '—') + '</strong><span>閱讀題數</span></div>' +
            '<div class="test-card-stat"><strong>' + (total || '—') + '</strong><span>合計</span></div>' +
          '</div>' +
          '<div class="test-card-actions">' + actions + '</div>' +
        '</article>'
      );
    }).join('');

    updateHeaderVolumeButton();
    if (window.TOEIC_RECORDS) window.TOEIC_RECORDS.render();
  }

  function updateHeaderVolumeButton() {
    const btn = $('#headerVolumeBtn');
    if (!btn) return;
    const show = state.view === 'exam' && state.activeSection === 'listening';
    btn.hidden = !show;
  }

  /* ======================================================================
     開始測驗 Modal
     ====================================================================== */
  function modeAvailability(testId) {
    const listening = getSectionData(testId, 'listening');
    const reading = getSectionData(testId, 'reading');
    return {
      listening: listening.questions.length > 0,
      reading: reading.questions.length > 0,
      full: listening.questions.length > 0 && reading.questions.length > 0,
      counts: {
        listening: listening.questions.length,
        reading: reading.questions.length
      }
    };
  }

  function openStartModal(testId, preferredMode) {
    const meta = getTest(testId);
    if (!meta) return;
    const availability = modeAvailability(testId);
    if (!availability.listening && !availability.reading) {
      showToast('此回題庫尚未匯入，請先填入 data/ 題庫資料。', 'error');
      return;
    }
    let mode = preferredMode || 'full';
    if (!availability[mode]) {
      mode = availability.full ? 'full' : availability.listening ? 'listening' : 'reading';
    }
    state.pendingStart = { testId, mode };

    const kicker = $('#startModalKicker');
    if (kicker) kicker.textContent = 'TOEIC ' + meta.label + ' · ' + (availability.counts.listening + availability.counts.reading) + ' 題';
    const readingMinutes = Math.max(1, Math.round((getSectionData(testId, 'reading').durationSec || READ_DURATION_DEFAULT) / 60));
    const officialTl = officialAudioFor(testId);
    const listeningMinutes = officialTl ? Math.round(officialTl.duration / 60) : Math.max(5, Math.ceil(availability.counts.listening * 1.15));
    const modeCopy = {
      full: {
        small: '聽力 ' + availability.counts.listening + ' 題 ＋ 閱讀 ' + availability.counts.reading + ' 題，依正式流程連續進行。',
        em: '約 ' + (listeningMinutes + readingMinutes) + ' 分鐘'
      },
      listening: {
        small: officialTl ? '聽力共 ' + availability.counts.listening + ' 題，多口音連續播放；可先做音量測試。' : '逐段播報共 ' + availability.counts.listening + ' 題，每題僅播一次；可先做音量測試。',
        em: '約 ' + listeningMinutes + ' 分鐘'
      },
      reading: {
        small: '閱讀 ' + availability.counts.reading + ' 題，' + readingMinutes + ' 分鐘倒數；完整記錄每題停留配速。',
        em: readingMinutes + ' 分鐘'
      }
    };
    $$('.mode-card').forEach((card) => {
      const input = $('input[name="examMode"]', card);
      if (!input || !modeCopy[input.value]) return;
      const small = $('small', card);
      const em = $('em', card);
      if (small) small.textContent = modeCopy[input.value].small;
      if (em) em.textContent = modeCopy[input.value].em;
    });
    const status = $('#volumeStatus');
    if (status) {
      status.textContent = '播放一段中英混合測試音，確認音量與語速。正式測驗中不可暫停或回放。';
      status.className = '';
    }

    $$('input[name="examMode"]').forEach((input) => {
      const available = Boolean(availability[input.value]);
      input.disabled = !available;
      input.checked = input.value === mode;
      const card = input.closest('.mode-card');
      if (card) {
        card.classList.toggle('is-disabled', !available);
        card.setAttribute('aria-disabled', String(!available));
      }
    });

    updateStartButton();
    openModal($('#startModal'));
    const startBtn = $('#startExamBtn');
    if (startBtn) setTimeout(() => startBtn.focus(), 120);
  }

  function updateStartButton() {
    const btn = $('#startExamBtn');
    if (!btn) return;
    const testId = state.pendingStart.testId;
    const mode = state.pendingStart.mode;
    const availability = modeAvailability(testId);
    const count = mode === 'full'
      ? availability.counts.listening + availability.counts.reading
      : (availability.counts[mode] || 0);
    btn.textContent = '開始測驗（' + count + ' 題）';
    btn.disabled = !availability[mode];
  }

  /* ======================================================================
     考試流程：開始 / 分區 / 計時
     ====================================================================== */
  function startExam(testId, mode) {
    const availability = modeAvailability(testId);
    if (!availability[mode]) {
      showToast('此測驗模式沒有可用題庫。', 'error');
      return;
    }
    stopSpeech();
    clearAllTimers();
    endDwell();

    state.testId = Number(testId);
    state.mode = mode;
    state.sections = {
      listening: mode !== 'reading' && availability.listening ? getSectionData(testId, 'listening') : null,
      reading: mode !== 'listening' && availability.reading ? getSectionData(testId, 'reading') : null
    };
    state.activeSection = mode === 'reading' ? 'reading' : 'listening';
    state.listeningUnlocked = Boolean(state.sections.listening);
    state.readingUnlocked = mode === 'reading';
    state.listeningGroupIndex = 0;
    state.readingQuestionIndex = 0;
    state.answers = {};
    state.flags = new Set();
    state.dwell = {};
    state.dwellKey = null;
    state.listeningPlayed = new Set();
    state.listeningBusy = false;
    state.listeningFinished = false;
    state.listeningElapsed = 0;
    state.listenProgress = 0;
    state.preRead = null;
    state.answerWindow = null;
    state.readingStarted = false;
    state.readingStart = null;
    state.readingDeadline = null;
    state.readingRemaining = null;
    state.submitted = false;
    state.result = null;
    state.reviewFilter = 'all';
    state.startedAt = Date.now();
    state.passageGroupId = null;
    state.official = null;
    const officialTimeline = state.sections.listening ? officialAudioFor(testId) : null;
    if (officialTimeline) {
      state.official = { timeline: officialTimeline, audio: null, started: false, ended: false, segIndex: 0, needResume: false, lastTime: 0, token: null, follow: true };
    }

    closeAllModals();
    closeDictionary();
    switchView('exam');
    renderExamChrome();

    if (state.activeSection === 'listening' && state.official) {
      // 官方原音：等使用者按「開始聽力測驗」才開始播放與計時。
      state.listeningStart = null;
      renderListening();
      renderAnswerCard();
      renderSectionTabs();
      updateClockUI('聽力全長', formatClock(state.official.timeline.duration), 'normal');
    } else if (state.activeSection === 'listening') {
      state.listeningStart = Date.now();
      startListeningClock();
      enterListeningGroup(0, { instant: true });
    } else {
      startReadingSection(true);
    }
    updateHeaderVolumeButton();
  }

  function clearAllTimers() {
    resetPause();
    if (state.timerId) { clearInterval(state.timerId); state.timerId = null; }
    clearPreReadTimer();
    clearAnswerWindowTimer();
    clearTimeout(state.autoAdvanceTimer);
    state.autoAdvanceTimer = null;
  }

  function updateClockUI(label, value, clockState) {
    const clock = $('#examClock');
    const labelEl = $('#clockLabel');
    const valueEl = $('#clockValue');
    if (!clock || !labelEl || !valueEl) return;
    labelEl.textContent = label;
    valueEl.textContent = value;
    clock.setAttribute('data-state', clockState || 'normal');
  }

  function startListeningClock() {
    clearInterval(state.timerId);
    state.timerId = null;
    if (!state.listeningStart) state.listeningStart = Date.now();
    const tick = () => {
      if (state.submitted || state.paused) return;
      if (state.readingStart) return;
      const off = state.official;
      if (off && off.audio && off.started && !off.ended && !state.listeningFinished) {
        const remaining = Math.max(0, off.timeline.duration - (off.audio.currentTime || 0)) / getSpeed();
        updateClockUI('聽力剩餘', formatClock(remaining), 'normal');
        return;
      }
      state.listeningElapsed = (Date.now() - state.listeningStart) / 1000;
      updateClockUI(state.listeningFinished ? '聽力完成' : '聽力進行', formatClock(state.listeningElapsed), state.listeningFinished ? 'counting' : 'normal');
    };
    tick();
    state.timerId = setInterval(tick, 500);
  }

  function startReadingSection(autoFromListening) {
    if (!state.sections.reading || !state.sections.reading.available) {
      showToast('此回沒有閱讀題庫。', 'error');
      return;
    }
    state.readingUnlocked = true;
    state.activeSection = 'reading';
    state.readingStarted = true;
    if (!state.readingStart) state.readingStart = Date.now();
    const duration = state.sections.reading.durationSec || READ_DURATION_DEFAULT;
    state.readingDeadline = state.readingStart + duration * 1000;
    startReadingTimer();
    renderExamChrome();
    goToReading(0, { silent: true });
    if (!autoFromListening) showToast('閱讀測驗開始，倒數 ' + Math.round(duration / 60) + ' 分鐘。');
  }

  function groupElapsedMs(group) {
    let ms = 0;
    group.questions.forEach((q) => { ms += state.dwell[q.key] || 0; });
    if (state.dwellKey === 'G:' + group.id && state.dwellStart) ms += Date.now() - state.dwellStart;
    return ms;
  }

  function paceDialSvg(fraction, over) {
    const r = 15;
    const c = 2 * Math.PI * r;
    const remain = clamp(fraction, 0, 1);
    const angle = 360 * (1 - remain);
    const color = over ? 'var(--danger)' : remain > 0.5 ? 'var(--success)' : remain > 0.2 ? 'var(--warning)' : 'var(--danger)';
    return '<svg viewBox="0 0 40 40" aria-hidden="true">' +
      '<circle cx="20" cy="20" r="' + r + '" fill="var(--surface)" stroke="var(--line)" stroke-width="5"/>' +
      '<circle cx="20" cy="20" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="5" stroke-dasharray="' + (c * remain).toFixed(2) + ' ' + c.toFixed(2) + '" transform="rotate(' + (angle - 90).toFixed(1) + ' 20 20)"/>' +
      '<line x1="20" y1="20" x2="20" y2="6" stroke="var(--ink)" stroke-width="2.2" stroke-linecap="round" transform="rotate(' + angle.toFixed(1) + ' 20 20)"/>' +
      '<circle cx="20" cy="20" r="2.6" fill="var(--ink)"/>' +
    '</svg>';
  }

  function updatePaceDial() {
    const box = $('#paceDial');
    if (!box) return;
    const show = state.view === 'exam' && !state.submitted && state.activeSection === 'reading' && state.readingStarted;
    const q = show ? currentReadingQuestion() : null;
    if (!q || !q.group) { box.hidden = true; return; }
    const group = q.group;
    const qs = group.questions.length ? group.questions : [q];
    const total = qs.reduce((sum, item) => sum + (item.targetSec || 60), 0);
    const elapsed = groupElapsedMs(group) / 1000;
    const remaining = total - elapsed;
    const over = remaining < 0;
    box.hidden = false;
    box.classList.toggle('over', over);
    box.innerHTML = paceDialSvg(remaining / total, over) +
      '<span class="pace-text"><small>本組建議</small><b>' + (over ? '超 ' + formatClock(-remaining) : formatClock(remaining)) + '</b></span>';
    box.setAttribute('aria-label', '本題組建議 ' + formatClock(total) + '，' + (over ? '已超時 ' + formatClock(-remaining) : '剩 ' + formatClock(remaining)));
  }

  function paceInfo() {
    const q = currentReadingQuestion();
    if (!q || !q.group) return;
    const qs = q.group.questions.length ? q.group.questions : [q];
    const total = qs.reduce((sum, item) => sum + (item.targetSec || 60), 0);
    showToast('本組 ' + qs.length + ' 題，建議 ' + formatClock(total) + '（每題約 ' + Math.round(total / qs.length) + ' 秒）；已用 ' + formatClock(groupElapsedMs(q.group) / 1000) + '。');
  }

  function canPause() {
    return state.view === 'exam' && state.testId && !state.submitted;
  }

  function updatePauseButton() {
    const btn = $('#pauseBtn');
    if (!btn) return;
    btn.hidden = !canPause();
    btn.textContent = state.paused ? '▶ 繼續' : '⏸ 暫停';
    btn.setAttribute('aria-pressed', String(Boolean(state.paused)));
  }

  function pauseExam() {
    if (!canPause() || state.paused) return;
    const off = state.official;
    const inListening = state.activeSection === 'listening' && !state.listeningFinished;
    if (inListening && state.listeningBusy && !off) {
      showToast('語音播報中無法暫停，請等這一段播完再按暫停。');
      return;
    }
    endDwell();
    state.paused = { at: Date.now() };
    if (off && off.audio && off.started && !off.ended) {
      off.userPaused = true;
      try { off.audio.pause(); } catch (e) { /* ignore */ }
    }
    if (state.preRead || state.answerWindow) {
      // 語音模式的預讀／作答倒數：暫停期間不計時
      state.paused.timers = true;
    }
    const overlay = $('#pauseOverlay');
    if (overlay) overlay.hidden = false;
    document.body.classList.add('is-paused');
    updateClockUI('已暫停', $('#clockValue') ? $('#clockValue').textContent : '', 'counting');
    updatePauseButton();
  }

  function resumeExam() {
    if (!state.paused) return;
    const delta = Date.now() - state.paused.at;
    state.paused = null;
    if (state.readingDeadline) state.readingDeadline += delta;
    if (state.listeningStart && !state.listeningFinished) state.listeningStart += delta;
    if (state.preRead && state.preRead.endAt) state.preRead.endAt += delta;
    if (state.answerWindow && state.answerWindow.endAt) state.answerWindow.endAt += delta;
    const off = state.official;
    if (off && off.audio && off.userPaused) {
      off.userPaused = false;
      if (!off.ended) {
        const pr = off.audio.play();
        if (pr && pr.catch) pr.catch(() => onOfficialBlocked(state.speechToken));
      }
    }
    const overlay = $('#pauseOverlay');
    if (overlay) overlay.hidden = true;
    document.body.classList.remove('is-paused');
    if (state.activeSection === 'reading' && state.readingStarted) beginDwell(currentReadingQuestion());
    updatePauseButton();
    showToast('繼續作答，計時恢復。');
  }

  function resetPause() {
    state.paused = null;
    const overlay = $('#pauseOverlay');
    if (overlay) overlay.hidden = true;
    document.body.classList.remove('is-paused');
    updatePauseButton();
  }

  function startReadingTimer() {
    clearInterval(state.timerId);
    state.timerId = null;
    const tick = () => {
      if (state.submitted || !state.readingDeadline || state.paused) return;
      const remaining = Math.max(0, Math.ceil((state.readingDeadline - Date.now()) / 1000));
      state.readingRemaining = remaining;
      let clockState = 'normal';
      if (remaining <= 60) clockState = 'danger';
      else if (remaining <= 300) clockState = 'warning';
      updateClockUI('閱讀剩餘', formatClock(remaining), clockState);
      updatePaceDial();
      if (remaining <= 0) {
        clearInterval(state.timerId);
        state.timerId = null;
        showToast('閱讀測驗時間到，系統自動交卷。', 'error');
        submitExam(true);
      }
    };
    tick();
    state.timerId = setInterval(tick, 250);
  }

  function renderExamChrome() {
    updatePauseButton();
    updatePaceDial();
    const meta = getTest(state.testId);
    const label = $('#examTestLabel');
    if (label && meta) label.textContent = 'TOEIC ' + meta.label;
    const modeLabel = $('#examModeLabel');
    if (modeLabel) {
      modeLabel.textContent = state.mode === 'full' ? '完整測驗' : state.mode === 'listening' ? '只考聽力' : '只考閱讀';
    }
    renderSectionTabs();
    renderAnswerCard();
    updateProgress();
    updateHeaderVolumeButton();
  }

  function renderSectionTabs() {
    const listenTab = $('#tabListening');
    const readTab = $('#tabReading');
    if (!listenTab || !readTab) return;

    const listenAvailable = Boolean(state.sections.listening && state.sections.listening.available);
    const readAvailable = Boolean(state.sections.reading && state.sections.reading.available);
    listenTab.disabled = !listenAvailable;
    readTab.disabled = !readAvailable || (state.mode === 'full' && !state.readingUnlocked);

    listenTab.setAttribute('aria-selected', String(state.activeSection === 'listening'));
    readTab.setAttribute('aria-selected', String(state.activeSection === 'reading'));

    const listenStatus = $('#tabListenStatus');
    if (listenStatus) {
      if (!listenAvailable) listenStatus.textContent = '未提供';
      else if (state.listeningFinished) listenStatus.textContent = '已完成';
      else if (state.listeningBusy) listenStatus.textContent = '播放中';
      else listenStatus.textContent = '第 ' + (state.listeningGroupIndex + 1) + '/' + (state.sections.listening.groups.length) + ' 段';
    }
    const readStatus = $('#tabReadStatus');
    if (readStatus) {
      if (!readAvailable) readStatus.textContent = '未提供';
      else if (!state.readingUnlocked || !state.readingStarted) readStatus.textContent = '未開始';
      else {
        const answered = state.sections.reading.questions.filter((q) => (state.answers[q.key] || []).length).length;
        readStatus.textContent = answered + '/' + state.sections.reading.questions.length + ' 題';
      }
    }
  }

  function switchSection(sectionKey) {
    if (sectionKey === 'listening') {
      if (!state.sections.listening || !state.sections.listening.available) {
        showToast('此測驗沒有聽力分區。');
        return;
      }
      if (state.listeningBusy && !state.official) { showToast('聽力播報中，請等本段結束。'); return; }
      state.activeSection = 'listening';
      endDwell();
      renderExamChrome();
      renderListening();
      updateHeaderVolumeButton();
      return;
    }
    if (!state.sections.reading || !state.sections.reading.available) {
      showToast('此測驗沒有閱讀分區。');
      return;
    }
    if (state.mode === 'full' && !state.readingUnlocked) {
      showToast('請先完成聽力測驗，再進入閱讀測驗。');
      return;
    }
    state.activeSection = 'reading';
    if (!state.readingStarted) {
      startReadingSection(false);
      return;
    }
    renderExamChrome();
    goToReading(state.readingQuestionIndex, { silent: true });
    updateHeaderVolumeButton();
  }

  function updateProgress() {
    const questions = activeQuestions();
    const answered = questions.filter((q) => (state.answers[q.key] || []).length > 0).length;
    const percent = questions.length ? Math.round(answered / questions.length * 100) : 0;
    const fill = $('#examProgressFill');
    const text = $('#examProgressText');
    const bar = $('#examProgressBar');
    if (fill) fill.style.width = percent + '%';
    if (text) text.textContent = answered + ' / ' + questions.length + ' 題';
    if (bar) bar.setAttribute('aria-valuenow', String(percent));
  }

  /* ======================================================================
     答題卡
     ====================================================================== */
  let answerCardSection = null;

  function renderAnswerCard() {
    const section = state.sections[state.activeSection];
    const grid = $('#answerGrid');
    const title = $('#answerCardTitle');
    const sub = $('#answerCardSub');
    const count = $('#answerCount');
    if (!grid) return;
    if (!section) {
      grid.innerHTML = '';
      if (title) title.textContent = '答題卡';
      if (sub) sub.textContent = '目前沒有題目';
      if (count) count.textContent = '0/0';
      return;
    }
    answerCardSection = state.activeSection;
    if (title) title.textContent = section.title || (state.activeSection === 'listening' ? '聽力測驗' : '閱讀測驗');
    if (sub) sub.textContent = section.questions.length + ' 題 · 點題號快速跳題';
    const activeKeys = new Set();
    if (state.activeSection === 'reading') {
      const q = currentReadingQuestion();
      if (q) (q.group && q.group.questions.length ? q.group.questions : [q]).forEach((item) => activeKeys.add(item.key));
    } else {
      const group = currentListeningGroup();
      if (group) group.questions.forEach((q) => activeKeys.add(q.key));
    }
    grid.innerHTML = section.questions.map((q) => {
      const answered = (state.answers[q.key] || []).length > 0;
      const flagged = state.flags.has(q.key);
      const active = activeKeys.has(q.key);
      return '<button type="button" class="answer-cell' +
        (answered ? ' answered' : '') +
        (flagged ? ' flagged' : '') +
        (active ? ' active' : '') +
        '" data-action="goto-question" data-key="' + escapeAttr(q.key) + '" aria-label="第 ' + q.num + ' 題' + (answered ? '，已作答' : '，未作答') + '">' +
        q.num + '</button>';
    }).join('');
    refreshAnswerCardState();
  }

  function refreshAnswerCardState() {
    const section = state.sections[answerCardSection];
    if (!section) return;
    const activeKeys = new Set();
    if (state.activeSection === 'reading') {
      const q = currentReadingQuestion();
      if (q) (q.group && q.group.questions.length ? q.group.questions : [q]).forEach((item) => activeKeys.add(item.key));
    } else {
      const group = currentListeningGroup();
      if (group) group.questions.forEach((q) => activeKeys.add(q.key));
    }
    $$('.answer-cell', $('#answerGrid')).forEach((cell) => {
      const key = cell.getAttribute('data-key');
      const answered = (state.answers[key] || []).length > 0;
      cell.classList.toggle('answered', answered);
      cell.classList.toggle('flagged', state.flags.has(key));
      cell.classList.toggle('active', activeKeys.has(key));
    });
    const answeredCount = section.questions.filter((q) => (state.answers[q.key] || []).length > 0).length;
    const countEl = $('#answerCount');
    if (countEl) countEl.textContent = answeredCount + '/' + section.questions.length;
    updateListeningOverview();
    updateProgress();
    renderSectionTabs();
  }

  /* ======================================================================
     聽力測驗：預讀、Web Speech 播報、單次播放、自動跳題
     ====================================================================== */
  function clearPreReadTimer() {
    if (state.preReadTimer) { clearInterval(state.preReadTimer); state.preReadTimer = null; }
  }

  function clearAnswerWindowTimer() {
    if (state.answerWindowTimer) { clearInterval(state.answerWindowTimer); state.answerWindowTimer = null; }
    state.answerWindow = null;
  }

  function enterListeningGroup(index, options) {
    const section = state.sections.listening;
    if (!section || !section.groups.length) return;
    if (state.listeningBusy && !state.official) { showToast('聽力播報中，請等本段結束。'); return; }
    clearPreReadTimer();
    clearAnswerWindowTimer();
    clearTimeout(state.autoAdvanceTimer);
    state.preRead = null;
    state.listeningGroupIndex = clamp(index, 0, section.groups.length - 1);
    if (state.official) {
      state.official.follow = state.listeningGroupIndex === playingGroupIndex();
    } else {
      state.listenProgress = state.listeningPlayed.has(section.groups[state.listeningGroupIndex].id) ? 100 : 0;
    }
    renderListening();
    renderAnswerCard();
    renderSectionTabs();
    updateHeaderVolumeButton();
    const group = section.groups[state.listeningGroupIndex];
    if (state.official) {
      const mainEl = $('#examMain');
      if (mainEl && mainEl.getBoundingClientRect().top < 0) mainEl.scrollIntoView({ block: 'start' });
    }
    if (!state.official && !state.listeningPlayed.has(group.id) && group.preReadSec > 0 && !(options && options.instant && group.preReadSec === 0)) {
      startPreRead(group);
    }
  }

  function startPreRead(group) {
    clearPreReadTimer();
    const total = Math.max(1, Math.ceil(group.preReadSec));
    const deadline = Date.now() + total * 1000;
    state.preRead = { groupKey: group.id, remaining: total, total, endAt: deadline };
    renderListening();
    const tick = () => {
      if (state.listeningBusy || state.paused) return;
      if (!state.preRead || state.preRead.groupKey !== group.id) { clearPreReadTimer(); return; }
      const remaining = Math.max(0, Math.ceil((state.preRead.endAt - Date.now()) / 1000));
      state.preRead.remaining = remaining;
      const el = $('#pretestNum');
      if (el) el.textContent = String(remaining).padStart(2, '0');
      if (remaining <= 0) {
        clearPreReadTimer();
        state.preRead = null;
        renderListening();
        playListeningGroup();
      }
    };
    state.preReadTimer = setInterval(tick, 250);
  }

  function renderListening() {
    const section = state.sections.listening;
    const main = $('#examMain');
    if (!main) return;
    if (!section || !section.questions.length) {
      main.innerHTML = '<div class="review-empty"><strong>此回尚未提供聽力題庫</strong>請在 data/testX_listening.js 匯入題目。</div>';
      return;
    }
    const group = currentListeningGroup();
    if (!group) return;
    if (state.official) {
      renderOfficialListening(section, group, main);
      return;
    }
    const played = state.listeningPlayed.has(group.id);
    const preReadActive = state.preRead && state.preRead.groupKey === group.id;
    const answerWindowActive = state.answerWindow && state.answerWindow.groupKey === group.id;
    const firstNum = group.questions[0] ? group.questions[0].num : '';
    const lastNum = group.questions[group.questions.length - 1] ? group.questions[group.questions.length - 1].num : '';
    const range = firstNum === lastNum ? '第 ' + firstNum + ' 題' : '第 ' + firstNum + '–' + lastNum + ' 題';

    let statusText = '待播放';
    if (state.listeningBusy) statusText = '播放中';
    else if (played) statusText = '已播畢';
    else if (preReadActive) statusText = '預讀中';

    let banner =
      '<div class="listening-banner' + (state.listeningBusy ? ' playing' : '') + '">' +
        '<div class="listen-status-row">' +
          '<span class="listen-badge"><span class="dot"></span><span id="listenStatusText">' + statusText + '</span></span>' +
          '<span class="listen-group-meta">' + escapeHtml(shortPart(group.partTitle)) + ' · 第 ' + (state.listeningGroupIndex + 1) + ' / ' + section.groups.length + ' 段 · ' + range + '</span>' +
        '</div>' +
        '<h3 class="listen-title">' + escapeHtml(group.taskTitle || group.partTitle) + '</h3>' +
        '<p class="listen-sub">' + escapeHtml(group.description || '每段音檔僅播放一次；播畢後將保留作答時間，再自動前往下一題組。') + '</p>' +
        '<div class="listen-controls">' +
          '<button type="button" class="btn-listen" data-action="play-group"' + (played || state.listeningBusy || preReadActive ? ' disabled' : '') + '>' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>' +
            (state.listeningBusy ? '播報中…' : played ? '本段已播畢（僅播一次）' : '播放本段音檔（僅一次）') +
          '</button>' +
          '<div class="wave" aria-hidden="true">' + '<span></span>'.repeat(18) + '</div>' +
          '<span class="listen-group-meta">' + (group.preReadSec ? '預讀 ' + group.preReadSec + ' 秒' : '無預讀') + '</span>' +
        '</div>' +
        '<div class="audio-progress"><div class="audio-progress-fill" id="audioProgressFill" style="width:' + clamp(state.listenProgress || 0, 0, 100) + '%"></div></div>' +
        '<div class="listen-note"><span>🎧</span><div><b>正式考試模擬：</b>每段音檔僅播一次，不提供暫停、回放與變速。' + (played ? ' 本段已播畢，仍可作答或檢視其他題目。' : ' 播放前請確認音量。') + '</div></div>' +
      '</div>';

    let preReadPanel = '';
    if (preReadActive) {
      preReadPanel =
        '<div class="pretest-countdown">' +
          '<span class="pretest-num" id="pretestNum">' + String(state.preRead.remaining).padStart(2, '0') + '</span>' +
          '<div class="pretest-copy"><strong>Part III 題組預讀時間</strong><span>請先閱讀右側題目；倒數結束後將自動開始播報，且僅播放一次。</span></div>' +
        '</div>';
    }

    let answerWindowPanel = '';
    if (answerWindowActive) {
      answerWindowPanel =
        '<div class="pretest-countdown" id="answerWindowPanel">' +
          '<span class="pretest-num" id="answerWindowNum">' + Math.max(0, state.answerWindow.remaining) + '</span>' +
          '<div class="pretest-copy"><strong>作答時間</strong><span>倒數結束後自動前往下一題組；你也可以按「下一題組」提前繼續。</span></div>' +
        '</div>';
    }

    const questionsHtml = group.questions.map((q) => renderQuestionCard(q, { compact: true })).join('');
    const isLast = state.listeningGroupIndex >= section.groups.length - 1;
    let footer =
      '<div class="q-footer" style="background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:14px 18px;">' +
        '<span class="q-footer-meta">' + (played ? '音檔已播畢；本題組共 ' + group.questions.length + ' 題。' : '播放後才會顯示作答倒數。') + '</span>' +
        '<div class="q-nav">' +
          '<button type="button" class="btn btn-secondary btn-sm" data-action="prev-group"' + (state.listeningGroupIndex === 0 || state.listeningBusy || preReadActive ? ' disabled' : '') + '>上一題組</button>' +
          '<button type="button" class="btn btn-primary btn-sm" data-action="next-group"' + (state.listeningBusy || preReadActive ? ' disabled' : '') + '>' + (isLast ? '完成聽力' : '下一題組') + '</button>' +
        '</div>' +
      '</div>';

    let finishHtml = '';
    if (state.listeningFinished) {
      finishHtml =
        '<div class="listen-finish">' +
          '<h3>聽力測驗已完成</h3>' +
          '<p>本回聽力共 ' + section.questions.length + ' 題。你可以先透過答題卡檢查，或直接進入下一個階段。</p>' +
          '<div class="q-nav" style="justify-content:center;">' +
            '<button type="button" class="btn btn-secondary" data-action="open-listening-done">測驗結果選項</button>' +
            (state.sections.reading ? '<button type="button" class="btn btn-primary" data-action="start-reading">進入閱讀測驗</button>' : '<button type="button" class="btn btn-primary" data-action="confirm-submit">查看成績</button>') +
          '</div>' +
        '</div>';
    }

    main.innerHTML =
      '<div class="listening-stage">' +
        preReadPanel + banner + answerWindowPanel + questionsHtml + footer + finishHtml +
      '</div>';
  }

  /* ======================================================================
     官方原音連續播放模式
     - 每回一個約 31 分鐘的連續音檔（audio/testN_listening.mp3），已含預讀與作答停頓
     - 開始後一路播到最後，不提供暫停、倒轉、重播；題目畫面依時間軸自動切換
     - 時間軸來自 data/audio_timeline.js（tools/build_audio.py 產生）
     ====================================================================== */
  const SPEEDS = [1, 1.1, 1.2, 1.3];
  function getSpeed() {
    if (state.speed) return state.speed;
    let v = 1;
    try { v = Number(localStorage.getItem('bestep-speed')) || 1; } catch (e) { v = 1; }
    state.speed = SPEEDS.indexOf(v) !== -1 ? v : 1;
    return state.speed;
  }
  function speedLabel() {
    const v = getSpeed();
    return (v === 1 ? '🐢 語速 ' : '🐇 語速 ') + v.toFixed(1) + '×';
  }
  function speedButtonHtml() {
    return '<button type="button" class="btn btn-secondary btn-sm speed-btn' + (getSpeed() > 1 ? ' is-fast' : '') + '" data-action="cycle-speed" title="切換聽力語速 1.0／1.1／1.2／1.3 倍">' + speedLabel() + '</button>';
  }
  function applySpeed(audio) {
    if (!audio) return;
    const v = getSpeed();
    try {
      audio.defaultPlaybackRate = v;
      audio.playbackRate = v;
      if ('preservesPitch' in audio) audio.preservesPitch = true;
      if ('webkitPreservesPitch' in audio) audio.webkitPreservesPitch = true;
    } catch (e) { /* ignore */ }
  }
  function cycleSpeed() {
    const v = getSpeed();
    const next = SPEEDS[(SPEEDS.indexOf(v) + 1) % SPEEDS.length];
    state.speed = next;
    try { localStorage.setItem('bestep-speed', String(next)); } catch (e) { /* ignore */ }
    if (state.official && state.official.audio) applySpeed(state.official.audio);
    applySpeed(state.replayAudio);
    $$('[data-action="cycle-speed"]').forEach((btn) => {
      btn.textContent = speedLabel();
      btn.classList.toggle('is-fast', next > 1);
    });
    showToast('聽力語速 ' + next.toFixed(1) + '×' + (next > 1 ? '（比正式考試快，練習加難度用）' : '（正式考試速度）'));
  }

  /* ---------- 跳過空白（作答／預讀的等待時間） ---------- */
  function currentGap(off) {
    if (!off || !off.audio) return null;
    const t = off.audio.currentTime || 0;
    return (off.timeline.gaps || []).find((g) => t >= g[0] && t < g[1] - 0.6) || null;
  }

  function skipOfficialGap() {
    const off = state.official;
    if (!off || !off.audio || !off.started || off.ended) return;
    const t = off.audio.currentTime || 0;
    const inGap = currentGap(off);
    if (!inGap) {
      // 正在播題目內容：再按一次才跳，避免誤觸漏聽
      if (!off.skipArm || Date.now() - off.skipArm > 3000) {
        off.skipArm = Date.now();
        showToast('現在正在播題目內容；3 秒內再按一次才會跳到下一段。');
        return;
      }
    }
    off.skipArm = 0;
    let target = null;
    const gaps = off.timeline.gaps || [];
    for (let i = 0; i < gaps.length; i += 1) {
      if (gaps[i][1] - 0.6 > t) { target = gaps[i][1] - 0.4; break; }
    }
    if (target == null) target = Math.max(t, off.timeline.duration - 0.2);
    try { off.audio.currentTime = target; } catch (e) { /* ignore */ }
    showToast('⏭ 已跳過等待，直接播下一段。');
    updateOfficialTime();
  }

  function shortPart(title) {
    return String(title || '').replace(/Part\s+III\b/i, 'Part 3').replace(/Part\s+II\b/i, 'Part 2').replace(/Part\s+I\b/i, 'Part 1');
  }

  function playingGroupIndex() {
    const off = state.official;
    if (!off) return -1;
    if (off.ended) return -1;
    const seg = off.timeline.segments[off.segIndex];
    return seg && seg.firstQ != null ? groupIndexForQuestion(seg.firstQ) : 0;
  }

  function followPlaying() {
    const gi = playingGroupIndex();
    if (gi < 0) return;
    enterListeningGroup(gi);
  }

  function renderListeningOverview() {
    const section = state.sections.listening;
    if (!section) return '';
    const playingGi = state.official && state.official.started ? playingGroupIndex() : -1;
    const playingKeys = new Set(playingGi >= 0 ? section.groups[playingGi].questions.map((q) => q.key) : []);
    const viewKeys = new Set((currentListeningGroup() || { questions: [] }).questions.map((q) => q.key));
    const unanswered = [];
    const partOrder = [];
    const partGroups = {};
    section.groups.forEach((g) => {
      const title = g.partTitle || 'Part';
      if (!partGroups[title]) { partGroups[title] = []; partOrder.push(title); }
      partGroups[title].push(g);
    });
    const rows = partOrder.map((title) => {
      const part = { title: title, groups: partGroups[title] };
      const cells = part.groups.map((g) => g.questions.map((q) => {
        const answered = (state.answers[q.key] || []).length > 0;
        if (!answered) unanswered.push(q.num);
        return '<button type="button" class="ov-cell' +
          (answered ? ' answered' : '') +
          (state.flags.has(q.key) ? ' flagged' : '') +
          (playingKeys.has(q.key) ? ' playing' : '') +
          (viewKeys.has(q.key) ? ' viewing' : '') +
          '" data-action="goto-question" data-key="' + escapeAttr(q.key) + '" aria-label="第 ' + q.num + ' 題' + (answered ? '，已作答' : '，未作答') + (playingKeys.has(q.key) ? '，播放中' : '') + '">' + q.num + '</button>';
      }).join('')).join('');
      return '<div class="ov-row"><span class="ov-part">' + escapeHtml(shortPart(part.title)) + '</span><div class="ov-cells">' + cells + '</div></div>';
    }).join('');
    const answeredCount = section.questions.length - unanswered.length;
    const todo = unanswered.length
      ? '<span class="ov-todo">還沒作答 ' + unanswered.length + ' 題：' + unanswered.join('、') + '</span>'
      : '<span class="ov-done">✓ ' + section.questions.length + ' 題全部作答完畢</span>';
    return '<div class="ov-head"><strong>聽力 ' + section.questions.length + ' 題總覽</strong><span>已作答 ' + answeredCount + ' / ' + section.questions.length + '</span></div>' +
      rows +
      '<div class="ov-foot">' + todo + '</div>' +
      '<div class="ov-legend"><span><i class="ov-dot answered"></i>已作答</span><span><i class="ov-dot playing"></i>播放中</span><span><i class="ov-dot viewing"></i>正在看</span></div>';
  }

  function updateListeningOverview() {
    const box = $('#listenOverview');
    if (box) box.innerHTML = renderListeningOverview();
  }

  function officialAudioFor(testId) {
    const all = window.BESTEP_AUDIO || {};
    const t = all[String(testId)];
    return t && t.src && Array.isArray(t.segments) && t.segments.length ? t : null;
  }

  function groupIndexForQuestion(num) {
    const section = state.sections.listening;
    if (!section || num == null) return -1;
    return section.groups.findIndex((g) => g.questions.some((q) => Number(q.num) === Number(num)));
  }

  function segmentIndexAt(timeline, t) {
    const segs = timeline.segments;
    for (let i = segs.length - 1; i >= 0; i -= 1) {
      if (t >= segs[i].start) return i;
    }
    return 0;
  }

  function lockMediaSession(title) {
    if (!('mediaSession' in navigator)) return;
    try {
      if (window.MediaMetadata) navigator.mediaSession.metadata = new MediaMetadata({ title: title, artist: 'TOEIC 模擬測驗' });
    } catch (e) { /* ignore */ }
    // 鎖定畫面／耳機上的暫停、快轉、倒轉一律不作用，模擬正式考試「不可暫停」。
    ['pause', 'stop', 'seekbackward', 'seekforward', 'seekto', 'previoustrack', 'nexttrack'].forEach((action) => {
      try { navigator.mediaSession.setActionHandler(action, () => {}); } catch (e) { /* ignore */ }
    });
  }

  function releaseMediaSession() {
    if (!('mediaSession' in navigator)) return;
    ['pause', 'stop', 'seekbackward', 'seekforward', 'seekto', 'previoustrack', 'nexttrack'].forEach((action) => {
      try { navigator.mediaSession.setActionHandler(action, null); } catch (e) { /* ignore */ }
    });
  }

  function startOfficialListening() {
    const off = state.official;
    if (!off || off.started || state.submitted) return;
    stopSpeech();
    const token = state.speechToken;
    const audio = new Audio();
    audio.preload = 'auto';
    audio.setAttribute('playsinline', '');
    audio.setAttribute('webkit-playsinline', '');
    audio.src = off.timeline.src;
    applySpeed(audio);
    audio.addEventListener('loadedmetadata', () => applySpeed(audio));
    audio.addEventListener('play', () => { if (audio.playbackRate !== getSpeed()) applySpeed(audio); });
    off.audio = audio;
    off.started = true;
    off.token = token;
    state.currentAudio = audio;
    state.audioUnlocked = true;
    state.listeningBusy = true;
    state.listeningStart = Date.now();
    audio.addEventListener('timeupdate', () => onOfficialTime(token));
    audio.addEventListener('ended', () => onOfficialEnded(token));
    audio.addEventListener('pause', () => onOfficialPause(token));
    audio.addEventListener('playing', () => {
      if (token !== state.speechToken || !off.needResume) return;
      off.needResume = false;
      renderListening();
    });
    audio.addEventListener('error', () => onOfficialError(token));
    const test = getTest(state.testId);
    lockMediaSession('TOEIC ' + (test ? test.label : '') + ' 聽力');
    const pr = audio.play();
    if (pr && pr.catch) pr.catch(() => onOfficialBlocked(token));
    setTimeout(() => updateOfficialTime(), 300);
    startListeningClock();
    renderListening();
    renderSectionTabs();
    updateHeaderVolumeButton();
  }

  function onOfficialTime(token) {
    const off = state.official;
    if (!off || token !== state.speechToken || !off.audio) return;
    const t = off.audio.currentTime || 0;
    off.lastTime = t;
    state.listenProgress = clamp(Math.round(t / off.timeline.duration * 1000) / 10, 0, 100);
    const idx = segmentIndexAt(off.timeline, t);
    if (idx !== off.segIndex) {
      off.segIndex = idx;
      const section = state.sections.listening;
      // 已經播過的題組標記為已播
      off.timeline.segments.slice(0, idx).forEach((seg) => {
        if (seg.kind !== 'group') return;
        const gi = groupIndexForQuestion(seg.firstQ);
        if (gi >= 0) state.listeningPlayed.add(section.groups[gi].id);
      });
      const seg = off.timeline.segments[idx];
      const gi = seg && seg.firstQ != null ? groupIndexForQuestion(seg.firstQ) : 0;
      if (!off.follow) {
        renderListening();
        renderAnswerCard();
        renderSectionTabs();
        if (seg) showToast('🔊 現在播放：' + seg.label);
        return;
      }
      if (gi >= 0 && gi !== state.listeningGroupIndex) {
        state.listeningGroupIndex = gi;
        renderListening();
        renderAnswerCard();
        const mainEl = $('#examMain');
        if (mainEl && mainEl.getBoundingClientRect().top < 0) mainEl.scrollIntoView({ block: 'start' });
      } else {
        renderListening();
      }
      renderSectionTabs();
      return;
    }
    updateOfficialTime();
  }

  function updateOfficialTime() {
    const off = state.official;
    if (!off) return;
    updateListeningProgress();
    const remainEl = $('#officialRemain');
    if (remainEl && off.audio) remainEl.textContent = '剩餘 ' + formatClock(Math.max(0, off.timeline.duration - (off.audio.currentTime || 0)) / getSpeed());
    const skipBtn = $('#skipGapBtn');
    if (skipBtn && off.audio) {
      const g = currentGap(off);
      const label = g ? '⏭ 跳過等待（' + Math.ceil((g[1] - off.audio.currentTime) / getSpeed()) + ' 秒）' : '⏭ 跳到下一段';
      if (skipBtn.textContent !== label) skipBtn.textContent = label;
      skipBtn.classList.toggle('is-hot', Boolean(g));
    }
  }

  function onOfficialEnded(token) {
    const off = state.official;
    if (!off || token !== state.speechToken) return;
    off.ended = true;
    off.needResume = false;
    state.currentAudio = null;
    releaseMediaSession();
    const section = state.sections.listening;
    if (section) section.groups.forEach((g) => state.listeningPlayed.add(g.id));
    state.listenProgress = 100;
    finishListening(true);
  }

  function onOfficialPause(token) {
    const off = state.official;
    if (!off || token !== state.speechToken || off.ended || !off.audio || off.audio.ended || off.userPaused || state.paused) return;
    // 正式考試不能暫停：被系統（來電、切換 App 等）暫停時立刻嘗試續播。
    setTimeout(() => {
      if (token !== state.speechToken || !off.audio || !off.audio.paused || off.audio.ended || off.userPaused || state.paused) return;
      const pr = off.audio.play();
      if (pr && pr.catch) pr.catch(() => onOfficialBlocked(token));
    }, 250);
  }

  function onOfficialBlocked(token) {
    const off = state.official;
    if (!off || token !== state.speechToken || off.ended || off.needResume) return;
    off.needResume = true;
    renderListening();
    showToast('播放被瀏覽器暫停了，請按「繼續播放」。', 'error');
  }

  function onOfficialError(token) {
    const off = state.official;
    if (!off || token !== state.speechToken || off.ended) return;
    if (!off.lastTime) {
      // 一開始就載入失敗：改用語音合成播報，至少能繼續考。
      showToast('聽力音檔載入失敗，改用語音合成播報。', 'error');
      releaseMediaSession();
      stopSpeech();
      state.official = null;
      state.listeningBusy = false;
      state.listeningStart = Date.now();
      startListeningClock();
      enterListeningGroup(0, { instant: true });
      return;
    }
    off.needResume = true;
    renderListening();
    showToast('網路中斷，音檔停止了，請按「繼續播放」。', 'error');
  }

  function resumeOfficialListening() {
    const off = state.official;
    if (!off || !off.audio || off.ended) return;
    const audio = off.audio;
    if (audio.error) {
      const t = off.lastTime;
      audio.src = off.timeline.src;
      audio.load();
      audio.addEventListener('loadedmetadata', () => { try { audio.currentTime = t; } catch (e) { /* ignore */ } }, { once: true });
    }
    const pr = audio.play();
    if (pr && pr.then) pr.then(() => { off.needResume = false; renderListening(); }).catch(() => {});
  }

  function renderOfficialListening(section, group, main) {
    const off = state.official;
    const seg = off.timeline.segments[off.segIndex] || null;
    const firstNum = group.questions[0] ? group.questions[0].num : '';
    const lastNum = group.questions[group.questions.length - 1] ? group.questions[group.questions.length - 1].num : '';
    const range = firstNum === lastNum ? '第 ' + firstNum + ' 題' : '第 ' + firstNum + '–' + lastNum + ' 題';
    const minutes = Math.round(off.timeline.duration / 60);
    const playing = off.started && !off.ended;
    const statusText = !off.started ? '尚未開始' : off.ended ? '已播畢' : off.needResume ? '已中斷' : '播放中';
    let nowLabel = '';
    if (off.started && !off.ended && seg) {
      nowLabel = '🔊 正在播放：' + seg.label;
    } else if (off.ended) {
      nowLabel = '全部播放完畢';
    }
    const remaining = off.audio ? Math.max(0, off.timeline.duration - (off.audio.currentTime || 0)) : off.timeline.duration;

    let controls = '';
    if (!off.started) {
      controls = '<button type="button" class="btn-listen" data-action="official-start">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>開始聽力測驗（約 ' + minutes + ' 分鐘）</button>';
    } else if (off.needResume) {
      controls = '<button type="button" class="btn-listen" data-action="official-resume">⚠️ 繼續播放</button>';
    }
    const playingGi = playingGroupIndex();
    const notFollowing = playing && playingGi >= 0 && playingGi !== state.listeningGroupIndex;
    if (playing && !off.needResume) {
      controls += '<button type="button" class="btn btn-primary btn-sm skip-gap-btn" id="skipGapBtn" data-action="official-skip">⏭ 跳到下一段</button>';
    }
    if (notFollowing) {
      controls += '<button type="button" class="btn btn-secondary btn-sm" data-action="official-follow">回到播放中的題目</button>';
    }
    if (!off.ended) controls += speedButtonHtml();

    const banner =
      '<div class="listening-banner' + (playing && !off.needResume ? ' playing' : '') + '">' +
        '<div class="listen-status-row">' +
          '<span class="listen-badge"><span class="dot"></span><span id="listenStatusText">' + statusText + '</span></span>' +
          '<span class="listen-group-meta">' + escapeHtml(shortPart(group.partTitle)) + ' · 正在看' + range + '</span>' +
        '</div>' +
        '<h3 class="listen-title">' + (off.started && !off.ended && seg ? escapeHtml(nowLabel) : '多益聽力 · 連續播放') + '</h3>' +
        '<p class="listen-sub">' + (off.started
          ? (off.ended ? '音檔已全部播完，可以檢查還沒作答的題目。' : notFollowing ? '你正在看其他題目，音檔照常播放中。' : '題目會跟著音檔自動切換；也可以隨時用上一題／下一題或下方總覽先看其他題。')
          : '全長約 ' + minutes + ' 分鐘：按下開始後直接從第 1 題連續播到第 ' + section.questions.length + ' 題（已省略各 Part 說明），不能暫停、倒轉或重播。音檔已包含預讀與作答時間；播放中可以隨時切換題目先看。') + '</p>' +
        '<div class="listen-controls">' + controls +
          (off.started ? '<div class="wave" aria-hidden="true">' + '<span></span>'.repeat(18) + '</div>' : '') +
        '</div>' +
        '<div class="audio-progress"><div class="audio-progress-fill" id="audioProgressFill" style="width:' + clamp(state.listenProgress || 0, 0, 100) + '%"></div></div>' +
        '<div class="official-time"><span>' + (off.started ? '第 ' + (off.segIndex + 1) + ' / ' + off.timeline.segments.length + ' 段' : '共 ' + off.timeline.segments.length + ' 段') + '</span><span id="officialRemain">剩餘 ' + formatClock(remaining) + '</span></div>' +
        '<div class="listen-note"><span>🎧</span><div><b>正式考試模擬：</b>只播一次、不能倒轉。練習時可用「⏭ 跳過等待」省掉作答空白、用「語速」加快到 1.2×，需要休息按上方「⏸ 暫停」。📱 iPhone 請先關閉靜音模式。</div></div>' +
      '</div>';

    const questionsHtml = group.questions.map((q) => renderQuestionCard(q, { compact: true })).join('');
    const isLast = state.listeningGroupIndex >= section.groups.length - 1;
    let footer = '';
    if (off.started) {
      footer =
        '<div class="q-footer" style="background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:14px 18px;">' +
          '<span class="q-footer-meta">' + (off.ended ? '音檔已全部播畢，可用下方總覽檢查還沒做的題目。' : '切換題目不影響播放；音檔會繼續往下播。') + '</span>' +
          '<div class="q-nav">' +
            '<button type="button" class="btn btn-secondary btn-sm" data-action="prev-group"' + (state.listeningGroupIndex === 0 ? ' disabled' : '') + '>上一題組</button>' +
            '<button type="button" class="btn btn-primary btn-sm" data-action="next-group"' + (isLast && !off.ended ? ' disabled' : '') + '>' + (isLast ? '完成聽力' : '下一題組') + '</button>' +
          '</div>' +
        '</div>';
    } else {
      footer = '<p class="pacing-note">開始前可以先看第一題組的題目。</p>';
    }

    let finishHtml = '';
    if (state.listeningFinished) {
      finishHtml =
        '<div class="listen-finish">' +
          '<h3>聽力測驗已完成</h3>' +
          '<p>本回聽力共 ' + section.questions.length + ' 題。你可以先透過答題卡檢查，或直接進入下一個階段。</p>' +
          '<div class="q-nav" style="justify-content:center;">' +
            '<button type="button" class="btn btn-secondary" data-action="open-listening-done">測驗結果選項</button>' +
            (state.sections.reading ? '<button type="button" class="btn btn-primary" data-action="start-reading">進入閱讀測驗</button>' : '<button type="button" class="btn btn-primary" data-action="confirm-submit">查看成績</button>') +
          '</div>' +
        '</div>';
    }

    const overview = '<section class="listen-overview" id="listenOverview" aria-label="聽力題目總覽">' + renderListeningOverview() + '</section>';
    main.innerHTML = '<div class="listening-stage">' + banner + questionsHtml + footer + overview + finishHtml + '</div>';
  }

  /* 檢討模式：重聽某一題組的官方原音 */
  function stopReplay() {
    if (state.replayBtn) {
      state.replayBtn.textContent = '▶ 重聽本段';
      state.replayBtn.classList.remove('is-playing');
      state.replayBtn = null;
    }
    state.replay = null;
    if (state.replayAudio) {
      try { state.replayAudio.pause(); } catch (e) { /* ignore */ }
    }
    if (state.currentAudio && state.currentAudio === state.replayAudio) state.currentAudio = null;
  }

  function getReplayAudio() {
    const timeline = officialAudioFor(state.testId);
    if (!timeline) return null;
    if (!state.replayAudio || state.replayAudio.dataset.src !== timeline.src) {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.setAttribute('playsinline', '');
      audio.dataset.replay = '1';
      audio.dataset.src = timeline.src;
      audio.src = timeline.src;
      audio.addEventListener('timeupdate', onReplayTime);
      audio.addEventListener('ended', () => stopReplay());
      audio.addEventListener('loadedmetadata', () => applySpeed(audio));
      try { audio.load(); } catch (e) { /* ignore */ }
      state.replayAudio = audio;
    }
    return state.replayAudio;
  }

  function onReplayTime() {
    const r = state.replay;
    const audio = state.replayAudio;
    if (!r || !audio || !state.replayBtn || audio.seeking) return;
    const t = audio.currentTime;
    if (t >= r.end - 0.05) { stopReplay(); return; }
    const gaps = r.timeline.gaps || [];
    for (let i = 0; i < gaps.length; i += 1) {
      const g = gaps[i];
      if (t >= g[0] + 0.15 && t < g[1] - 0.5) {
        if (g[1] >= r.end - 0.4) { stopReplay(); return; }
        try { audio.currentTime = g[1] - 0.3; } catch (e) { /* ignore */ }
        return;
      }
    }
  }

  function replaySegment(btn) {
    const wasThis = state.replayBtn === btn;
    stopReplay();
    if (wasThis) return;
    const timeline = officialAudioFor(state.testId);
    const audio = getReplayAudio();
    if (!timeline || !audio) return;
    stopSpeech();
    const start = Number(btn.getAttribute('data-start'));
    const end = Number(btn.getAttribute('data-end'));
    // 段落開頭若是空白（上一段的作答時間延伸），直接從語音開始
    const lead = (timeline.gaps || []).find((g) => g[0] <= start + 0.3 && g[1] > start);
    const from = lead ? Math.min(end, lead[1] - 0.3) : start;
    state.replay = { start, end, timeline };
    state.replayBtn = btn;
    state.currentAudio = audio;
    btn.textContent = '■ 停止';
    btn.classList.add('is-playing');
    applySpeed(audio);
    const seek = () => { try { audio.currentTime = from; } catch (e) { /* ignore */ } };
    if (audio.readyState >= 1) {
      seek();
    } else {
      audio.muted = true;
      audio.addEventListener('loadedmetadata', () => {
        seek();
        audio.addEventListener('seeked', () => { audio.muted = false; }, { once: true });
      }, { once: true });
    }
    const pr = audio.play();
    if (pr && pr.catch) pr.catch(() => { if (state.replayBtn === btn) stopReplay(); showToast('無法播放音檔，請檢查網路。', 'error'); });
  }

  function updateListeningProgress() {
    const fill = $('#audioProgressFill');
    if (fill) fill.style.width = clamp(state.listenProgress || 0, 0, 100) + '%';
    const status = $('#listenStatusText');
    if (status && state.listeningBusy) status.textContent = '播放中';
  }

  async function playListeningGroup() {
    const group = currentListeningGroup();
    if (!group) return;
    if (state.listeningBusy) return;
    if (state.listeningPlayed.has(group.id)) {
      showToast('本段音檔已播放過，依正式規則不可回放。');
      return;
    }
    if (state.submitted) return;
    clearPreReadTimer();
    state.preRead = null;
    clearAnswerWindowTimer();
    stopSpeech();
    const token = state.speechToken;
    state.listeningBusy = true;
    state.listeningPlayed.add(group.id);
    state.listenProgress = 0;
    renderListening();
    renderSectionTabs();

    const script = group.script.length
      ? group.script
      : [{ speaker: 'Narrator', text: group.questions.map((q) => q.stem).join(' ') }];

    let completed = false;
    if (group.preferAudio && group.audioFile) {
      completed = await playAudioFile(group.audioFile, token);
    }
    if (!completed && token === state.speechToken) {
      completed = await playScriptWithTTS(script, token);
    }
    if (token !== state.speechToken || state.submitted) return;

    state.listeningBusy = false;
    state.listenProgress = 100;
    renderListening();
    renderSectionTabs();
    if (!completed) {
      showToast('語音播放中斷，仍保留本次播放紀錄，不可重播。', 'error');
    }
    startAnswerWindow(group);
  }

  async function playScriptWithTTS(script, token) {
    const queue = [];
    script.forEach((line) => {
      const chunks = splitSpeechText(line.text, 165);
      chunks.forEach((chunk) => queue.push({ text: chunk, speaker: line.speaker, rate: line.rate || 1 }));
    });
    if (!queue.length) return false;

    if (!('speechSynthesis' in window)) {
      await simulatePlayback(queue, token);
      return token === state.speechToken;
    }

    for (let i = 0; i < queue.length; i += 1) {
      if (token !== state.speechToken) return false;
      await speakChunk(queue[i].text, queue[i].speaker, queue[i].rate);
      if (token !== state.speechToken) return false;
      state.listenProgress = Math.round((i + 1) / queue.length * 100);
      updateListeningProgress();
    }
    return true;
  }

  function simulatePlayback(queue, token) {
    return new Promise((resolve) => {
      const totalMs = clamp(queue.reduce((sum, item) => sum + item.text.split(/\s+/).length * 380, 0), 2600, 45000);
      const start = Date.now();
      const timer = setInterval(() => {
        if (token !== state.speechToken) {
          clearInterval(timer);
          resolve();
          return;
        }
        const pct = clamp((Date.now() - start) / totalMs * 100, 0, 100);
        state.listenProgress = Math.round(pct);
        updateListeningProgress();
        if (pct >= 100) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  }

  function playAudioFile(src, token) {
    return new Promise((resolve) => {
      if (!src) { resolve(false); return; }
      const audio = new Audio(src);
      state.currentAudio = audio;
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        state.currentAudio = null;
        resolve(ok);
      };
      audio.preload = 'auto';
      audio.onplay = () => {
        state.listeningBusy = true;
      };
      audio.ontimeupdate = () => {
        if (token !== state.speechToken) return;
        if (audio.duration && Number.isFinite(audio.duration)) {
          state.listenProgress = clamp(Math.round(audio.currentTime / audio.duration * 100), 0, 100);
          updateListeningProgress();
        }
      };
      audio.onended = () => finish(true);
      audio.onerror = () => finish(false);
      const timeout = setTimeout(() => finish(false), 180000);
      audio.onended = () => { clearTimeout(timeout); finish(true); };
      audio.play().catch(() => { clearTimeout(timeout); finish(false); });
    });
  }

  function startAnswerWindow(group) {
    clearAnswerWindowTimer();
    const defaultSec = LISTEN_ANSWER_WINDOW[group.partIndex] != null ? LISTEN_ANSWER_WINDOW[group.partIndex] : 20;
    const total = Math.max(5, Math.ceil(group.answerWindowSec || defaultSec));
    const deadline = Date.now() + total * 1000;
    state.answerWindow = { groupKey: group.id, remaining: total, total, deadline, endAt: deadline };
    renderListening();
    renderSectionTabs();
    const tick = () => {
      if (!state.answerWindow || state.answerWindow.groupKey !== group.id) {
        clearAnswerWindowTimer();
        return;
      }
      if (state.paused) return;
      const remaining = Math.max(0, Math.ceil((state.answerWindow.endAt - Date.now()) / 1000));
      state.answerWindow.remaining = remaining;
      const el = $('#answerWindowNum');
      if (el) el.textContent = String(remaining);
      if (remaining <= 0) {
        clearAnswerWindowTimer();
        nextListeningGroup(true);
      }
    };
    state.answerWindowTimer = setInterval(tick, 350);
  }

  function nextListeningGroup(auto) {
    if (state.listeningBusy && !state.official) { showToast('聽力播報中，請等本段結束。'); return; }
    clearPreReadTimer();
    clearAnswerWindowTimer();
    clearTimeout(state.autoAdvanceTimer);
    const section = state.sections.listening;
    if (!section) return;
    if (state.official && !state.official.ended && state.listeningGroupIndex + 1 >= section.groups.length) {
      showToast('這是最後一個題組；音檔播完後聽力會自動結束。');
      return;
    }
    if (state.listeningGroupIndex + 1 < section.groups.length) {
      enterListeningGroup(state.listeningGroupIndex + 1);
    } else {
      finishListening(auto);
    }
  }

  function prevListeningGroup() {
    if (state.listeningBusy && !state.official) { showToast('聽力播報中，請等本段結束。'); return; }
    clearPreReadTimer();
    clearAnswerWindowTimer();
    if (state.listeningGroupIndex > 0) enterListeningGroup(state.listeningGroupIndex - 1);
  }

  function finishListening(auto) {
    if (state.listeningFinished) {
      showListeningDoneModal();
      return;
    }
    clearPreReadTimer();
    clearAnswerWindowTimer();
    clearTimeout(state.autoAdvanceTimer);
    state.listeningBusy = false;
    state.listeningFinished = true;
    state.listeningElapsed = state.listeningStart ? (Date.now() - state.listeningStart) / 1000 : 0;
    if (state.mode === 'full' && state.sections.reading) state.readingUnlocked = true;
    if (state.readingStart) {
      // 閱讀已開始時，維持閱讀倒數；否則顯示聽力完成。
    } else {
      clearInterval(state.timerId);
      state.timerId = null;
      updateClockUI('聽力完成', formatClock(state.listeningElapsed), 'counting');
    }
    renderExamChrome();
    renderListening();
    renderSectionTabs();
    showListeningDoneModal();
    if (auto) showToast('聽力測驗結束。');
  }

  function showListeningDoneModal() {
    const modal = $('#listeningDoneModal');
    if (!modal) return;
    const text = $('#listeningDoneText');
    const readingBtn = modal.querySelector('[data-action="start-reading"]');
    const submitBtn = modal.querySelector('[data-action="submit-listening-only"]');
    if (state.mode === 'full' && state.sections.reading) {
      if (text) text.textContent = '聽力測驗已完成。接下來是 50 分鐘的閱讀測驗，倒數將在按下「進入閱讀測驗」後開始。你也可以先關閉視窗檢查聽力作答。';
      if (readingBtn) readingBtn.hidden = false;
      if (submitBtn) { submitBtn.hidden = false; submitBtn.textContent = '只交聽力'; }
    } else {
      if (text) text.textContent = '聽力測驗已完成。你可以查看逐題詳解與成績，或回到大廳選擇其他測驗。';
      if (readingBtn) readingBtn.hidden = true;
      if (submitBtn) { submitBtn.hidden = false; submitBtn.textContent = '查看成績'; }
    }
    openModal(modal);
  }

  /* ======================================================================
     閱讀測驗：左文右題、倒數、逐題停留
     ====================================================================== */
  function endDwell() {
    if (state.dwellKey && state.dwellStart) {
      const elapsed = Math.max(0, Date.now() - state.dwellStart);
      const keys = state.dwellKeys && state.dwellKeys.length ? state.dwellKeys : [state.dwellKey];
      keys.forEach((k) => { state.dwell[k] = (state.dwell[k] || 0) + elapsed / keys.length; });
    }
    state.dwellKey = null;
    state.dwellKeys = null;
    state.dwellStart = 0;
  }

  function beginDwell(q) {
    if (!q || state.paused) return;
    const key = q.group ? 'G:' + q.group.id : q.key;
    if (state.dwellKey === key) return;
    endDwell();
    state.dwellKey = key;
    state.dwellKeys = q.group ? q.group.questions.map((item) => item.key) : [q.key];
    state.dwellStart = Date.now();
  }

  function goToReading(index, options) {
    const section = state.sections.reading;
    if (!section) return;
    endDwell();
    state.readingQuestionIndex = clamp(index, 0, section.questions.length - 1);
    renderExamChrome();
    renderReading();
    if (!(options && options.silent)) {
      const panel = $('.question-panel');
      if (panel) panel.scrollTop = 0;
    }
  }

  function renderReading() {
    const section = state.sections.reading;
    const main = $('#examMain');
    if (!main) return;
    if (!section || !section.questions.length) {
      main.innerHTML = '<div class="review-empty"><strong>此回尚未提供閱讀題庫</strong>請在 data/testX_reading.js 匯入題目。</div>';
      return;
    }
    const q = currentReadingQuestion();
    if (!q) return;
    renderExamChrome();
    const group = q.group;
    const passage = group.passage;
    const sameGroup = state.passageGroupId === group.id;
    const oldScroll = sameGroup && $('.passage-scroll') ? $('.passage-scroll').scrollTop : 0;
    state.passageGroupId = group.id;
    // 手機直向：換到新的文章時先顯示文章，同一篇文章內換題則維持在題目。
    if (!sameGroup) state.readingPane = 'passage';
    if (!passage) state.readingPane = 'question';

    const first = group.questions[0] ? group.questions[0].num : q.num;
    const last = group.questions[group.questions.length - 1] ? group.questions[group.questions.length - 1].num : q.num;
    const groupRange = first === last ? 'Q' + first : 'Q' + first + '–' + last;
    let passageHtml = '';
    let paneSwitch = '';
    if (passage) {
      const range = groupRange;
      passageHtml =
        '<section class="passage-panel" aria-label="閱讀文章">' +
          '<div class="passage-panel-head"><h3>Reading Passage</h3><span class="passage-range">' + range + ' · ' + group.questions.length + ' 題</span></div>' +
          '<div class="passage-scroll">' + renderPassage(passage, group) +
            '<div class="passage-to-question"><button type="button" class="btn btn-primary btn-sm" data-action="reading-pane" data-pane="question">讀完了，看題目 →</button></div>' +
          '</div>' +
        '</section>';
      paneSwitch =
        '<div class="reading-pane-switch" role="tablist" aria-label="切換文章或題目">' +
          '<button type="button" role="tab" data-action="reading-pane" data-pane="passage" aria-selected="' + (state.readingPane === 'passage') + '">📄 文章 <small>' + range + '</small></button>' +
          '<button type="button" role="tab" data-action="reading-pane" data-pane="question" aria-selected="' + (state.readingPane === 'question') + '">✏️ 題目 <small>' + groupRange + '</small></button>' +
        '</div>';
    }

    const firstIndex = section.questions.indexOf(group.questions[0] || q);
    const lastIndex = section.questions.indexOf(group.questions[group.questions.length - 1] || q);
    const isLast = lastIndex >= section.questions.length - 1;
    const range = PACING_RANGES[q.partIndex] || PACING_RANGES[1];
    const footer =
      '<div class="q-footer">' +
        '<span class="q-footer-meta">' + escapeHtml(shortPart(q.partTitle)) + ' · ' + groupRange + '（' + group.questions.length + ' 題）· 建議配速 ' + range.label + '／題</span>' +
        '<div class="q-nav">' +
          '<button type="button" class="btn btn-secondary btn-sm" data-action="prev-question"' + (firstIndex <= 0 ? ' disabled' : '') + '>上一組</button>' +
          '<button type="button" class="btn btn-primary btn-sm" data-action="' + (isLast ? 'confirm-submit' : 'next-question') + '">' + (isLast ? '完成並交卷' : '下一組') + '</button>' +
        '</div>' +
      '</div>';

    // 同一題組共用的圖表只顯示一次（放在題目最上面）
    const figKey = (fig) => (fig ? (typeof fig === 'string' ? fig : JSON.stringify(fig)) : '');
    const shownFigs = new Set();
    const groupQuestions = group.questions.length ? group.questions : [q];
    const allMatching = groupQuestions.length > 1 && groupQuestions.every((item) => item.type === 'matching') && group.headings && group.headings.length;
    const cards = allMatching ? renderMatchingPanel(group) : groupQuestions.map((item) => {
      const k = figKey(item.figure);
      let figHtml = '';
      if (k && !shownFigs.has(k)) { shownFigs.add(k); figHtml = renderFigure(item.figure); }
      return figHtml + renderQuestionCard(item, { noFigure: true, focus: item.key === q.key && groupQuestions.length > 1 });
    }).join('');

    main.innerHTML =
      paneSwitch +
      '<div class="reading-layout' + (passage ? '' : ' single-column') + ' show-' + state.readingPane + '">' +
        passageHtml +
        '<div class="question-panel">' +
          (groupQuestions.length > 1 ? '<div class="group-head">本題組共 ' + groupQuestions.length + ' 題（' + groupRange + '），全部列在下方，可上下捲動作答。</div>' : '') +
          cards +
          footer +
        '</div>' +
      '</div>';

    if (sameGroup && oldScroll) {
      const scroll = $('.passage-scroll');
      if (scroll) scroll.scrollTop = oldScroll;
    }
    beginDwell(q);
    updatePaceDial();
    const panel = $('.question-panel');
    if (panel) {
      panel.scrollTop = 0;
      const idx = groupQuestions.indexOf(q);
      if (idx > 0) {
        const card = panel.querySelector('[data-card-key="' + q.key + '"]');
        if (card) {
          if (panel.scrollHeight > panel.clientHeight + 4) panel.scrollTop = Math.max(0, card.offsetTop - panel.offsetTop - 8);
          else if (state.readingPane === 'question' || !passage) card.scrollIntoView({ block: 'start' });
        }
      }
    }
  }

  function moveReadingGroup(step) {
    const section = state.sections.reading;
    const q = currentReadingQuestion();
    if (!section || !q) return;
    const group = q.group;
    const qs = group && group.questions.length ? group.questions : [q];
    const target = step > 0
      ? section.questions.indexOf(qs[qs.length - 1]) + 1
      : section.questions.indexOf(qs[0]) - 1;
    if (target < 0 || target >= section.questions.length) return;
    let index = target;
    if (step < 0) {
      const prev = section.questions[target];
      if (prev && prev.group && prev.group.questions.length) index = section.questions.indexOf(prev.group.questions[0]);
    }
    goToReading(index);
    const main = $('#examMain');
    if (main && main.getBoundingClientRect().top < 0) main.scrollIntoView({ block: 'start' });
  }

  function setReadingPane(pane, scroll) {
    const value = pane === 'question' ? 'question' : 'passage';
    state.readingPane = value;
    const layout = $('.reading-layout');
    if (layout) {
      layout.classList.toggle('show-passage', value === 'passage');
      layout.classList.toggle('show-question', value === 'question');
    }
    $$('.reading-pane-switch [data-pane]').forEach((btn) => {
      btn.setAttribute('aria-selected', String(btn.getAttribute('data-pane') === value));
    });
    if (scroll) {
      const sw = $('.reading-pane-switch');
      if (sw && sw.getBoundingClientRect().top < 0) sw.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }

  function fillBlanks(text, group, review, needles) {
    let html = review ? markHtml(text, needles) : escapeHtml(text).replace(/\n/g, '<br>');
    html = html.replace(/\{\{\s*(\d+)\s*\}\}/g, (match, num) => {
      const q = group.questions.find((item) => String(item.num) === String(num));
      if (!q) return '<span class="blank-marker">' + escapeHtml(num) + '</span>';
      const ans = state.answers[q.key] || [];
      return '<span class="blank-marker' + (ans.length ? ' filled' : '') + '" data-blank="' + q.num + '">' + q.num + (ans.length ? ' · ' + ans[0] : '') + '</span>';
    });
    return html;
  }

  function passageLangClass(text) {
    return /[\u3400-\u9fff]/.test(String(text || '')) ? '' : ' passage-en';
  }

  function renderPassage(passage, group, review, needles) {
    let html = '';
    if (passage.title) html += '<h2 class="passage-title">' + (review ? tokenizeEn(passage.title) : escapeHtml(passage.title)) + '</h2>';
    if (passage.subtitle) html += '<p class="passage-subtitle">' + (review ? tokenizeEn(passage.subtitle) : escapeHtml(passage.subtitle)) + '</p>';
    passage.blocks.forEach((block) => {
      if (block.figure) { html += renderFigure(block.figure); return; }
      if (block.type === 'figure' || block.type === 'image') {
        html += renderFigure({ type: block.type === 'image' ? 'image' : 'figure', src: block.src, alt: block.alt, caption: block.text, svg: block.svg });
        return;
      }
      if (block.type === 'h' || block.type === 'heading') {
        html += '<h3 class="passage-block passage-h">' + fillBlanks(block.text, group, review, needles) + '</h3>';
        return;
      }
      if (block.type === 'list' && block.items && block.items.length) {
        html += '<ul class="passage-block passage-list">' + block.items.map((item) => '<li>' + fillBlanks(item, group, review, needles) + '</li>').join('') + '</ul>';
        return;
      }
      const cls = block.type === 'quote' ? 'passage-block passage-quote' : 'passage-block' + passageLangClass(block.text);
      html += '<p class="' + cls + '">' + fillBlanks(block.text, group, review, needles) + '</p>';
    });
    return html;
  }

  /* ======================================================================
     題目卡片 / 作答
     ====================================================================== */
  function typeLabel(type) {
    if (type === 'multi') return '複選題';
    if (type === 'matching') return '段落主旨配對';
    return '單選題';
  }

  function renderQuestionCard(q, options) {
    const opts = options || {};
    const selected = state.answers[q.key] || [];
    const flagged = state.flags.has(q.key);
    const typeTag = typeLabel(q.type);
    const instruction = q.instruction || (q.type === 'multi'
      ? 'Choose ' + q.acceptCount + ' answers.'
      : q.type === 'matching'
        ? 'Choose one heading for the blank.'
        : 'Choose the best answer.');
    const isListening = q.sectionKey === 'listening';
    const cardClass = 'question-card exam-question' + (opts.compact ? ' compact' : '') + (opts.focus ? ' is-focus' : '');
    let html =
      '<article class="' + cardClass + '" data-card-key="' + escapeAttr(q.key) + '" id="qcard-' + escapeAttr(q.key.replace(/[^a-zA-Z0-9_-]/g, '-')) + '">' +
        '<div class="q-top">' +
          '<div class="q-top-left">' +
            '<span class="q-number-tag">第 ' + q.num + ' 題</span>' +
            '<span class="q-part-tag">' + escapeHtml(shortPart(q.partTitle)) + '</span>' +
            '<span class="q-type-tag">' + typeTag + '</span>' +
          '</div>' +
          '<button type="button" class="flag-btn' + (flagged ? ' flagged' : '') + '" data-action="flag-question" data-key="' + escapeAttr(q.key) + '" aria-pressed="' + String(flagged) + '">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3v18M5 4h11l-2 4 2 4H5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>' +
            (flagged ? '已標記' : '標記') +
          '</button>' +
        '</div>' +
        (opts.compact ? '' : '<span class="q-instruction">' + escapeHtml(instruction) + '</span>') +
        '<div class="q-stem' + passageLangClass(q.stem) + '">' + escapeHtml(q.stem).replace(/\n/g, '<br>') + '</div>' +
        (q.figure && !opts.noFigure ? renderFigure(q.figure) : '') +
        (q.type === 'matching' ? '' : renderOptions(q, selected)) +
        renderMatchingBox(q, selected) +
        (q.type === 'multi' ? '<div class="multi-hint' + (selected.length >= q.acceptCount ? ' is-full' : '') + '"><span>複選題：需選滿 ' + q.acceptCount + ' 個選項，全對才給分</span><span>已選 ' + selected.length + ' / ' + q.acceptCount + '</span></div>' : '') +
      '</article>';
    if (isListening) {
      html = html.replace('<div class="q-stem', '<div class="q-instruction">' + escapeHtml(q.instruction || '請依播放內容選出最適當的答案。') + '</div><div class="q-stem');
    }
    return html;
  }

  function renderOptions(q, selected) {
    if (!q.options.length) return '';
    return '<div class="options-list">' + q.options.map((opt) => {
      const isSelected = selected.indexOf(opt.letter) !== -1;
      return '<div class="option-item' + (isSelected ? ' selected' : '') + '" role="button" tabindex="0" data-action="select-option" data-key="' + escapeAttr(q.key) + '" data-letter="' + opt.letter + '" aria-pressed="' + String(isSelected) + '">' +
        '<span class="option-prefix">' + opt.letter + '</span>' +
        (q.audioOnly
          ? '<span class="option-text audio-only">（選項只在音檔中播出）</span>'
          : '<span class="option-text' + passageLangClass(opt.text) + '">' + escapeHtml(opt.text) + '</span>') +
      '</div>';
    }).join('') + '</div>';
  }

  function renderMatchingPanel(group) {
    const qs = group.questions;
    const used = {};
    qs.forEach((q) => { const a = (state.answers[q.key] || [])[0]; if (a) used[a] = q.num; });
    const done = qs.filter((q) => (state.answers[q.key] || []).length).length;
    const legend = group.headings.map((h) => (
      '<div class="mp-heading' + (used[h.key] ? ' used' : '') + '">' +
        '<span class="heading-key">' + h.key + '</span>' +
        '<span class="heading-text">' + escapeHtml(h.text) + '</span>' +
        '<span class="mp-used">' + (used[h.key] ? '→ 第 ' + used[h.key] + ' 段' : '未使用') + '</span>' +
      '</div>'
    )).join('');
    const rows = qs.map((q) => {
      const a = (state.answers[q.key] || [])[0] || '';
      const flagged = state.flags.has(q.key);
      return '<div class="mp-row' + (a ? ' answered' : '') + '" data-card-key="' + escapeAttr(q.key) + '">' +
        '<button type="button" class="mp-para" data-action="match-goto" data-num="' + q.num + '" title="到文章看第 ' + q.num + ' 段">第 ' + q.num + ' 段<small>看段落 ›</small></button>' +
        '<div class="mp-choices" role="group" aria-label="第 ' + q.num + ' 段的標題">' + group.headings.map((h) => {
          const mine = a === h.key;
          const taken = used[h.key] && !mine;
          return '<button type="button" class="mp-choice' + (mine ? ' selected' : '') + (taken ? ' taken' : '') + '" data-action="match-pick" data-key="' + escapeAttr(q.key) + '" data-letter="' + h.key + '" aria-pressed="' + mine + '" title="' + (taken ? h.key + ' 已用在第 ' + used[h.key] + ' 段，點了會移過來' : h.key) + '">' + h.key + '</button>';
        }).join('') + '</div>' +
        '<button type="button" class="mp-flag' + (flagged ? ' flagged' : '') + '" data-action="flag-question" data-key="' + escapeAttr(q.key) + '" aria-pressed="' + flagged + '" title="標記">⚑</button>' +
      '</div>';
    }).join('');
    return '<section class="match-panel" id="matchPanel">' +
      '<div class="mp-head"><strong>段落標題配對</strong><span>' + done + ' / ' + qs.length + ' 段已作答 · 6 個標題選 5 個，每個只能用一次</span></div>' +
      '<div class="mp-legend">' + legend + '</div>' +
      '<div class="mp-grid">' + rows + '</div>' +
      '<p class="mp-tip">點「第 N 段」會切到文章並標出該段；已被別段用掉的標題會變灰，點了會自動移過來。</p>' +
    '</section>';
  }

  function matchPick(key, letter) {
    const q = getQuestion(key);
    if (!q || state.submitted) return;
    const current = (state.answers[key] || [])[0];
    if (current === letter) {
      state.answers[key] = [];
    } else {
      q.group.questions.forEach((other) => {
        if (other.key !== key && (state.answers[other.key] || [])[0] === letter) {
          state.answers[other.key] = [];
          updateQuestionSelectionUI(other);
          showToast(letter + ' 已從第 ' + other.num + ' 段移到第 ' + q.num + ' 段。');
        }
      });
      state.answers[key] = [letter];
    }
    updateQuestionSelectionUI(q);
    const panel = $('#matchPanel');
    if (panel) panel.outerHTML = renderMatchingPanel(q.group);
    refreshAnswerCardState();
    updateProgress();
  }

  function matchGotoParagraph(num) {
    setReadingPane('passage', true);
    const marker = document.querySelector('.passage-scroll [data-blank="' + num + '"]');
    if (!marker) return;
    const scroller = $('.passage-scroll');
    const block = marker.closest('.passage-block') || marker;
    if (scroller && scroller.scrollHeight > scroller.clientHeight + 4) {
      scroller.scrollTop = Math.max(0, block.offsetTop - scroller.offsetTop - 10);
    } else {
      block.scrollIntoView({ block: 'start' });
    }
    block.classList.add('para-flash');
    setTimeout(() => block.classList.remove('para-flash'), 1800);
  }

  function renderMatchingBox(q, selected) {
    if (q.type !== 'matching' || !q.group.headings.length) return '';
    const answer = selected[0] || '';
    return '<div class="matching-box">' +
      '<div class="matching-label">Headings A–' + q.group.headings[q.group.headings.length - 1].key + '</div>' +
      '<div class="headings-list">' + q.group.headings.map((h) => (
        '<div class="heading-option' + (answer === h.key ? ' selected' : '') + '" role="button" tabindex="0" data-action="select-matching" data-key="' + escapeAttr(q.key) + '" data-letter="' + h.key + '" aria-pressed="' + String(answer === h.key) + '">' +
          '<span class="heading-key">' + h.key + '</span><span class="heading-text">' + escapeHtml(h.text) + '</span>' +
        '</div>'
      )).join('') + '</div>' +
      '<div class="matching-select-wrap">' +
        '<label for="match-' + escapeAttr(q.key.replace(/[^a-zA-Z0-9_-]/g, '-')) + '">本題答案</label>' +
        '<select class="select-answer" id="match-' + escapeAttr(q.key.replace(/[^a-zA-Z0-9_-]/g, '-')) + '" data-matching-key="' + escapeAttr(q.key) + '">' +
          '<option value="">— 請選擇 —</option>' +
          q.group.headings.map((h) => '<option value="' + h.key + '"' + (answer === h.key ? ' selected' : '') + '>' + h.key + '. ' + escapeHtml(h.text) + '</option>').join('') +
        '</select>' +
      '</div>' +
    '</div>';
  }

  function updateQuestionSelectionUI(q) {
    if (!q) return;
    const card = document.querySelector('[data-card-key="' + q.key + '"]');
    const selected = state.answers[q.key] || [];
    if (card) {
      $$('.option-item', card).forEach((el) => {
        const isSelected = selected.indexOf(el.getAttribute('data-letter')) !== -1;
        el.classList.toggle('selected', isSelected);
        el.setAttribute('aria-pressed', String(isSelected));
      });
      $$('.heading-option', card).forEach((el) => {
        const isSelected = selected.indexOf(el.getAttribute('data-letter')) !== -1;
        el.classList.toggle('selected', isSelected);
        el.setAttribute('aria-pressed', String(isSelected));
      });
      const select = $('.select-answer', card);
      if (select) select.value = selected[0] || '';
      const hint = $('.multi-hint', card);
      if (hint) {
        hint.classList.toggle('is-full', selected.length >= q.acceptCount);
        const count = $('span:last-child', hint);
        if (count) count.textContent = '已選 ' + selected.length + ' / ' + q.acceptCount;
      }
    }
    if (q.type === 'matching') {
      $$('[data-blank="' + q.num + '"]').forEach((el) => {
        el.classList.toggle('filled', selected.length > 0);
        el.textContent = q.num + (selected.length ? ' · ' + selected[0] : '');
      });
    }
  }

  function selectOption(key, letter) {
    const q = getQuestion(key);
    if (!q || state.submitted) return;
    let selected = (state.answers[key] || []).slice();
    if (q.type === 'multi') {
      if (selected.indexOf(letter) !== -1) {
        selected = selected.filter((item) => item !== letter);
      } else {
        selected.push(letter);
        if (selected.length > q.acceptCount) {
          selected = selected.slice(selected.length - q.acceptCount);
          showToast('複選題最多選 ' + q.acceptCount + ' 個，已自動替換先前的選項。');
        }
      }
    } else {
      selected = [letter];
    }
    state.answers[key] = selected;
    updateQuestionSelectionUI(q);
    refreshAnswerCardState();
    if (q.sectionKey === 'reading') updateProgress();
  }

  function selectMatching(key, letter) {
    const q = getQuestion(key);
    if (!q || state.submitted) return;
    state.answers[key] = letter ? [String(letter).toUpperCase()] : [];
    updateQuestionSelectionUI(q);
    refreshAnswerCardState();
    if (q.sectionKey === 'reading') updateProgress();
  }

  function toggleFlag(key) {
    if (state.flags.has(key)) state.flags.delete(key);
    else state.flags.add(key);
    $$('.mp-flag[data-key="' + key + '"]').forEach((b) => { b.classList.toggle('flagged', state.flags.has(key)); b.setAttribute('aria-pressed', String(state.flags.has(key))); });
    const btn = document.querySelector('.flag-btn[data-key="' + key + '"]');
    if (btn) {
      const flagged = state.flags.has(key);
      btn.classList.toggle('flagged', flagged);
      btn.setAttribute('aria-pressed', String(flagged));
      btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3v18M5 4h11l-2 4 2 4H5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>' + (flagged ? '已標記' : '標記');
    }
    refreshAnswerCardState();
  }

  function jumpToQuestion(key) {
    const q = getQuestion(key);
    if (!q) return;
    if (state.listeningBusy && !state.official) { showToast('聽力播報中，請等本段結束。'); return; }
    if (q.sectionKey === 'listening') {
      clearPreReadTimer();
      clearAnswerWindowTimer();
      state.activeSection = 'listening';
      enterListeningGroup(q.group ? state.sections.listening.groups.indexOf(q.group) : 0);
    } else {
      if (state.mode === 'full' && !state.readingUnlocked) {
        showToast('請先完成聽力測驗。');
        return;
      }
      state.activeSection = 'reading';
      const index = state.sections.reading.questions.indexOf(q);
      goToReading(index);
    }
  }

  /* ======================================================================
     交卷與閱卷
     ====================================================================== */
  function openSubmitModal() {
    if (state.submitted || !state.testId) return;
    const preview = computeResult();
    const remaining = state.readingDeadline ? Math.max(0, Math.ceil((state.readingDeadline - Date.now()) / 1000)) : null;
    const unanswered = preview.total - preview.answered;
    const summary = $('#submitSummary');
    if (summary) {
      summary.innerHTML =
        '<div class="sum-item"><span>已作答</span><strong>' + preview.answered + ' / ' + preview.total + '</strong></div>' +
        '<div class="sum-item' + (unanswered ? ' alert' : '') + '"><span>未作答</span><strong>' + unanswered + '</strong></div>' +
        '<div class="sum-item"><span>聽力</span><strong>' + preview.sections.listening.answered + ' / ' + preview.sections.listening.total + '</strong></div>' +
        '<div class="sum-item"><span>閱讀</span><strong>' + preview.sections.reading.answered + ' / ' + preview.sections.reading.total + '</strong></div>' +
        (remaining != null ? '<div class="sum-item"><span>閱讀剩餘</span><strong>' + formatClock(remaining) + '</strong></div>' : '');
    }
    openModal($('#submitModal'));
  }

  // 依答對率換算多益估計分數（5–495／科）。題目是原創半量版，只能當作趨勢參考。
  const SCALE = {
    listening: [[0, 5], [0.25, 95], [0.5, 245], [0.7, 345], [0.85, 420], [0.95, 475], [1, 495]],
    reading: [[0, 5], [0.25, 70], [0.5, 205], [0.7, 315], [0.85, 400], [0.95, 460], [1, 495]]
  };
  function toeicScale(sectionKey, correct, total) {
    if (!total) return null;
    const pts = SCALE[sectionKey] || SCALE.reading;
    const r = correct / total;
    for (let i = 1; i < pts.length; i += 1) {
      if (r <= pts[i][0]) {
        const a = pts[i - 1], b = pts[i];
        const v = a[1] + (b[1] - a[1]) * (r - a[0]) / (b[0] - a[0]);
        return Math.max(5, Math.min(495, Math.round(v / 5) * 5));
      }
    }
    return 495;
  }

  function computeResult() {
    const output = {
      sections: {},
      total: 0,
      correct: 0,
      answered: 0,
      percent: 0,
      elapsedSec: state.startedAt ? (Date.now() - state.startedAt) / 1000 : 0,
      readingSpentSec: 0,
      readingRemaining: state.readingRemaining != null ? state.readingRemaining : null,
      listeningElapsed: state.listeningElapsed || 0,
      playedGroups: state.listeningPlayed.size
    };

    ['listening', 'reading'].forEach((sectionKey) => {
      const included = state.mode === 'full' || state.mode === sectionKey;
      const section = state.sections[sectionKey];
      if (!included || !section) {
        output.sections[sectionKey] = { available: false, total: 0, correct: 0, answered: 0, items: [] };
        return;
      }
      const items = section.questions.map((q) => {
        const user = (state.answers[q.key] || []).slice().sort();
        const correct = q.answer.slice().sort();
        const answered = user.length > 0;
        const isCorrect = answered && correct.length > 0 && sameSet(user, correct);
        return { q, user, correct, answered, isCorrect, key: q.key };
      });
      const correctCount = items.filter((item) => item.isCorrect).length;
      const answeredCount = items.filter((item) => item.answered).length;
      output.sections[sectionKey] = {
        available: true,
        total: items.length,
        correct: correctCount,
        answered: answeredCount,
        items
      };
      output.total += items.length;
      output.correct += correctCount;
      output.answered += answeredCount;
      if (sectionKey === 'reading') {
        output.readingSpentSec = section.questions.reduce((sum, q) => sum + (state.dwell[q.key] || 0), 0) / 1000;
      }
    });

    output.percent = output.total ? Math.round(output.correct / output.total * 100) : 0;
    const L = output.sections.listening;
    const R = output.sections.reading;
    output.estListening = L.available ? toeicScale('listening', L.correct, L.total) : null;
    output.estReading = R.available ? toeicScale('reading', R.correct, R.total) : null;
    output.estTotal = L.available && R.available ? output.estListening + output.estReading : null;
    return output;
  }

  function submitExam(auto) {
    if (state.submitted || !state.testId) return;
    endDwell();
    state.submitted = true;
    state.listeningBusy = false;
    clearAllTimers();
    stopSpeech();
    closeAllModals();
    closeDictionary();
    state.result = computeResult();
    try {
      const meta = getTest(state.testId);
      const r = state.result;
      document.dispatchEvent(new CustomEvent('exam:submitted', { detail: {
        testId: state.testId, testLabel: meta ? meta.label : String(state.testId), mode: state.mode, auto: Boolean(auto),
        durationSec: Math.round(r.elapsedSec),
        listening: r.sections.listening.available ? { correct: r.sections.listening.correct, total: r.sections.listening.total, score: r.estListening } : null,
        reading: r.sections.reading.available ? { correct: r.sections.reading.correct, total: r.sections.reading.total, score: r.estReading } : null,
        total: r.estTotal
      } }));
    } catch (e) { /* 紀錄失敗不影響閱卷 */ }
    switchView('review');
    renderReview();
    updateHeaderVolumeButton();
    showToast(auto ? '時間到，已自動交卷並完成閱卷。' : '已交卷，閱卷完成。點擊英文單字可查詢。');
  }

  function modeLabel(mode) {
    if (mode === 'full') return '完整測驗';
    if (mode === 'listening') return '只考聽力';
    return '只考閱讀';
  }

  /* ======================================================================
     配速分析
     ====================================================================== */
  function pacingRange(q) {
    return PACING_RANGES[q.partIndex] || PACING_RANGES[1];
  }

  function pacingRows() {
    const section = state.sections.reading;
    if (!section) return [];
    return section.questions.map((q) => {
      const ms = state.dwell[q.key];
      const hasTiming = typeof ms === 'number' && ms > 0;
      const seconds = hasTiming ? ms / 1000 : null;
      const range = pacingRange(q);
      let status = 'na';
      if (hasTiming) {
        if (seconds > range.max) status = 'over';
        else if (seconds < range.min) status = 'fast';
        else status = 'ok';
      }
      return { q, seconds, hasTiming, range, status };
    });
  }

  function statusLabel(status) {
    if (status === 'over') return '超時';
    if (status === 'fast') return '過快';
    if (status === 'ok') return '適中';
    return '未記錄';
  }

  function renderPacingSummary() {
    const host = $('#pacingSummary');
    if (!host) return;
    const section = state.sections.reading;
    if (!section) {
      host.innerHTML = '<div class="pacing-summary"><div class="pacing-card"><span>配速分析</span><strong>—</strong><small>本次測驗未包含閱讀分區</small></div></div>';
      return;
    }
    const rows = pacingRows();
    const recorded = rows.filter((row) => row.hasTiming);
    const totalSec = recorded.reduce((sum, row) => sum + row.seconds, 0);
    const avg = recorded.length ? totalSec / recorded.length : 0;
    const overCount = rows.filter((row) => row.status === 'over').length;
    const okCount = rows.filter((row) => row.status === 'ok').length;
    const fastCount = rows.filter((row) => row.status === 'fast').length;
    host.innerHTML =
      '<div class="pacing-summary">' +
        '<div class="pacing-cards">' +
          '<div class="pacing-card"><span>閱讀總耗時</span><strong>' + formatDuration(totalSec) + '</strong><small>已記錄 ' + recorded.length + ' / ' + rows.length + ' 題</small></div>' +
          '<div class="pacing-card"><span>平均每題</span><strong>' + (recorded.length ? avg.toFixed(1) : '—') + '</strong><small>秒／題</small></div>' +
          '<div class="pacing-card ok"><span>配速適中</span><strong>' + okCount + '</strong><small>題落在建議區間</small></div>' +
          '<div class="pacing-card over"><span>超時題數</span><strong>' + overCount + '</strong><small>另有 ' + fastCount + ' 題過快</small></div>' +
        '</div>' +
        '<p class="pacing-note">建議配速：Part 5 20–30 秒／題、Part 6 30–45 秒／題、Part 7 45–70 秒／題。實際秒數為每題停留作答時間，切換題目時累計。</p>' +
      '</div>';
  }

  function renderPacingTable() {
    const rows = pacingRows();
    if (!rows.length) return '<div class="review-empty"><strong>本次沒有閱讀配速資料</strong>選擇含閱讀的測驗模式後，系統會記錄每題停留秒數。</div>';
    const body = rows.map((row) => (
      '<tr>' +
        '<td><a href="#" class="table-link" data-action="jump-review" data-key="' + escapeAttr(row.q.key) + '">第 ' + row.q.num + ' 題</a></td>' +
        '<td>' + escapeHtml(row.q.partTitle) + '</td>' +
        '<td>' + typeLabel(row.q.type) + '</td>' +
        '<td class="num">' + (row.hasTiming ? Math.round(row.seconds) + ' 秒' : '—') + '</td>' +
        '<td class="num">' + row.range.label + '</td>' +
        '<td><span class="pacing-badge ' + row.status + '">' + statusLabel(row.status) + '</span></td>' +
        '<td class="desc">' + escapeHtml(row.q.stem.slice(0, 58)) + (row.q.stem.length > 58 ? '…' : '') + '</td>' +
      '</tr>'
    )).join('');
    return '<div class="pacing-table-wrap"><table class="pacing-table">' +
      '<thead><tr><th>題號</th><th>分區</th><th>題型</th><th>實際耗時</th><th>建議配速</th><th>判定</th><th>題目摘要</th></tr></thead>' +
      '<tbody>' + body + '</tbody></table></div>';
  }

  /* ======================================================================
     檢討模式
     ====================================================================== */
  function verdictFor(percent) {
    if (percent >= 85) return '神乎其技，考場見。';
    if (percent >= 70) return '穩健發揮，再練配速。';
    if (percent >= 55) return '基礎有了，弱點要補。';
    if (percent > 0) return '別灰心，逐題檢討最快進步。';
    return '先從一題一題看懂開始。';
  }

  function renderReview() {
    const result = state.result;
    if (!result) return;
    const hero = $('#scoreHero');
    const meta = getTest(state.testId);
    if (hero) {
      const circumference = 2 * Math.PI * 72;
      const offset = circumference * (1 - result.percent / 100);
      const listening = result.sections.listening;
      const reading = result.sections.reading;
      const goal = window.TOEIC_RECORDS ? window.TOEIC_RECORDS.goal() : 0;
      const scoreCard = (label, sec, est) => {
        if (!sec.available) return '<div class="score-card na"><span>' + label + '</span><strong>—</strong><em>這次沒有考</em></div>';
        return '<div class="score-card info"><span>' + label + '（估計）</span>' +
          '<strong>' + est + '<small> / 495</small></strong>' +
          '<small>答對 ' + sec.correct + ' / ' + sec.total + ' 題（' + Math.round(sec.correct / sec.total * 100) + '%）</small></div>';
      };
      const totalCard = result.estTotal != null
        ? '<div class="score-card total ' + (goal && result.estTotal >= goal ? 'pass' : 'info') + '"><span>🏁 估計總分</span><strong>' + result.estTotal + '<small> / 990</small></strong>' +
          (goal ? '<em>' + (result.estTotal >= goal ? '✅ 達到目標 ' + goal : '距離目標 ' + goal + ' 還差 ' + (goal - result.estTotal) + ' 分') + '</em>' : '') + '</div>'
        : '';
      hero.innerHTML =
        '<div class="score-hero">' +
          '<div class="score-cards">' + totalCard + scoreCard('🎧 聽力', listening, result.estListening) + scoreCard('📖 閱讀', reading, result.estReading) + '</div>' +
          '<div class="score-ring-wrap" hidden>' +
            '<div class="score-ring">' +
              '<svg viewBox="0 0 170 170" aria-hidden="true">' +
                '<defs><linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--primary)"/><stop offset="100%" stop-color="var(--accent)"/></linearGradient></defs>' +
                '<circle class="ring-bg" cx="85" cy="85" r="72"/>' +
                '<circle class="ring-value" cx="85" cy="85" r="72" stroke-dasharray="' + circumference.toFixed(1) + '" stroke-dashoffset="' + offset.toFixed(1) + '"/>' +
              '</svg>' +
              '<div class="score-ring-center"><strong>' + result.percent + '</strong><span>答對率 %</span></div>' +
            '</div>' +
            '<div class="score-verdict">' + escapeHtml(verdictFor(result.percent)) + '</div>' +
          '</div>' +
          '<div class="score-copy">' +
            '<span class="eyebrow">' + (meta ? 'TOEIC ' + meta.label : '模擬試題') + ' · ' + modeLabel(state.mode) + '</span>' +
            '<h2>閱卷完成：' + [listening.available ? '聽力 ' + result.estListening : '', reading.available ? '閱讀 ' + result.estReading : '', result.estTotal != null ? '總分 ' + result.estTotal : ''].filter(Boolean).join('、') + '</h2>' +
            '<p>檢討模式已開啟：題目、選項、文章與聽力逐字稿中的英文單字都可以點擊查詢。建議先看答錯題的詳解，再對照配速分析。</p>' +
            '<div class="score-breakdown">' +
              '<div class="score-stat ' + (result.percent >= 60 ? 'good' : 'bad') + '"><span>總答對</span><strong>' + result.correct + '<small>/ ' + result.total + '</small></strong></div>' +
              '<div class="score-stat"><span>聽力</span><strong>' + (listening.available ? listening.correct + '<small>/ ' + listening.total + '</small>' : '—') + '</strong></div>' +
              '<div class="score-stat"><span>閱讀</span><strong>' + (reading.available ? reading.correct + '<small>/ ' + reading.total + '</small>' : '—') + '</strong></div>' +
              '<div class="score-stat' + (result.total - result.answered > 0 ? ' bad' : '') + '"><span>未作答</span><strong>' + (result.total - result.answered) + '<small>題</small></strong></div>' +
            '</div>' +
            '<div class="score-meta-row">' +
              '<span class="pill">用時 ' + formatDuration(result.elapsedSec) + '</span>' +
              '<span class="pill">聽力播畢 ' + result.playedGroups + ' 段</span>' +
              (result.readingRemaining != null && reading.available ? '<span class="pill">閱讀剩餘 ' + formatClock(result.readingRemaining) + '</span>' : '') +
              '<span class="pill">' + new Date().toLocaleDateString('zh-TW') + '</span>' +
            '</div>' +
          '</div>' +
        '</div>';
    }
    renderPacingSummary();
    renderReviewFilter(state.reviewFilter || 'all');
    updateReviewTabs();
    if (state.result && state.result.sections.listening && state.result.sections.listening.available) getReplayAudio();
  }

  function updateReviewTabs() {
    $$('.review-tab', $('#reviewTabs')).forEach((tab) => {
      const active = tab.getAttribute('data-filter') === state.reviewFilter;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
  }

  function reviewQuestionsFor(filter) {
    if (!state.result) return [];
    const all = [];
    ['listening', 'reading'].forEach((sectionKey) => {
      const section = state.result.sections[sectionKey];
      if (!section || !section.available) return;
      all.push.apply(all, section.items);
    });
    if (filter === 'listening') return all.filter((item) => item.q.sectionKey === 'listening');
    if (filter === 'reading') return all.filter((item) => item.q.sectionKey === 'reading');
    if (filter === 'wrong') return all.filter((item) => !item.isCorrect);
    return all;
  }

  /* ---------- 檢討註解（data/notes_*.js） ---------- */
  function noteFor(q) {
    const all = window.BESTEP_NOTES || {};
    const set = all[String(state.testId) + (q.sectionKey === 'listening' ? 'L' : 'R')];
    return (set && set[q.num]) || {};
  }

  function groupNeedles(group) {
    const list = [];
    group.questions.forEach((q) => {
      (noteFor(q).ev || []).forEach((str) => list.push({ str, cls: 'ev', qs: [q.num], key: q.key }));
    });
    return list;
  }

  function markHtml(text, needles, render) {
    const source = String(text == null ? '' : text);
    const fmt = render || tokenizeEn;
    if (!needles || !needles.length) return fmt(source);
    const lower = source.toLowerCase();
    const ranges = [];
    needles.forEach((n) => {
      if (!n.str) return;
      const idx = n.ci ? lower.indexOf(n.str.toLowerCase()) : source.indexOf(n.str);
      if (idx === -1) return;
      ranges.push({ start: idx, end: idx + n.str.length, cls: n.cls, qs: (n.qs || []).slice(), key: n.key });
    });
    if (!ranges.length) return fmt(source);
    ranges.sort((a, b) => a.start - b.start || b.end - a.end);
    const merged = [];
    ranges.forEach((r) => {
      const last = merged[merged.length - 1];
      if (last && r.start < last.end) {
        last.end = Math.max(last.end, r.end);
        last.qs = last.qs.concat(r.qs);
        return;
      }
      merged.push(r);
    });
    let html = '';
    let pos = 0;
    merged.forEach((r) => {
      html += fmt(source.slice(pos, r.start));
      const inner = fmt(source.slice(r.start, r.end));
      if (r.cls === 'ev') {
        const qs = unique(r.qs).sort((a, b) => a - b);
        html += '<mark class="ev-mark" data-qs="' + qs.join(',') + '">' + inner + '</mark>' +
          '<button type="button" class="ev-tag" data-action="review-goto-q" data-key="' + escapeAttr(r.key) + '" title="跳到第 ' + qs.join('、') + ' 題">第' + qs.join('・') + '題</button>';
      } else {
        html += '<mark class="kw-mark">' + inner + '</mark>';
      }
      pos = r.end;
    });
    return html + fmt(source.slice(pos));
  }

  function replayRowHtml(group) {
    const timeline = officialAudioFor(state.testId);
    const firstNum = group.questions[0] ? group.questions[0].num : 0;
    const seg = timeline ? timeline.segments.find((sg) => sg.kind === 'group' && Number(sg.firstQ) === Number(firstNum)) : null;
    if (!seg) return '';
    return '<div class="replay-row">' +
      '<button type="button" class="btn btn-primary btn-sm replay-btn" data-action="replay-segment" data-start="' + seg.start + '" data-end="' + seg.end + '">▶ 重聽本段</button>' +
      speedButtonHtml() +
      '<span>自動跳過預讀與作答空白，按下立即播放</span>' +
    '</div>';
  }

  const reviewZh = {};

  function vocabFor(group) {
    const q = group.questions[0];
    if (!q) return [];
    const all = window.BESTEP_VOCAB || {};
    const set = all[String(state.testId) + (q.sectionKey === 'listening' ? 'L' : 'R')];
    return (set && set[q.num]) || [];
  }

  function groupPlainText(group) {
    const parts = [];
    if (group.passage) {
      if (group.passage.title) parts.push(group.passage.title);
      (group.passage.blocks || []).forEach((b) => { if (b.text) parts.push(b.text); if (b.items) parts.push.apply(parts, b.items); });
    }
    (group.script || []).forEach((line) => parts.push(line.text));
    (group.headings || []).forEach((h) => parts.push(h.text));
    group.questions.forEach((q) => { parts.push(q.stem); q.options.forEach((o) => parts.push(o.text)); });
    return parts.join('\n').replace(/\{\{\s*\d+\s*\}\}/g, '');
  }

  function vocabSentence(text, entry) {
    const candidates = [entry[3], entry[0].replace(/[…?!.]+/g, ' ').replace(/\s+/g, ' ').trim()].filter(Boolean);
    const sentences = text.split('\n').reduce((acc, para) => acc.concat(para.match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || [para]), []);
    for (let i = 0; i < candidates.length; i += 1) {
      const c = candidates[i];
      const words = c.split(' ').filter((w) => w && w !== '…' && !/^(one's|sb|sth)$/.test(w));
      const probe = words.length > 1 ? words.slice(0, Math.min(2, words.length)).join(' ') : words[0];
      if (!probe) continue;
      const stem = probe.length > 5 ? probe.slice(0, probe.length - 2) : probe;
      const re = new RegExp('\\b' + stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      const hit = sentences.find((sen) => re.test(sen));
      if (hit) {
        const full = new RegExp('\\b(' + stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "[\\w'’-]*(?:\\s[\\w'’-]+){0," + Math.max(0, words.length - 1) + '})', 'i');
        return escapeHtml(hit.trim()).replace(full, '<b>$1</b>');
      }
    }
    return '';
  }

  function renderVocabPanel(group) {
    const list = vocabFor(group);
    if (!list.length) return '';
    const text = groupPlainText(group);
    const rows = list.map((entry) => {
      const sentence = vocabSentence(text, entry);
      return '<li class="vocab-item">' +
        '<button type="button" class="vocab-word" data-action="speak-word" data-word="' + escapeAttr(entry[0].replace(/…/g, '')) + '" title="點一下發音">🔊 ' + escapeHtml(entry[0]) + '</button>' +
        '<span class="vocab-pos">' + escapeHtml(entry[1] || '') + '</span>' +
        '<span class="vocab-zh" data-action="vocab-peek">' + escapeHtml(entry[2] || '') + '</span>' +
        (sentence ? '<div class="vocab-sent">' + sentence + '</div>' : '') +
      '</li>';
    }).join('');
    return '<details class="vocab-panel" id="vocab-' + groupDomId(group) + '">' +
      '<summary><span>📚 單字快學</span><small>' + list.length + ' 個本組值得背的字／片語</small></summary>' +
      '<div class="vocab-tools"><button type="button" class="btn btn-secondary btn-sm" data-action="vocab-hide-zh">🙈 遮住中文自我測驗</button><span>點單字可發音；遮住中文後，點中文那一格就會顯示。</span></div>' +
      '<ul class="vocab-list">' + rows + '</ul>' +
    '</details>';
  }
  function groupDomId(group) {
    return 'rg-' + String(group.id || '').replace(/[^a-zA-Z0-9_-]/g, '-');
  }

  function renderReviewGroup(group, items) {
    const qs = group.questions.length ? group.questions : items.map((it) => it.q);
    const first = qs[0].num;
    const last = qs[qs.length - 1].num;
    const range = first === last ? '第 ' + first + ' 題' : '第 ' + first + '–' + last + ' 題';
    const isListening = qs[0].sectionKey === 'listening';
    const needles = groupNeedles(group);
    const correct = items.filter((it) => it.isCorrect).length;
    let material = '';
    if (group.passage) {
      material = '<div class="rg-passage">' + renderPassage(group.passage, group, true, needles) + '</div>';
    } else if (group.script && group.script.length) {
      material = '<div class="rg-script">' + group.script.map((line) =>
        '<div class="script-line"><span class="script-speaker">' + escapeHtml(line.speaker || '') + '</span><span class="script-text">' + markHtml(line.text, needles) + '</span></div>'
      ).join('') + '</div>';
    }
    const seen = new Set();
    const figs = [];
    qs.forEach((q) => {
      if (!q.figure) return;
      const k = typeof q.figure === 'string' ? q.figure : JSON.stringify(q.figure);
      if (seen.has(k)) return;
      seen.add(k);
      figs.push(renderFigure(q.figure));
    });
    let headings = '';
    if (group.headings && group.headings.length) {
      const hz = noteFor(qs[0]).hz || {};
      headings = '<div class="rg-headings"><span class="box-label">段落標題選項（6 選 5，多一個是陷阱）</span>' +
        group.headings.map((h) => '<div class="rg-heading"><b>' + h.key + '.</b><span>' + tokenizeEn(h.text) + (hz[h.key] ? '<span class="opt-zh">' + escapeHtml(hz[h.key]) + '</span>' : '') + '</span></div>').join('') +
      '</div>';
    }
    const zh = (qs.find((q) => q.translation) || {}).translation || '';
    reviewZh[group.id] = zh;
    const title = group.passage && group.passage.title ? '<span class="rg-title">' + escapeHtml(group.passage.title) + '</span>' : '';
    return '<section class="review-group" id="' + groupDomId(group) + '" data-group-id="' + escapeAttr(group.id) + '">' +
      '<div class="rg-head">' +
        '<div class="rg-head-left"><span class="q-part-tag">' + (isListening ? '聽力' : '閱讀') + ' ' + escapeHtml(shortPart(qs[0].partTitle)) + '</span><strong>' + range + '</strong>' + title + '</div>' +
        '<span class="rg-score' + (correct === items.length ? ' ok' : '') + '">答對 ' + correct + ' / ' + items.length + '</span>' +
      '</div>' +
      (isListening ? replayRowHtml(group) : '') +
      renderVocabPanel(group) +
      (material ? '<div class="rg-material"><span class="box-label">' + (isListening ? '聽力逐字稿' : '閱讀文章') + '<small>紅底＝答案依據（旁邊標題號，點題號可跳到該題）</small></span>' + material + '</div>' : '') +
      figs.join('') +
      headings +
      (zh && material ? '<details class="rg-zh" open><summary>中文翻譯</summary><div class="rg-zh-body">' + escapeHtml(zh).replace(/\n/g, '<br>') + '</div></details>' : '') +
      '<div class="rg-questions">' + items.map((it) => renderReviewItem(it, Boolean(material))).join('') + '</div>' +
    '</section>';
  }

  function gotoEvidence(num, fromEl) {
    const section = fromEl ? fromEl.closest('.review-group') : null;
    const scope = section || document;
    const mark = $$('.ev-mark', scope).find((m) => String(m.getAttribute('data-qs')).split(',').indexOf(String(num)) !== -1);
    if (!mark) { showToast('這題的依據在圖表或題目本身。'); return; }
    const details = mark.closest('details');
    if (details) details.open = true;
    mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
    mark.classList.add('flash');
    setTimeout(() => mark.classList.remove('flash'), 1800);
  }

  function reviewId(key) {
    return 'review-' + String(key).replace(/[^a-zA-Z0-9_-]/g, '-');
  }

  function renderReviewFilter(filter) {
    state.reviewFilter = filter || 'all';
    updateReviewTabs();
    const host = $('#reviewContent');
    if (!host) return;

    if (filter === 'pacing') {
      host.innerHTML =
        '<div class="section-heading" style="text-align:left;margin:6px 0 14px;"><h2 style="font-size:1.1rem;">逐題配速分析</h2><p>紅色為超過建議上限；過快也可能是未讀完就猜答。</p></div>' +
        renderPacingTable();
      return;
    }

    const items = reviewQuestionsFor(filter);
    if (!items.length) {
      host.innerHTML = '<div class="review-empty"><strong>' + (filter === 'wrong' ? '沒有答錯的題目' : '目前沒有可檢討的題目') + '</strong>' + (filter === 'wrong' ? '這次全部答對，試試配速分析或再測一次。' : '請先完成測驗並交卷。') + '</div>';
      return;
    }

    const order = [];
    const byGroup = new Map();
    items.forEach((it) => {
      const g = it.q.group;
      if (!byGroup.has(g)) { byGroup.set(g, []); order.push(g); }
      byGroup.get(g).push(it);
    });
    host.innerHTML =
      '<div class="token-legend"><span>🔎</span><div>依題組檢討：上面是文章／逐字稿與中文，下面是該組題目。<mark class="ev-mark">紅底</mark>是答案依據、<mark class="kw-mark">黃底</mark>是題目關鍵字；點任何英文單字會唸出來並顯示在這句的意思。試點 <span class="word-token sample-token" data-word="explore">explore</span></div></div>' +
      order.map((g) => renderReviewGroup(g, byGroup.get(g))).join('');
  }

  function renderReviewItem(item, hasMaterial) {
    const q = item.q;
    const note = noteFor(q);
    const status = !item.answered ? 'skipped' : item.isCorrect ? 'correct' : 'wrong';
    const statusText = !item.answered ? '未作答' : item.isCorrect ? '答對' : '答錯';
    const selected = item.user;
    const pacing = q.sectionKey === 'reading' ? pacingRows().find((row) => row.q.key === q.key) : null;
    let optionList = q.options.map((opt, i) => ({ letter: opt.letter, text: opt.text, zh: note.oz ? note.oz[i] : '' }));
    if (q.type === 'matching' && q.group.headings && q.group.headings.length) {
      const hz = noteFor(q.group.questions[0] || q).hz || {};
      optionList = q.group.headings
        .filter((h) => q.answer.indexOf(h.key) !== -1 || selected.indexOf(h.key) !== -1)
        .map((h) => ({ letter: h.key, text: h.text, zh: hz[h.key] || '' }));
    }
    const optionHtml = optionList.map((opt) => {
      const isCorrect = q.answer.indexOf(opt.letter) !== -1;
      const isUser = selected.indexOf(opt.letter) !== -1;
      const classes = 'review-option' + (isCorrect ? ' correct' : isUser ? ' wrong' : '');
      const tags = [];
      if (isCorrect) tags.push('正確答案');
      if (isUser) tags.push('你的答案');
      return '<div class="' + classes + '">' +
        '<span class="prefix">' + opt.letter + '.</span>' +
        '<span class="option-text">' + tokenizeEn(opt.text) + (opt.zh ? '<span class="opt-zh">' + escapeHtml(opt.zh) + '</span>' : '') + '</span>' +
        (tags.length ? '<span class="tag">' + tags.join(' · ') + '</span>' : '') +
      '</div>';
    }).join('');
    const kwNeedles = (note.kw || []).map((w) => ({ str: w, ci: true, cls: 'kw' }));
    const evHint = (note.ev && note.ev.length && hasMaterial)
      ? '<div class="ev-hint"><span class="ev-hint-label">📍 答案依據</span>' + note.ev.map((e) =>
          '<button type="button" class="ev-quote" data-action="review-goto-ev" data-num="' + q.num + '">「' + escapeHtml(e) + '」</button>').join('') + '</div>'
      : '';


    const pacingMeta = pacing
      ? '<span>停留 ' + (pacing.hasTiming ? Math.round(pacing.seconds) + ' 秒' : '—') + ' · 建議 ' + pacing.range.label + '</span>' +
        (pacing.status === 'over' ? '<span class="pacing-badge over">超時</span>' : pacing.status === 'fast' ? '<span class="pacing-badge fast">過快</span>' : pacing.status === 'ok' ? '<span class="pacing-badge ok">適中</span>' : '')
      : '';

    return '<article class="review-item ' + status + '" id="' + reviewId(q.key) + '" data-review-key="' + escapeAttr(q.key) + '">' +
      '<div class="review-head">' +
        '<div class="review-head-left">' +
          '<span class="q-number-tag">第 ' + q.num + ' 題</span>' +
          '<span class="q-part-tag">' + escapeHtml(shortPart(q.partTitle)) + '</span>' +
          '<span class="q-type-tag">' + typeLabel(q.type) + '</span>' +
          '<span class="review-status ' + status + '">' + statusText + '</span>' +
        '</div>' +
        '<div class="review-meta">' + pacingMeta + '</div>' +
      '</div>' +
      '<div class="review-stem">' + markHtml(q.stem, kwNeedles) + '</div>' +
      (note.qz && (hasMaterial || q.sectionKey === 'listening') ? '<div class="review-stem-zh">' + escapeHtml(note.qz) + '</div>' : '') +
      (optionHtml ? '<div class="review-options">' + optionHtml + '</div>' : '') +
      '<div class="answer-compare">' +
        '<span>你的答案：<b class="' + (item.isCorrect ? 'ok' : 'no') + '">' + (selected.length ? selected.join('') : '未作答') + '</b></span>' +
        '<span>正確答案：<b class="ok">' + (q.answer.length ? q.answer.join('') : '未提供') + '</b></span>' +
        '<span class="' + (item.isCorrect ? 'ok' : 'no') + '">' + (item.isCorrect ? '✓ 完整答對' : '✗ 未完全答對') + '</span>' +
      '</div>' +
      (!hasMaterial && q.translation ? '<div class="translation-box"><span class="box-label">中文翻譯</span>' + escapeHtml(q.translation).replace(/\n/g, '<br>') + '</div>' : '') +
      evHint +
      (q.explanation ? '<div class="expl-box"><span class="box-label">詳解</span>' + escapeHtml(q.explanation).replace(/\n/g, '<br>') + '</div>' : '') +
    '</article>';
  }

  function jumpReview(key) {
    state.reviewFilter = 'all';
    renderReviewFilter('all');
    renderPacingSummary();
    setTimeout(() => {
      const el = document.getElementById(reviewId(key));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--primary) 35%, transparent)';
        setTimeout(() => { el.style.boxShadow = ''; }, 1600);
      }
    }, 60);
  }

  /* ======================================================================
     單字查詢側邊欄
     ====================================================================== */
  function dictSourceLabel(source) {
    if (source === 'builtin') return '內建字庫';
    if (source === 'online') return '線上辭典';
    if (source === 'translate') return '機器翻譯';
    return '辭典';
  }

  function showDictionaryLoading(word) {
    const body = $('#dictBody');
    const wordEl = $('#dictWord');
    const phoneticEl = $('#dictPhonetic');
    const sourceEl = $('#dictSource');
    if (wordEl) wordEl.textContent = word;
    if (phoneticEl) phoneticEl.textContent = '';
    if (sourceEl) sourceEl.textContent = '查詢中…';
    if (body) {
      body.innerHTML = '<div class="dict-loading"><div class="skeleton" style="width:45%;height:24px"></div><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton" style="width:60%"></div></div>';
    }
    const speak = $('#dictSpeak');
    if (speak) speak.disabled = true;
  }

  function loadContextTranslation(requestId, ctx) {
    const box = $('#dictCtxZh');
    if (!box || !ctx || !ctx.sentence || !window.BESTEP_DICT.translateToZh) return;
    window.BESTEP_DICT.translateToZh(ctx.sentence).then((zh) => {
      if (requestId !== state.dictRequest) return;
      const el = $('#dictCtxZh');
      if (!el) return;
      el.textContent = zh ? '整句：' + zh : '';
      el.hidden = !zh;
    }).catch(() => {});
  }

  function renderDictEntry(entry, ctx) {
    const wordEl = $('#dictWord');
    const phoneticEl = $('#dictPhonetic');
    const body = $('#dictBody');
    const sourceEl = $('#dictSource');
    if (!body) return;
    if (wordEl) wordEl.textContent = entry.word || '';
    if (phoneticEl) phoneticEl.textContent = entry.phonetic || '音標未提供';
    if (sourceEl) sourceEl.textContent = dictSourceLabel(entry.source);
    const speak = $('#dictSpeak');
    if (speak) speak.disabled = false;

    const groups = Array.isArray(entry.groups) ? entry.groups : [];
    let hint = '';
    if (entry.matchedForm) {
      hint += '<div class="dict-hint">原文「' + escapeHtml(entry.matchedForm) + '」已還原為原形「' + escapeHtml(entry.word) + '」。</div>';
    }
    if (entry.note) {
      hint += '<div class="dict-hint">' + escapeHtml(entry.note) + '</div>';
    }

    const hasZh = groups.some((group) => (group.meanings || []).some((meaning) => BESTEP_DICT.hasChinese(meaning)));
    if (!hasZh) {
      hint += '<div class="dict-hint">線上中文翻譯暫時無法取得，以下先顯示英文釋義；可稍後再點一次重試。</div>';
    }

    // 依「這一句」的中文翻譯，把句中的意思排在最前面
    const zhText = ctx && ctx.zh ? ctx.zh : '';
    const inContext = [];
    const core = (m) => String(m).replace(/[（(][^）)]*[）)]/g, '').replace(/^[的地得]|[的地得]$/g, '').trim();
    groups.forEach((group) => {
      (group.meanings || []).forEach((m) => {
        const c = core(m);
        if (c.length >= 1 && zhText && BESTEP_DICT.hasChinese(c) && zhText.indexOf(c) !== -1 && inContext.indexOf(m) === -1) inContext.push((group.pos ? group.pos + ' ' : '') + m);
      });
    });
    let ctxHtml = '';
    if (ctx && ctx.sentence) {
      const word = entry.matchedForm || entry.word || '';
      const re = new RegExp('(\\b' + String(word).replace(/[^A-Za-z'’-]/g, '') + '\\w*)', 'i');
      ctxHtml = '<div class="dict-ctx">' +
        '<div class="dict-ctx-label">📌 在這句的意思</div>' +
        (inContext.length ? '<div class="dict-ctx-mean">' + inContext.map(escapeHtml).join('；') + '</div>' : '') +
        '<div class="dict-ctx-sent">' + escapeHtml(ctx.sentence).replace(re, '<b>$1</b>') + '</div>' +
        '<div class="dict-ctx-zh" id="dictCtxZh" hidden></div>' +
        (!inContext.length ? '<div class="dict-ctx-note">對照下方整句翻譯，選最符合的意思。</div>' : '') +
      '</div>' +
      '<div class="dict-more-label">延伸意思（字典全部釋義）</div>';
    }

    const html = groups.map((group) => {
      const meanings = (group.meanings || []).filter(Boolean)
        .sort((a, b) => (inContext.some((m) => m.endsWith(b)) ? 1 : 0) - (inContext.some((m) => m.endsWith(a)) ? 1 : 0));
      const definitions = (group.definitions || []).filter(Boolean);
      const rows = meanings.map((meaning, index) => {
        const def = definitions[index];
        return '<div class="dict-mean-item"><span class="dict-mean-index">' + (index + 1) + '.</span><div>' + escapeHtml(meaning) +
          (def && BESTEP_DICT.hasChinese(meaning) ? '<span class="dict-def-en">' + escapeHtml(def) + '</span>' : '') +
        '</div></div>';
      }).join('');
      const examples = (group.examples || []).slice(0, 1).map((example) => '<div class="dict-example">' + escapeHtml(example) + '</div>').join('');
      return '<div class="dict-pos-block">' +
        '<div class="dict-pos-label">' + escapeHtml(group.pos || '—') + '</div>' +
        '<div class="dict-meanings">' + (rows || '<div class="dict-mean-item">暫無釋義</div>') + examples + '</div>' +
      '</div>';
    }).join('');

    body.innerHTML = ctxHtml + hint + '<div class="dict-entry">' + html + '</div>';
  }

  function renderDictError(word) {
    const body = $('#dictBody');
    const sourceEl = $('#dictSource');
    if (sourceEl) sourceEl.textContent = '查無資料';
    if (!body) return;
    body.innerHTML =
      '<div class="dict-error"><strong>查不到「' + escapeHtml(word) + '」</strong><br>可能是專有名詞、縮寫或拼字變體。請確認拼字，或稍後再試一次。' +
        '<div><button type="button" class="btn btn-secondary btn-sm" data-action="retry-dict" data-word="' + escapeAttr(word) + '">重新查詢</button></div>' +
      '</div>';
  }

  function contextFor(tokenEl, word) {
    if (!tokenEl) return null;
    const block = tokenEl.closest('.passage-block, .script-text, .review-stem, .option-text, .rg-heading, li, .figure-caption') || tokenEl.parentElement;
    if (!block) return null;
    const text = String(block.textContent || '').replace(/第[\d・]+題/g, '').replace(/\s+/g, ' ').trim();
    const sentences = text.match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || [text];
    const re = new RegExp('\\b' + word.replace(/[^A-Za-z'’-]/g, '') + '\\b', 'i');
    const sentence = (sentences.find((s) => re.test(s)) || text).trim();
    const groupEl = tokenEl.closest('.review-group');
    const zh = groupEl ? (reviewZh[groupEl.getAttribute('data-group-id')] || '') : '';
    return { sentence, zh };
  }

  async function openDictionary(word, tokenEl) {
    const clean = String(word || '').trim();
    if (!clean) return;
    if (state.view !== 'review') return;
    // 點單字立刻唸出來（在點擊當下呼叫，iPhone 才允許發聲）
    stopReplay();
    try { window.BESTEP_DICT.speak(clean); } catch (e) { /* ignore */ }
    state.dictContext = contextFor(tokenEl, clean);
    $$('.word-token.active').forEach((el) => el.classList.remove('active'));
    if (tokenEl) tokenEl.classList.add('active');
    const panel = $('#dictPanel');
    const backdrop = $('#dictBackdrop');
    if (!panel || !backdrop) return;
    backdrop.hidden = false;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => backdrop.classList.add('open'));
    showDictionaryLoading(clean);
    const requestId = ++state.dictRequest;
    let entry = null;
    try {
      entry = await window.BESTEP_DICT.lookup(clean);
    } catch (e) {
      entry = null;
    }
    if (requestId !== state.dictRequest) return;
    if (entry) {
      state.dictEntry = entry;
      renderDictEntry(entry, state.dictContext);
      loadContextTranslation(requestId, state.dictContext);
    } else {
      state.dictEntry = null;
      renderDictError(clean);
    }
  }

  function closeDictionary() {
    const panel = $('#dictPanel');
    const backdrop = $('#dictBackdrop');
    state.dictRequest += 1;
    if (panel) {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
    }
    if (backdrop) {
      backdrop.classList.remove('open');
      setTimeout(() => { if (!backdrop.classList.contains('open')) backdrop.hidden = true; }, 280);
    }
    $$('.word-token.active').forEach((el) => el.classList.remove('active'));
    state.dictEntry = null;
  }

  /* ======================================================================
     事件綁定
     ====================================================================== */
  function startReadingFromModal() {
    if (!state.sections.reading) {
      showToast('此回沒有閱讀題庫。', 'error');
      return;
    }
    closeAllModals();
    state.readingUnlocked = true;
    if (!state.readingStarted) {
      startReadingSection(false);
    } else {
      state.activeSection = 'reading';
      renderExamChrome();
      goToReading(state.readingQuestionIndex, { silent: true });
    }
    updateHeaderVolumeButton();
  }

  function goLobby() {
    if (state.view === 'exam' && !state.submitted) {
      showToast('測驗進行中，請先交卷再回到大廳。');
      return;
    }
    closeAllModals();
    closeDictionary();
    switchView('lobby');
    renderLobby();
  }

  function restartExam() {
    stopReplay();
    releaseMediaSession();
    stopSpeech();
    clearAllTimers();
    endDwell();
    closeAllModals();
    closeDictionary();
    state.submitted = false;
    state.result = null;
    state.testId = null;
    state.mode = null;
    state.view = 'lobby';
    switchView('lobby');
    renderLobby();
  }

  function handleAction(el) {
    const action = el.getAttribute('data-action');
    if (!action) return;
    switch (action) {
      case 'go-lobby':
        goLobby();
        break;
      case 'toggle-theme':
        applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
        break;
      case 'choose-test':
        openStartModal(el.getAttribute('data-test'), el.getAttribute('data-mode'));
        break;
      case 'close-modal': {
        const modal = el.closest('.modal-overlay');
        if (modal) closeModal(modal);
        break;
      }
      case 'start-exam':
        unlockAudio();
        if (state.pendingStart.testId && state.pendingStart.mode) startExam(state.pendingStart.testId, state.pendingStart.mode);
        break;
      case 'volume-test': {
        const status = $('#volumeStatus');
        runVolumeTest(el, status);
        break;
      }
      case 'open-volume-test':
        runVolumeTest(el, null);
        break;
      case 'toggle-answer-card': {
        const rail = $('#answerRail');
        if (!rail) break;
        const open = rail.classList.toggle('open');
        el.setAttribute('aria-expanded', String(open));
        break;
      }
      case 'confirm-submit':
        openSubmitModal();
        break;
      case 'submit-exam':
        submitExam(false);
        break;
      case 'play-group':
        playListeningGroup();
        break;
      case 'next-group':
        nextListeningGroup(false);
        break;
      case 'prev-group':
        prevListeningGroup();
        break;
      case 'prev-question': {
        endDwell();
        moveReadingGroup(-1);
        break;
      }
      case 'next-question': {
        endDwell();
        moveReadingGroup(1);
        break;
      }
      case 'toggle-pause':
        if (state.paused) resumeExam(); else pauseExam();
        break;
      case 'resume-exam':
        resumeExam();
        break;
      case 'zoom-figure':
        openFigureZoom(el);
        break;
      case 'zoom-in':
        setFigureZoom(figZoom + 0.5);
        break;
      case 'zoom-out':
        setFigureZoom(figZoom - 0.5);
        break;
      case 'zoom-reset':
        setFigureZoom(1);
        break;
      case 'zoom-close':
        closeFigureZoom();
        break;
      case 'goto-question':
        jumpToQuestion(el.getAttribute('data-key'));
        if (window.innerWidth <= 980) {
          const rail = $('#answerRail');
          if (rail) rail.classList.remove('open');
        }
        break;
      case 'flag-question':
        toggleFlag(el.getAttribute('data-key'));
        break;
      case 'select-option':
        selectOption(el.getAttribute('data-key'), el.getAttribute('data-letter'));
        break;
      case 'select-matching':
        selectMatching(el.getAttribute('data-key'), el.getAttribute('data-letter'));
        break;
      case 'review-filter':
        renderReviewFilter(el.getAttribute('data-filter'));
        break;
      case 'jump-review':
        jumpReview(el.getAttribute('data-key'));
        break;
      case 'restart':
        restartExam();
        break;
      case 'open-dict-hint':
        if (state.view !== 'review') showToast('交卷進入檢討模式後，即可點擊單字查詢。');
        else showToast('點擊檢討內容中的任何英文單字，右側會顯示音標、詞性與中文釋義。');
        break;
      case 'dict-close':
        closeDictionary();
        break;
      case 'dict-speak':
        if (state.dictEntry) window.BESTEP_DICT.speak(state.dictEntry.word);
        else {
          const word = $('#dictWord') ? $('#dictWord').textContent : '';
          if (word && word !== '—') window.BESTEP_DICT.speak(word);
        }
        break;
      case 'retry-dict':
        openDictionary(el.getAttribute('data-word'));
        break;
      case 'official-start':
        startOfficialListening();
        break;
      case 'official-follow':
        followPlaying();
        break;
      case 'official-resume':
        resumeOfficialListening();
        break;
      case 'speak-word':
        try { window.BESTEP_DICT.speak(el.getAttribute('data-word')); } catch (e) { /* ignore */ }
        break;
      case 'vocab-hide-zh': {
        const panel = el.closest('.vocab-panel');
        if (panel) {
          const on = !panel.classList.contains('hide-zh');
          panel.classList.toggle('hide-zh', on);
          $$('.vocab-zh', panel).forEach((z) => z.classList.remove('peek'));
          el.textContent = on ? '👀 顯示全部中文' : '🙈 遮住中文自我測驗';
        }
        break;
      }
      case 'vocab-peek':
        el.classList.toggle('peek');
        break;
      case 'match-pick':
        matchPick(el.getAttribute('data-key'), el.getAttribute('data-letter'));
        break;
      case 'match-goto':
        matchGotoParagraph(el.getAttribute('data-num'));
        break;
      case 'pace-info':
        paceInfo();
        break;
      case 'cycle-speed':
        cycleSpeed();
        break;
      case 'official-skip':
        skipOfficialGap();
        break;
      case 'review-goto-ev':
        gotoEvidence(el.getAttribute('data-num'), el);
        break;
      case 'review-goto-q': {
        const target = document.getElementById(reviewId(el.getAttribute('data-key')));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.classList.add('flash');
          setTimeout(() => target.classList.remove('flash'), 1600);
        }
        break;
      }
      case 'replay-segment':
        replaySegment(el);
        break;
      case 'reading-pane':
        setReadingPane(el.getAttribute('data-pane'), true);
        break;
      case 'start-reading':
        startReadingFromModal();
        break;
      case 'submit-listening-only':
        if (!state.readingStarted) state.mode = 'listening';
        submitExam(false);
        break;
      case 'open-listening-done':
        showListeningDoneModal();
        break;
      default:
        break;
    }
  }

  function onClick(event) {
    const token = event.target.closest('.word-token');
    if (token && state.view === 'review') {
      event.preventDefault();
      openDictionary(token.getAttribute('data-word'), token);
      return;
    }
    const actionEl = event.target.closest('[data-action]');
    if (actionEl) {
      event.preventDefault();
      handleAction(actionEl);
    }
  }

  function onChange(event) {
    const target = event.target;
    if (target.matches('input[name="examMode"]')) {
      state.pendingStart.mode = target.value;
      updateStartButton();
      return;
    }
    if (target.matches('.select-answer')) {
      const key = target.getAttribute('data-matching-key');
      if (key) selectMatching(key, target.value);
    }
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      if (closeFigureZoom()) return;
      const panel = $('#dictPanel');
      if (panel && panel.classList.contains('open')) {
        closeDictionary();
        return;
      }
      const openModalEl = $$('.modal-overlay.open')[0];
      if (openModalEl) closeModal(openModalEl);
      return;
    }
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('.option-item, .heading-option, .figure-card.zoomable')) {
      event.preventDefault();
      event.target.click();
    }
  }

  function onFirstGesture(event) {
    if (state.audioUnlocked) return;
    const t = event.target && event.target.closest ? event.target.closest('[data-action]') : null;
    const act = t ? t.getAttribute('data-action') : '';
    // 這幾個按鈕本身會在同一次點擊中直接發聲，不需要先送靜音語句。
    if (act === 'volume-test' || act === 'open-volume-test' || act === 'play-group' || act === 'dict-speak') return;
    unlockAudio();
  }

  function bindEvents() {
    document.addEventListener('touchend', onFirstGesture, true);
    document.addEventListener('click', onFirstGesture, true);
    document.addEventListener('click', onClick);
    document.addEventListener('change', onChange);
    document.addEventListener('keydown', onKeyDown);

    const tabs = $('#sectionTabs');
    if (tabs) {
      tabs.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-section]');
        if (!button || button.disabled) return;
        switchSection(button.getAttribute('data-section'));
      });
    }

    const reviewTabs = $('#reviewTabs');
    if (reviewTabs) {
      reviewTabs.addEventListener('click', (event) => {
        const button = event.target.closest('.review-tab');
        if (!button) return;
        renderReviewFilter(button.getAttribute('data-filter'));
      });
    }

    $$('.modal-overlay').forEach((overlay) => {
      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeModal(overlay);
      });
    });

    const dictBackdrop = $('#dictBackdrop');
    if (dictBackdrop) dictBackdrop.addEventListener('click', closeDictionary);

    const dictClose = $('#dictClose');
    if (dictClose) dictClose.addEventListener('click', closeDictionary);

    document.addEventListener('click', (event) => {
      const rail = $('#answerRail');
      if (!rail || !rail.classList.contains('open')) return;
      if (rail.contains(event.target) || event.target.closest('#answerCardToggle')) return;
      rail.classList.remove('open');
    });

    window.addEventListener('pagehide', () => {
      endDwell();
      stopSpeech();
    });
  }

  /* ======================================================================
     初始化
     ====================================================================== */
  function init() {
    applyTheme(currentTheme());
    bindEvents();
    renderLobby();
    if ('speechSynthesis' in window) {
      // 部分瀏覽器需等 voices 非同步載入；先觸發一次。
      window.speechSynthesis.getVoices();
    }
    window.BESTEP_APP = {
      version: APP_VERSION,
      startExam,
      reloadData: function () {
        Object.keys(sectionCache).forEach((key) => delete sectionCache[key]);
        renderLobby();
      },
      getState: function () { return state; },
      pauseExam: pauseExam,
      resumeExam: resumeExam,
      openDictionary,
      setReadingPane,
      unlockAudio,
      startOfficialListening
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
