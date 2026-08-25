#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Website Image Organizer
Source: E:\鑫永恒网站资料\图片
Target: E:\鑫永恒网站资料\图片\已整理网站素材
"""

import os
import shutil
import csv
from pathlib import Path
from collections import defaultdict

SRC = Path("E:/鑫永恒网站资料/图片")
DST = Path("E:/鑫永恒网站资料/图片/已整理网站素材")

# Clean target (but keep 产品素材 organized subfolder if exists)
if DST.exists():
    for item in DST.iterdir():
        if item.name == "产品素材已整理":
            continue
        if item.is_dir():
            shutil.rmtree(item)
        else:
            item.unlink()
else:
    DST.mkdir(parents=True, exist_ok=True)

# Folder structure
folders = [
    "01_可直接使用/company",
    "01_可直接使用/equipment/machines",
    "01_可直接使用/equipment/nameplates",
    "01_可直接使用/products/aluminum",
    "01_可直接使用/products/plastic",
    "01_可直接使用/products/general",
    "01_可直接使用/quality",
    "01_可直接使用/process",
    "01_可直接使用/videos",
    "02_需修改后使用",
    "03_不推荐使用",
]
for f in folders:
    (DST / f).mkdir(parents=True, exist_ok=True)

report = []
counters = defaultdict(int)

def next_name(base, ext):
    counters[base] += 1
    return f"{base}-{counters[base]:02d}{ext}"

def copy_with_report(src, dst, category):
    shutil.copy2(src, dst)
    report.append({
        "Category": category,
        "Source": str(src),
        "Destination": str(dst),
        "SizeBytes": os.path.getsize(src),
    })

# =============================================================
# 1. 设备图片配对 -> equipment
# =============================================================
eq_dir = SRC / "设备图片配对"
if eq_dir.exists():
    for f in sorted(eq_dir.iterdir()):
        if not f.is_file():
            continue
        name = f.name
        lower = name.lower()
        if "铭牌" in name:
            new_name = lower.replace("铭牌", "nameplate")
            sub = "nameplates"
        else:
            # Extract base like JIAFU-JF500-1.jpg -> jiafu-jf500-1.jpg
            new_name = lower
            sub = "machines"
        dst = DST / "01_可直接使用" / "equipment" / sub / new_name
        copy_with_report(f, dst, "equipment")

# =============================================================
# 2. 公司真实图片 -> company
# =============================================================
co_dir = SRC / "公司真实图片"
if co_dir.exists():
    for f in sorted(co_dir.iterdir()):
        if not f.is_file():
            continue
        ext = f.suffix.lower()
        new_name = next_name("company-facility", ext)
        dst = DST / "01_可直接使用" / "company" / new_name
        copy_with_report(f, dst, "company")

# =============================================================
# 3. 图片/公司外观 -> company
# =============================================================
ext_dir = SRC / "图片" / "公司外观"
if ext_dir.exists():
    for f in sorted(ext_dir.iterdir()):
        if not f.is_file():
            continue
        ext = f.suffix.lower()
        new_name = next_name("company-exterior", ext)
        dst = DST / "01_可直接使用" / "company" / new_name
        copy_with_report(f, dst, "company")

# =============================================================
# 4. 图片/工厂机器排列 -> company
# =============================================================
arr_dir = SRC / "图片" / "工厂机器排列"
if arr_dir.exists():
    for f in sorted(arr_dir.iterdir()):
        if not f.is_file():
            continue
        ext = f.suffix.lower()
        new_name = next_name("factory-machine-lineup", ext)
        dst = DST / "01_可直接使用" / "company" / new_name
        copy_with_report(f, dst, "company")

# =============================================================
# 5. 图片/单机特写 -> equipment/machines
# =============================================================
single_dir = SRC / "图片" / "单机特写"
if single_dir.exists():
    for f in sorted(single_dir.iterdir()):
        if not f.is_file():
            continue
        ext = f.suffix.lower()
        new_name = next_name("cnc-machine-closeup", ext)
        dst = DST / "01_可直接使用" / "equipment" / "machines" / new_name
        copy_with_report(f, dst, "equipment")

# =============================================================
# 6. 图片/新五轴 -> equipment/machines
# =============================================================
axis_dir = SRC / "图片" / "新五轴"
if axis_dir.exists():
    for f in sorted(axis_dir.iterdir()):
        if not f.is_file():
            continue
        ext = f.suffix.lower()
        new_name = next_name("cnc-5axis-machine", ext)
        dst = DST / "01_可直接使用" / "equipment" / "machines" / new_name
        copy_with_report(f, dst, "equipment")

# =============================================================
# 7. 图片/质检机 -> quality
# =============================================================
qa_dir = SRC / "图片" / "质检机"
if qa_dir.exists():
    for f in sorted(qa_dir.iterdir()):
        if not f.is_file():
            continue
        ext = f.suffix.lower()
        new_name = next_name("quality-inspection-machine", ext)
        dst = DST / "01_可直接使用" / "quality" / new_name
        copy_with_report(f, dst, "quality")

# =============================================================
# 8. 铝件产品 -> products/aluminum
# =============================================================
al_dir = SRC / "铝件产品"
if al_dir.exists():
    for f in sorted(al_dir.iterdir()):
        if not f.is_file():
            continue
        ext = f.suffix.lower()
        new_name = next_name("cnc-aluminum-part", ext)
        dst = DST / "01_可直接使用" / "products" / "aluminum" / new_name
        copy_with_report(f, dst, "products_aluminum")

# =============================================================
# 9. 塑料产品 -> products/plastic
# =============================================================
pl_dir = SRC / "塑料产品"
if pl_dir.exists():
    for f in sorted(pl_dir.iterdir()):
        if not f.is_file():
            continue
        ext = f.suffix.lower()
        new_name = next_name("cnc-plastic-part", ext)
        dst = DST / "01_可直接使用" / "products" / "plastic" / new_name
        copy_with_report(f, dst, "products_plastic")

# =============================================================
# 10. 图片/产品 -> products/general
# =============================================================
prod_dir = SRC / "图片" / "产品"
if prod_dir.exists():
    for f in sorted(prod_dir.iterdir()):
        if not f.is_file():
            continue
        ext = f.suffix.lower()
        new_name = next_name("precision-machined-part", ext)
        dst = DST / "01_可直接使用" / "products" / "general" / new_name
        copy_with_report(f, dst, "products_general")

# =============================================================
# 11. 零部件图片 -> 02 需修改后使用 (WeChat names likely have watermark)
# =============================================================
part_dir = SRC / "零部件图片"
if part_dir.exists():
    for f in sorted(part_dir.iterdir()):
        if not f.is_file():
            continue
        ext = f.suffix.lower()
        new_name = next_name("cnc-machined-component", ext)
        dst = DST / "02_需修改后使用" / new_name
        copy_with_report(f, dst, "edit")

# =============================================================
# 12. 三坐标 -> 03 不推荐使用 (web downloaded)
# =============================================================
cmm_dir = SRC / "三坐标"
if cmm_dir.exists():
    for f in sorted(cmm_dir.iterdir()):
        if not f.is_file():
            continue
        dst = DST / "03_不推荐使用" / f.name
        copy_with_report(f, dst, "discard")

# =============================================================
# 13. 五轴视频 -> videos (ready but needs compression)
# =============================================================
vid_dir = SRC / "五轴视频"
if vid_dir.exists():
    for f in sorted(vid_dir.iterdir()):
        if not f.is_file():
            continue
        ext = f.suffix.lower()
        new_name = f"cnc-5axis-machining-demo{ext}"
        dst = DST / "01_可直接使用" / "videos" / new_name
        copy_with_report(f, dst, "videos")

# =============================================================
# 14. 真实没修改过的图片 -> mostly equipment originals
# =============================================================
real_dir = SRC / "真实没修改过的图片"
if real_dir.exists():
    for f in sorted(real_dir.iterdir()):
        if not f.is_file():
            continue
        name = f.name.lower()
        ext = f.suffix.lower()
        if ext in (".mp4", ".mov", ".avi"):
            new_name = f"factory-tour-video{ext}"
            dst = DST / "01_可直接使用" / "videos" / new_name
            copy_with_report(f, dst, "videos")
        elif any(k in name for k in ("dmu400", "sunrise", "wh-540", "lu400")):
            base = "dmu400" if "dmu400" in name else ("sunrise" if "sunrise" in name else ("wh-540" if "wh-540" in name else "lu400"))
            new_name = f"equipment-{base}{ext}"
            dst = DST / "01_可直接使用" / "equipment" / "machines" / new_name
            copy_with_report(f, dst, "equipment")
        elif name.startswith("图片1") or name.startswith("pic"):
            # Likely company/facility overview image
            new_name = next_name("company-real", ext)
            dst = DST / "01_可直接使用" / "company" / new_name
            copy_with_report(f, dst, "company")
        else:
            # Equipment originals (machines and nameplates)
            new_name = next_name("equipment-original", ext)
            dst = DST / "01_可直接使用" / "equipment" / "machines" / new_name
            copy_with_report(f, dst, "equipment")

# =============================================================
# Summary
# =============================================================
print("=== Organization Complete ===")
print(f"Total files processed: {len(report)}")
print("")
print("By category:")
summary = defaultdict(lambda: {"count": 0, "size": 0})
for row in report:
    summary[row["Category"]]["count"] += 1
    summary[row["Category"]]["size"] += row["SizeBytes"]

for cat in sorted(summary.keys()):
    info = summary[cat]
    print(f"  {cat}: {info['count']} files ({info['size']/1024/1024:.2f} MB)")

# Save report
report_path = DST / "_organization_report.csv"
with open(report_path, "w", newline="", encoding="utf-8-sig") as cf:
    writer = csv.DictWriter(cf, fieldnames=["Category", "Source", "Destination", "SizeBytes"])
    writer.writeheader()
    writer.writerows(report)

print(f"\nReport saved to: {report_path}")
