#!/usr/bin/env python
"""从视频抽若干关键帧，用于快速判断视频内容（给素材起标题/写描述用）。
用法: python extract-frames.py <视频路径> [帧数]
输出: .workbuddy/frames/f0.jpg ... fn.jpg，并打印时长/分辨率
"""
import os
import re
import subprocess
import sys

OUT_DIR = r"F:\V7\.workbuddy\frames"


def main():
    src = sys.argv[1] if len(sys.argv) > 1 else r"E:\鑫永恒网站资料\社媒视频\视频片段2.mp4"
    n = int(sys.argv[2]) if len(sys.argv) > 2 else 5

    import imageio_ffmpeg
    exe = imageio_ffmpeg.get_ffmpeg_exe()

    os.makedirs(OUT_DIR, exist_ok=True)

    # 读元信息（ffmpeg 把信息写 stderr）
    probe = subprocess.run([exe, "-i", src], capture_output=True, text=True, errors="ignore")
    err = probe.stderr or ""
    dur = None
    m = re.search(r"Duration:\s*(\d+):(\d+):(\d+\.?\d*)", err)
    if m:
        h, mi, s = m.groups()
        dur = int(h) * 3600 + int(mi) * 60 + float(s)
    res = None
    m2 = re.search(r"Stream.*Video:.*,\s*(\d{2,5})x(\d{2,5})", err)
    if m2:
        res = f"{m2.group(1)}x{m2.group(2)}"

    print(f"file={src}")
    print(f"duration={dur}")
    print(f"resolution={res}")

    if not dur:
        print("NO_DURATION_PARSED")
        return

    times = [dur * t for t in [i / (n + 1) for i in range(1, n + 1)]]
    for i, t in enumerate(times):
        out = os.path.join(OUT_DIR, f"f{i}.jpg")
        subprocess.run(
            [exe, "-ss", f"{t:.2f}", "-i", src, "-frames:v", "1", "-q:v", "2", "-y", out],
            capture_output=True,
        )
        print("frame", i, f"{t:.2f}s", out, os.path.exists(out))


if __name__ == "__main__":
    main()
