/* Test 2 收尾：題目依題號排序，並整理出檢討註解（BESTEP_NOTES）與單字快學（BESTEP_VOCAB）。 */
(function () {
  const D = window.BESTEP_DATA;
  window.BESTEP_NOTES = window.BESTEP_NOTES || {};
  window.BESTEP_VOCAB = window.BESTEP_VOCAB || {};
  [['test2Listening', '2L'], ['test2Reading', '2R']].forEach(([key, tag]) => {
    const qs = D[key].questions;
    qs.sort((a, b) => a.id - b.id);
    const notes = {};
    const vocab = {};
    qs.forEach((q) => {
      notes[q.id] = { qz: q.qz, oz: q.oz, ev: q.ev, kw: q.kw };
      if (q.vocab && q.vocab.length) vocab[q.id] = q.vocab;
    });
    window.BESTEP_NOTES[tag] = notes;
    window.BESTEP_VOCAB[tag] = vocab;
  });
})();
