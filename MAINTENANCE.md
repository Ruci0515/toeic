# 專案交接／維護提示詞（可直接整段貼給 AI）

你正在維護一個純前端靜態網站「TOEIC 多益模擬測驗」，部署在 GitHub Pages：
倉庫 `Ruci0515/toeic`（分支 `main`、根目錄），網址 `https://ruci0515.github.io/toeic/`（子路徑，所有引用必須是相對路徑）。
它由 BESTEP 模擬考（`Ruci0515/Eng`，已封存，不要動）複製而來，程式引擎相同，內部變數名稱沿用 `BESTEP_*`。

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | 頁面骨架；`<script>` 依序載入 data → dictionary → records → app |
| `js/app.js` | 測驗引擎：出題、計時、聽力播放、閱卷、檢討、估分（`toeicScale`）、交卷時發出 `exam:submitted` 事件 |
| `js/records.js` | 成績紀錄（localStorage `toeic-records-v1`）、學習曲線、GitHub Gist 同步（`toeic-sync-v1` 存 token 與 gistId） |
| `js/dictionary.js` | 單字查詢（內建字庫＋線上辭典） |
| `data/testN_0meta.js` … `testN_9end.js` | 第 N 回題庫：0meta（共用函式）、1l（Part 1–2）、2l（Part 3）、3l（Part 4）、4r（Part 5–6）、5r（Part 7 單篇）、6r（Part 7 多篇）、9end（排序並產生註解／單字索引） |
| `data/audio_timeline.js` | 由 `tools/build_audio.py` 產生的音檔時間軸與空白偵測 |
| `audio/testN_listening.mp3` | 合成的聽力音檔 |
| `tests/verify.js` | 自動驗收 |

## 題目格式（每題一個物件）

```js
{
  id: 10, part: 'Part 3', group: 'L-10-12', type: 'single',      // group 相同 = 同一題組
  voices: { W: 'Samantha', M: 'Daniel' },                          // 只放在題組第一題；聽力用
  question: '...', options: ['...', '...', '...', '...'], answer: 'B',
  script: [{ speaker: 'W', text: '...' }],                         // 聽力逐字稿（同組每題相同）
  passage: { title, blocks: [{ type: 'p' | 'h' | 'list', text, items }] }, // 閱讀文章；Part 6 空格寫 {{題號}}
  translation: '整篇中文', explanation: '詳解', recommendedSeconds: 25,
  audioOnly: true,                                                 // Part 2：考試時不顯示選項文字
  qz: '題目中文', oz: ['選項中文', ...], ev: ['答案依據原文（必須逐字相同）'], kw: ['題目關鍵字'],
  vocab: [['單字', '詞性', '中文', '原文寫法(可省略)']]              // 單字快學，放在題組第一題
}
```

可用語音（Kokoro）：美女 af_heart / af_bella / af_sarah / af_nicole、美男 am_michael / am_adam / am_eric、英女 bf_emma / bf_isabella、英男 bm_george / bm_lewis；旁白 am_michael。題組寫法見 `data/test1_0meta.js` 開頭說明（TOEIC_T1.set／spoken）。

## 新增第 N 回

目前有 Test 1、Test 2。以下以新增第 3 回為例：

1. 複製 `data/test2_*.js` 改成 `test3_*`，0meta 裡的 `test2Listening`／`test2Reading`／`TOEIC_T2`／`testId: 2` 改成 3，9end 的 `'2L'`／`'2R'` 改成 `'3L'`／`'3R'`。Part 1 照片放 `images/p1/t3_N.jpg` 並在 CREDITS.md 補上出處。
2. `js/app.js` 的 `TEST_META` 加上 `{ id: 3, label: 'Test 3', files: {...} }`。
3. `index.html` 加上八個 `<script src="data/test3_….js">`（放在 test2_9end 之後）。
4. `~/.cache/toeic-tts/venv/bin/python tools/build_audio.py 3` 產生音檔（只重做第 3 回，其他回的時間軸保留）。
5. `node tests/verify.js` 全部通過後 `./sync.sh "新增 Test 3"`。

題目必須是原創，不可抓取或複製官方、出版社、補習班的題庫（倉庫是公開的）。
