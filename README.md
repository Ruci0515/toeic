# TOEIC 多益模擬測驗 · 個人練習站

由 BESTEP 培力模擬考網站（`Ruci0515/Eng`，已封存）複製改造而成的多益版本。

- 網址：<https://ruci0515.github.io/toeic/>
- 原始碼：<https://github.com/Ruci0515/toeic>

## 功能

- **題型與題數（比照正式多益，一回 200 題）**：聽力 Part 1 照片 6、Part 2 應答 25、Part 3 對話 39、Part 4 獨白 30；閱讀 Part 5 句子填空 30、Part 6 段落填空 16、Part 7 閱讀 54（單篇 29＋雙篇 10＋三篇 15）。
- **題目**：全部是原創的多益風格題目（不是官方或出版社題庫）。Part 1 照片是 CC0 公眾領域圖片（見 images/p1/CREDITS.md）。
- **聽力**：用開源 AI 語音 Kokoro（Apache-2.0）合成，美、英口音男女聲；可跳過作答空白、切換 1.2× 語速、暫停。
- **閱讀**：題組一次顯示全部題目、配速圓盤倒數本組建議時間。
- **檢討**：依題組呈現，答案依據句反紅並標題號、題目關鍵字黃底、選項附中文、單字快學、點單字發音與查詢。
- **計分**：依答對率換算多益估計分數（聽力、閱讀各 5–495，總分 10–990）。原創題的估分只能當趨勢參考，不等於正式成績。
- **成績紀錄**：每次交卷自動記錄日期、時間、分數、用時，大廳顯示學習曲線（總分／聽力／閱讀）與目標線。

## 成績紀錄怎麼同步到每台裝置？

紀錄預設存在該裝置的瀏覽器。要讓手機、平板、電腦共用：

1. GitHub → Settings → Developer settings → Personal access tokens → **Tokens (classic)** → Generate new token。
2. 只勾 **gist** 權限，產生後複製。
3. 在網站大廳「我的成績紀錄」→「☁️ 設定雲端同步」貼上，按「連結」。

網站會在你帳號下建立一個**私密 Gist**（`toeic-records.json`）存放紀錄；之後每台裝置第一次貼同一個 token，就會自動找到同一份紀錄。token 只存在該裝置的瀏覽器，不會進到程式碼或倉庫。

## 開發

```bash
~/.cache/toeic-tts/venv/bin/python tools/build_audio.py   # 重新產生聽力音檔（第一次安裝方式見檔案開頭說明）
node tests/verify.js              # 完整驗收（題庫、路徑、音檔、375px 手機瀏覽器流程）
./sync.sh "說明"                   # pull → 測試 → commit → push
```

資料格式與新增題目的方法見 [MAINTENANCE.md](MAINTENANCE.md)。
