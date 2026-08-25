#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix: move misclassified equipment photos from company/ to equipment/machines/
The '真实没修改过的图片' folder contained equipment originals that were wrongly
classified as company photos in the first run.
"""

import os
import shutil
from pathlib import Path

DST = Path("E:/鑫永恒网站资料/图片/已整理网站素材")

company_dir = DST / "01_可直接使用" / "company"
equip_dir = DST / "01_可直接使用" / "equipment" / "machines"

# Find all company-real-* files (these came from 真实没修改过的图片)
# company-facility-* came from 公司真实图片 (correct)
# company-exterior-* came from 图片/公司外观 (correct)
# factory-machine-lineup-* came from 图片/工厂机器排列 (correct - could be company or equipment)

moved = 0
for f in sorted(company_dir.iterdir()):
    if not f.is_file():
        continue
    name = f.name
    # Only move company-real-* files (from 真实没修改过的图片 = equipment originals)
    if name.startswith("company-real-"):
        new_name = name.replace("company-real-", "equipment-original-")
        dst = equip_dir / new_name
        # Avoid collision
        if dst.exists():
            continue
        shutil.move(str(f), str(dst))
        moved += 1

print(f"Moved {moved} files from company/ to equipment/machines/")

# Verify final counts
print("\n=== Final counts ===")
for sub in ["company", "equipment/machines", "equipment/nameplates", 
            "products/aluminum", "products/plastic", "products/general",
            "quality", "process", "videos"]:
    d = DST / "01_可直接使用" / sub
    if d.exists():
        count = len([x for x in d.iterdir() if x.is_file()])
        print(f"  01_可直接使用/{sub}: {count} files")

edit_dir = DST / "02_需修改后使用"
discard_dir = DST / "03_不推荐使用"
if edit_dir.exists():
    print(f"  02_需修改后使用: {len([x for x in edit_dir.iterdir() if x.is_file()])} files")
if discard_dir.exists():
    print(f"  03_不推荐使用: {len([x for x in discard_dir.iterdir() if x.is_file()])} files")

total = sum(1 for _ in DST.rglob("*") if _.is_file() and _.name != "_organization_report.csv")
print(f"\nTotal: {total} files")
