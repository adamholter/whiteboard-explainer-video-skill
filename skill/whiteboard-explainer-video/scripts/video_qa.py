#!/usr/bin/env python3
"""Small, dependency-light release check for rendered videos."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path


def run(*args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(args, check=False, text=True, capture_output=True)


def require(binary: str) -> None:
    if shutil.which(binary) is None:
        raise SystemExit(f"Missing required binary: {binary}")


def probe(path: Path) -> dict:
    result = run(
        "ffprobe", "-v", "error", "-show_format", "-show_streams",
        "-of", "json", str(path),
    )
    if result.returncode:
        raise SystemExit(result.stderr.strip() or "ffprobe failed")
    return json.loads(result.stdout)


def make_contact_sheet(path: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    result = run(
        "ffmpeg", "-y", "-i", str(path),
        "-vf", "fps=1/5,scale=480:-1,tile=4x3:padding=8:margin=8",
        "-frames:v", "1", str(destination),
    )
    if result.returncode:
        print("WARNING: contact sheet failed", file=sys.stderr)
        print(result.stderr[-1200:], file=sys.stderr)


def detect(path: Path, filter_name: str) -> str:
    result = run("ffmpeg", "-hide_banner", "-i", str(path), "-vf", filter_name, "-an", "-f", "null", "-")
    return "\n".join(line for line in result.stderr.splitlines() if "black_" in line)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("video", type=Path)
    parser.add_argument("--contact-sheet", type=Path)
    args = parser.parse_args()
    require("ffprobe")
    require("ffmpeg")
    if not args.video.is_file():
        raise SystemExit(f"Not a file: {args.video}")

    data = probe(args.video)
    video = next((s for s in data["streams"] if s["codec_type"] == "video"), None)
    audio = next((s for s in data["streams"] if s["codec_type"] == "audio"), None)
    duration = float(data["format"].get("duration", 0))
    summary = {
        "file": str(args.video),
        "duration_seconds": round(duration, 3),
        "size_bytes": int(data["format"].get("size", 0)),
        "video": None if video is None else {
            "codec": video.get("codec_name"),
            "width": video.get("width"),
            "height": video.get("height"),
            "pixel_format": video.get("pix_fmt"),
            "frame_rate": video.get("avg_frame_rate"),
        },
        "audio": None if audio is None else {
            "codec": audio.get("codec_name"),
            "sample_rate": audio.get("sample_rate"),
            "channels": audio.get("channels"),
        },
    }
    print(json.dumps(summary, indent=2))
    black = detect(args.video, "blackdetect=d=0.25:pix_th=0.10")
    print("\nBlack-frame events:")
    print(black or "none detected")
    if args.contact_sheet:
        make_contact_sheet(args.video, args.contact_sheet)
        print(f"\nContact sheet: {args.contact_sheet}")
    return 1 if video is None or duration <= 0 else 0


if __name__ == "__main__":
    raise SystemExit(main())
