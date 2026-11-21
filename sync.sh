#!/usr/bin/env bash
# ==========================================================================
#  一鍵同步：先下載雲端最新版 → 跑自動測試 → 上傳你的修改
#  用法：在專案資料夾執行   ./sync.sh "這次改了什麼"
#        沒寫說明也可以：   ./sync.sh
# ==========================================================================
set -euo pipefail
cd "$(dirname "$0")"

MSG="${1:-更新：$(date '+%Y-%m-%d %H:%M')}"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"

echo "① 下載雲端最新版（git pull）…"
# 本機若有還沒存檔的修改，先暫存起來，拉完再放回去，避免衝突中斷
git pull --rebase --autostash origin "$BRANCH"

if command -v node >/dev/null 2>&1; then
  echo "② 執行自動測試…"
  if ! node tests/verify.js --static; then
    echo "❌ 測試沒通過，已停止上傳。請先修正上面標示 ❌ 的項目。"
    exit 1
  fi
else
  echo "② 找不到 Node.js，略過自動測試（建議安裝：brew install node）"
fi

echo "③ 打包本次修改（git add + commit）…"
git add -A
if git diff --cached --quiet; then
  echo "   沒有新的修改需要上傳。"
else
  git commit -m "$MSG"
fi

echo "④ 上傳到 GitHub（git push）…"
git push origin "$BRANCH"

echo "✅ 完成！約 1 分鐘後網站會更新：https://ruci0515.github.io/toeic/"
