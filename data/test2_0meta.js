/* ==========================================================================
   TOEIC 模擬測驗 Test 2（完整版 200 題，原創題目）— 共用設定
   檔案載入順序：test2_0meta → 1l(Part1–2) → 2l(Part3) → 3l(Part4)
                → 4r(Part5–6) → 5r(Part7 單篇) → 6r(Part7 多篇) → 9end
   題組寫法：TOEIC_T2.set('L', 'Part 3', 'L-32-34', base, [[題號, 題目, [選項], 答案, 題目中文, [選項中文], [答案依據原文], [題目關鍵字], 詳解], ...])
     base 可含：script（聽力逐字稿）、passage（閱讀文章）、translation、voices（說話者→語音）、vocab、figure
   ========================================================================== */
window.BESTEP_DATA = window.BESTEP_DATA || {};
window.BESTEP_DATA.test2Listening = {
  testId: 2, section: 'listening', title: 'TOEIC Test 2 · Listening',
  description: 'TOEIC 模擬測驗 Test 2 聽力（Part 1–4，100 題，約 38 分鐘）。原創題目。',
  durationSec: 0, questions: []
};
window.BESTEP_DATA.test2Reading = {
  testId: 2, section: 'reading', title: 'TOEIC Test 2 · Reading',
  description: 'TOEIC 模擬測驗 Test 2 閱讀（Part 5–7，100 題，75 分鐘）。原創題目。',
  durationSec: 75 * 60, questions: []
};

window.TOEIC_T2 = (function () {
  const D = window.BESTEP_DATA;
  const sec = { L: D.test2Listening.questions, R: D.test2Reading.questions };
  const SECONDS = { 'Part 1': 10, 'Part 2': 10, 'Part 3': 25, 'Part 4': 25, 'Part 5': 22, 'Part 6': 30, 'Part 7': 55 };

  function set(which, part, group, base, rows) {
    rows.forEach((r, i) => {
      const q = {
        id: r[0], part, group, type: r[3].length > 1 ? 'multi' : 'single',
        question: r[1], options: r[2], answer: r[3],
        qz: r[4], oz: r[5], ev: r[6] || [], kw: r[7] || [], explanation: r[8],
        script: base.script || [], translation: base.translation || '',
        recommendedSeconds: r[9] || SECONDS[part] || 30
      };
      if (base.passage) q.passage = base.passage;
      if (base.figure) q.figure = base.figure;
      if (base.audioOnly) q.audioOnly = true;
      if (i === 0) {
        if (base.voices) q.voices = base.voices;
        if (base.vocab) q.vocab = base.vocab;
      }
      sec[which].push(q);
    });
  }

  /* Part 1／Part 2 單題：選項只在音檔中播出 */
  function spoken(part, id, voices, prompt, opts, answer, zh, oz, expl, vocab, figure) {
    const script = (prompt ? [{ speaker: 'Q', text: prompt }] : [])
      .concat(opts.map((o, i) => ({ speaker: 'R', text: '(' + 'ABCD'[i] + ') ' + o })));
    const q = {
      id, part, type: 'single', audioOnly: true, voices,
      question: part === 'Part 1' ? 'Look at the picture and choose the statement that best describes it.' : 'Mark your answer on your answer sheet.',
      options: opts, answer, script, translation: zh, explanation: expl,
      recommendedSeconds: 10, qz: part === 'Part 1' ? '選出最符合照片的敘述。' : '請選出最適當的回應。',
      oz, ev: prompt ? [prompt] : [], kw: [], vocab
    };
    if (figure) q.figure = figure;
    sec.L.push(q);
  }

  return { set, spoken };
})();
