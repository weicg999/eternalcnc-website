#!/usr/bin/env python3
"""指令B：将 picked.json 中的 A 级图按 slot 目标尺寸裁切压缩为 WebP。

用法（使用隔离 venv）：
    C:/Users/Administrator/.workbuddy/binaries/python/envs/default/Scripts/python.exe F:/V7/scripts/process_images.py
"""
import json
import os
from pathlib import Path
from PIL import Image

SRC_DIR = Path("E:/鑫永恒网站资料/图片/真实没修改过的图片")
OUT_ROOT = Path("F:/V7/public/images")
PICKED_JSON = Path("F:/V7/scripts/picked.json")
REPORT_JSON = Path("F:/V7/scripts/processed.json")

# slot 配置：目标尺寸、WebP 质量、体积上限(KB)、文件命名前缀、输出子目录
SLOT_CONFIG = {
    "equipment-hero": {
        "size": (1200, 800),
        "quality": 80,
        "max_kb": 220,
        "prefix": "eq",
        "subdir": "equipment-hero",
    },
    "equipment-detail": {
        "size": (800, 600),
        "quality": 78,
        "max_kb": 140,
        "prefix": "eqdt",
        "subdir": "equipment-detail",
    },
    "product": {
        "size": (1000, 1000),
        "quality": 80,
        "max_kb": 180,
        "prefix": "prod",
        "subdir": "product",
    },
    "process": {
        "size": (1200, 800),
        "quality": 78,
        "max_kb": 200,
        "prefix": "proc",
        "subdir": "process",
    },
    "workshop": {
        "size": (1920, 720),
        "quality": 82,
        "max_kb": 260,
        "prefix": "ws",
        "subdir": "workshop",
    },
    "team": {
        "size": (1200, 800),
        "quality": 78,
        "max_kb": 200,
        "prefix": "team",
        "subdir": "team",
    },
}


def center_crop_resize(img: Image.Image, target_size: tuple[int, int]) -> Image.Image:
    """按目标宽高比居中裁切，再缩放到目标尺寸，保持主体完整不拉伸。"""
    tw, th = target_size
    tr = tw / th
    iw, ih = img.size
    ir = iw / ih

    if ir > tr:
        # 原图太宽，裁左右
        new_w = int(ih * tr)
        left = (iw - new_w) // 2
        img = img.crop((left, 0, left + new_w, ih))
    elif ir < tr:
        # 原图太高，裁上下
        new_h = int(iw / tr)
        top = (ih - new_h) // 2
        img = img.crop((0, top, iw, top + new_h))

    return img.resize((tw, th), Image.Resampling.LANCZOS)


def save_under_limit(img: Image.Image, out_path: Path, quality: int, max_kb: int) -> int:
    """保存 WebP，若超出体积上限则逐步降低质量直到满足。返回最终 quality。"""
    max_bytes = max_kb * 1024
    q = quality
    while q >= 50:
        img.save(out_path, "WEBP", quality=q, method=6)
        size = out_path.stat().st_size
        if size <= max_bytes:
            return q
        q -= 5
    # 最低质量仍超限也保留，但记录警告
    return q


def sanitize_subject(subject: str) -> str:
    return subject.lower().replace(" ", "-").replace("_", "-")


def main() -> None:
    with open(PICKED_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)

    processed = []
    counters: dict[str, int] = {}

    for item in data["picked"]:
        slot = item["slot"]
        cfg = SLOT_CONFIG.get(slot)
        if not cfg:
            print(f"[SKIP] unknown slot: {slot}")
            continue

        src = SRC_DIR / item["source"]
        if not src.exists():
            print(f"[SKIP] source missing: {src}")
            continue

        subj = sanitize_subject(item["subject"])
        counters.setdefault((slot, subj), 0)
        counters[(slot, subj)] += 1
        idx = counters[(slot, subj)]
        filename = f"{cfg['prefix']}-{subj}-{idx:02d}.webp"

        out_dir = OUT_ROOT / cfg["subdir"]
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / filename

        with Image.open(src) as img:
            # 处理可能的旋转信息
            img = img.convert("RGB")
            cropped = center_crop_resize(img, cfg["size"])
            final_q = save_under_limit(cropped, out_path, cfg["quality"], cfg["max_kb"])

        size_kb = out_path.stat().st_size / 1024
        print(
            f"[OK] {filename} -> {cfg['subdir']}/ "
            f"({cfg['size'][0]}x{cfg['size'][1]} q={final_q} {size_kb:.1f}KB)"
        )

        processed.append(
            {
                "slot": slot,
                "subject": item["subject"],
                "angle": item["angle"],
                "source": item["source"],
                "output": f"/images/{cfg['subdir']}/{filename}",
                "output_abs": str(out_path),
                "size": cfg["size"],
                "quality": final_q,
                "kb": round(size_kb, 2),
            }
        )

    with open(REPORT_JSON, "w", encoding="utf-8") as f:
        json.dump({"processed": processed}, f, ensure_ascii=False, indent=2)

    print(f"\nDone. {len(processed)} images processed. Report: {REPORT_JSON}")


if __name__ == "__main__":
    main()
