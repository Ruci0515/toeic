# TOEIC 多益模擬測驗 · 個人練習站

由 BESTEP 培力模擬考網站（`Ruci0515/Eng`，已封存）複製改造而成的多益版本。

- 網址：<https://ruci0515.github.io/toeic/>
- 原始碼：<https://github.com/Ruci0515/toeic>

## 功能

- **題型**：Part 2 應答（選項只用聽的）、Part 3 對話、Part 4 獨白、Part 5 句子填空、Part 6 段落填空、Part 7 單篇／雙篇／三篇閱讀。
- **題目**：全部是原創的多益風格題目（不是官方或出版社題庫）。目前 Test 1 為半量版：聽力 30＋閱讀 30 題。
- **聽力**：用 macOS 內建語音合成，美、英、澳、愛爾蘭口音輪流出現；可跳過作答空白、切換 1.2× 語速、暫停。
- **閱讀**：題組一次顯示全部題目、配速圓盤倒數本組建議時間。
- **檢討**：依題組呈現，答案依據句反紅並標題號、題目關鍵字黃底、選項附中文、單字快學、點單字發音與查詢。
- **計分**：依答對率換算多益估計分數（聽力、閱讀各 5–495，總分 10–990）。半量原創題只能當趨勢參考。
- **成績紀錄**：每次交卷自動記錄日期、時間、分數、用時，大廳顯示學習曲線（總分／聽力／閱讀）與目標線。

## 成績紀錄怎麼同步到每台裝置？

紀錄預設存在該裝置的瀏覽器。要讓手機、平板、電腦共用：

1. GitHub → Settings → Developer settings → Personal access tokens → **Tokens (classic)** → Generate new token。
2. 只勾 **gist** 權限，產生後複製。
3. 在網站大廳「我的成績紀錄」→「☁️ 設定雲端同步」貼上，按「連結」。

網站會在你帳號下建立一個**私密 Gist**（`toeic-records.json`）存放紀錄；之後每台裝置第一次貼同一個 token，就會自動找到同一份紀錄。token 只存在該裝置的瀏覽器，不會進到程式碼或倉庫。

## 開發

```bash
python3 tools/build_audio.py      # 依 data/test*_listening.js 重新產生聽力音檔與時間軸（需 macOS + ffmpeg）
node tests/verify.js              # 完整驗收（題庫、路徑、音檔、375px 手機瀏覽器流程）
./sync.sh "說明"                   # pull → 測試 → commit → push
```

資料格式與新增題目的方法見 [MAINTENANCE.md](MAINTENANCE.md)。
