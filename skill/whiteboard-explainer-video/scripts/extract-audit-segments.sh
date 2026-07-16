#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 || $# -gt 4 ]]; then
  echo "usage: $0 VIDEO OUTPUT_DIR [SEGMENTS=10] [SAMPLE_SECONDS=1]" >&2
  exit 2
fi

video=$1
output=$2
segments=${3:-10}
sample_seconds=${4:-1}

command -v ffmpeg >/dev/null
command -v ffprobe >/dev/null
[[ -f "$video" ]] || { echo "video not found: $video" >&2; exit 2; }
[[ "$segments" =~ ^[1-9][0-9]*$ ]] || { echo "SEGMENTS must be a positive integer" >&2; exit 2; }

duration=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$video")
segment_duration=$(awk -v d="$duration" -v n="$segments" 'BEGIN {printf "%.6f", d/n}')
fps=$(awk -v s="$sample_seconds" 'BEGIN {printf "%.8f", 1/s}')
mkdir -p "$output"

for ((i=0; i<segments; i++)); do
  start=$(awk -v i="$i" -v d="$segment_duration" 'BEGIN {printf "%.6f", i*d}')
  dir="$output/segment-$i"
  mkdir -p "$dir"
  ffmpeg -loglevel error -y -i "$video" -ss "$start" -t "$segment_duration" \
    -vf "fps=$fps,scale=1920:-2" -q:v 2 "$dir/frame-%03d.jpg"
  ffmpeg -loglevel error -y -i "$video" -ss "$start" -t "$segment_duration" \
    -vf "fps=$fps,scale=480:-2,tile=4x4:padding=6:margin=6" -frames:v 1 "$dir/contact.jpg"
  printf '{"segment":%d,"start":%s,"duration":%s}\n' "$i" "$start" "$segment_duration" > "$dir/range.json"
done

echo "Wrote $segments isolated review ranges to $output"
