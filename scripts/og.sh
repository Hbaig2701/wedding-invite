#!/usr/bin/env bash
# Captures the OG preview images from the running dev server (npm run dev).
set -euo pipefail
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="${1:-http://localhost:5173}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/og"
mkdir -p "$OUT"
for EV in shaadi walima; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 --virtual-time-budget=6000 \
    --screenshot="$OUT/$EV.png" "$BASE/og/?event=$EV" 2>/dev/null
  sips -s format jpeg -s formatOptions 82 "$OUT/$EV.png" --out "$OUT/$EV.jpg" >/dev/null
  rm -f "$OUT/$EV.png"
  echo "wrote $OUT/$EV.jpg"
done
