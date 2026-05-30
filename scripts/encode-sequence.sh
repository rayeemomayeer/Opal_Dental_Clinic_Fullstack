#!/usr/bin/env bash
#
# Encode the transparent implant clip into a web-ready WebP frame sequence.
#
# Source: assests/screw_tooth.mov  (qtrle / ARGB, 1920x1080, 24fps, 192 frames, alpha)
# Output: apps/web/public/sequence/frame_0001.webp … frame_0192.webp (1600x900, alpha)
#
# Requires ffmpeg built with libwebp. Run from the repo root:  bash scripts/encode-sequence.sh
set -euo pipefail

SRC="assests/screw_tooth.mov"
OUT="apps/web/public/sequence"
HEIGHT=900          # output frame height in px (width auto, keeps 16:9)
QUALITY=78          # libwebp lossy quality (0-100)

mkdir -p "$OUT"
rm -f "$OUT"/frame_*.webp

ffmpeg -hide_banner -y -i "$SRC" \
  -vf "scale=-1:${HEIGHT}:flags=lanczos" \
  -c:v libwebp -lossless 0 -q:v "${QUALITY}" -compression_level 6 -pix_fmt yuva420p \
  -start_number 1 "$OUT/frame_%04d.webp"

echo "Done: $(ls "$OUT"/*.webp | wc -l) frames in $OUT"
