#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Deploy images to F:\V7\public\images\ and update key Astro pages.
Source 1: E:\鑫永恒网站资料\图片\已整理网站素材\01_可直接使用
Source 2: E:\鑫永恒网站资料\图片\产品素材\已整理\01_可直接使用 (already deployed)
Target: F:\V7\public\images\
"""

import os
import shutil
from pathlib import Path

SRC1 = Path("E:/鑫永恒网站资料/图片/已整理网站素材/01_可直接使用")
PUB = Path("F:/V7/public/images")

# Ensure target directories exist
for d in ["company", "products/aluminum", "products/plastic", "products/general",
          "quality", "equipment/gallery", "process"]:
    (PUB / d).mkdir(parents=True, exist_ok=True)

copied = []

def safe_copy(src, dst):
    if not src.exists():
        print(f"  SKIP (not found): {src}")
        return
    if dst.exists():
        print(f"  SKIP (exists): {dst.name}")
        return
    shutil.copy2(src, dst)
    copied.append((str(src), str(dst)))
    print(f"  OK: {dst.name}")

# =============================================================
# 1. Company photos -> public/images/company/
# =============================================================
print("=== Copying company photos ===")
company_map = {
    "company/company-exterior-01.png": "company/company-building-exterior.png",
    "company/company-exterior-02.jpg": "company/company-building-front.jpg",
    "company/company-exterior-03.png": "company/company-building-side.png",
    "company/company-facility-01.jpg": "company/workshop-interior-01.jpg",
    "company/company-facility-02.jpg": "company/workshop-interior-02.jpg",
    "company/company-facility-03.jpg": "company/workshop-interior-03.jpg",
    "company/company-facility-04.png": "company/workshop-interior-04.png",
    "company/company-facility-05.png": "company/workshop-interior-05.png",
    "company/factory-machine-lineup-01.jpg": "company/factory-cnc-machine-lineup.jpg",
    "company/factory-machine-lineup-02.png": "company/factory-machine-rows.png",
    "company/factory-machine-lineup-03.png": "company/factory-workshop-overview.png",
    "company/factory-machine-lineup-04.png": "company/factory-production-floor.png",
}
for src_rel, dst_rel in company_map.items():
    safe_copy(SRC1 / src_rel, PUB / dst_rel)

# =============================================================
# 2. Product photos -> public/images/products/
# =============================================================
print("\n=== Copying aluminum product photos ===")
al_dir = SRC1 / "products" / "aluminum"
for f in sorted(al_dir.iterdir()) if al_dir.exists() else []:
    if f.is_file():
        safe_copy(f, PUB / "products" / "aluminum" / f.name)

print("\n=== Copying plastic product photos ===")
pl_dir = SRC1 / "products" / "plastic"
for f in sorted(pl_dir.iterdir()) if pl_dir.exists() else []:
    if f.is_file():
        safe_copy(f, PUB / "products" / "plastic" / f.name)

print("\n=== Copying general product photos ===")
ge_dir = SRC1 / "products" / "general"
for f in sorted(ge_dir.iterdir()) if ge_dir.exists() else []:
    if f.is_file():
        safe_copy(f, PUB / "products" / "general" / f.name)

# =============================================================
# 3. Quality inspection photos -> public/images/quality/
# =============================================================
print("\n=== Copying quality inspection photos ===")
qa_dir = SRC1 / "quality"
for f in sorted(qa_dir.iterdir()) if qa_dir.exists() else []:
    if f.is_file():
        safe_copy(f, PUB / "quality" / f.name)

# =============================================================
# 4. Equipment closeup gallery (select 12 best) -> public/images/equipment/gallery/
# =============================================================
print("\n=== Copying equipment gallery photos ===")
gallery_selection = [
    "equipment/machines/cnc-5axis-machine-01.png",
    "equipment/machines/cnc-5axis-machine-03.jpg",
    "equipment/machines/cnc-5axis-machine-05.jpg",
    "equipment/machines/cnc-machine-closeup-01.jpg",
    "equipment/machines/cnc-machine-closeup-03.jpg",
    "equipment/machines/cnc-machine-closeup-05.jpg",
    "equipment/machines/cnc-machine-closeup-07.jpg",
    "equipment/machines/cnc-machine-closeup-09.jpg",
    "equipment/machines/cnc-machine-closeup-11.jpg",
    "equipment/machines/cnc-machine-closeup-13.jpg",
    "equipment/machines/cnc-machine-closeup-15.jpg",
    "equipment/machines/equipment-original-01.png",
]
for src_rel in gallery_selection:
    src = SRC1 / src_rel
    dst_name = src.name
    safe_copy(src, PUB / "equipment" / "gallery" / dst_name)

# =============================================================
# 5. Missing nameplates -> public/images/equipment/
# =============================================================
print("\n=== Copying missing nameplates ===")
nameplate_map = {
    "equipment/nameplates/taikan-s956s-nameplate1.jpg": "equipment/equipment-taikan-t500s-nameplate.jpg",
    "equipment/nameplates/xth-t540-nameplate1.jpg": "equipment/equipment-xinthenghui-s40-nameplate.jpg",
}
for src_rel, dst_rel in nameplate_map.items():
    safe_copy(SRC1 / src_rel, PUB / dst_rel)

# =============================================================
# Summary
# =============================================================
print(f"\n=== Deployment Complete: {len(copied)} files copied ===")
print(f"Total images in public/images: {sum(1 for _ in PUB.rglob('*') if _.is_file() and _.suffix in ('.jpg','.png','.webp','.mp4'))}")
