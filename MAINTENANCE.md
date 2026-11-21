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
| `data/testN_listening.js`、`data/testN_reading.js` | 題庫＋檢討註解＋單字快學（同一檔） |
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

可用語音（macOS）：Samantha（美女）、Reed（美男）、Daniel（英男）、Karen（澳女）、Moira（愛爾蘭女）；旁白 `Eddy (English (US))`。

## 新增第 N 回

1. 複製 `data/test1_listening.js`、`data/test1_reading.js` 改成 `test2_…`，`testId: 2`、key 改 `test2Listening`、`test2Reading`，註解 key 改 `'2L'`、`'2R'`。
2. `js/app.js` 的 `TEST_META` 加上 `{ id: 2, label: 'Test 2', files: {...} }`。
3. `index.html` 加上兩個 `<script src="data/test2_….js">`。
4. `python3 tools/build_audio.py 2` 產生音檔。
5. `node tests/verify.js` 全部通過後 `./sync.sh "新增 Test 2"`。

題目必須是原創，不可抓取或複製官方、出版社、補習班的題庫（倉庫是公開的）。
