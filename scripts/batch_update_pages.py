#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Batch update Astro pages with new images.
- Equipment page: add gallery section
- Case sub-pages: add product photo galleries
- Capabilities pages: add process/quality images
- Fix any remaining broken image references
"""

import re
from pathlib import Path

PAGES = Path("F:/V7/src/pages")
updates = []

def read_file(p):
    with open(p, "r", encoding="utf-8-sig") as f:
        return f.read()

def write_file(p, content):
    with open(p, "w", encoding="utf-8-sig") as f:
        f.write(content)

# =============================================================
# 1. Fix broken image references across all pages
# =============================================================
print("=== Fixing broken image references ===")
broken_refs = {
    "/images/hero-workshop.jpg": "/images/company/factory-cnc-machine-lineup.jpg",
    "/images/hands-caliper.jpg": "/images/company/workshop-interior-01.jpg",
    "/images/team-workshop.jpg": "/images/company/workshop-interior-03.jpg",
    "/images/precision-parts.jpg": "/images/products/aluminum/cnc-aluminum-part-01.jpg",
    "/images/Lu400.png": "/images/equipment/equipment-sunrise-dmu400-5axis-hero.jpg",
    "/images/large-cnc-machine.jpg": "/images/equipment/gallery/cnc-machine-closeup-01.jpg",
    "/images/mazak-5axis-integrex.jpg": "/images/equipment/gallery/cnc-5axis-machine-01.png",
    "/images/cnc-5axis-automation.jpg": "/images/equipment/gallery/cnc-5axis-machine-03.jpg",
}

for astro in PAGES.rglob("*.astro"):
    content = read_file(astro)
    changed = False
    for old, new in broken_refs.items():
        if old in content:
            content = content.replace(old, new)
            changed = True
    if changed:
        write_file(astro, content)
        updates.append(f"FIXED: {astro.relative_to(PAGES)}")
        print(f"  FIXED: {astro.relative_to(PAGES)}")

# =============================================================
# 2. Equipment page (EN) - add gallery section before CTA
# =============================================================
print("\n=== Updating Equipment page EN ===")
eq_page = PAGES / "capabilities" / "equipment" / "index.astro"
if eq_page.exists():
    content = read_file(eq_page)
    # Check if gallery already exists
    if "equipment-gallery" not in content and "<!-- Equipment Gallery" not in content:
        gallery_html = """
  <!-- Equipment Gallery -->
  <section class="section-padding" style="background-color: var(--page-bg);">
    <div class="container-custom">
      <div class="text-center mb-14">
        <span class="red-line mx-auto"></span>
        <h2 class="text-3xl font-bold" style="color: var(--brand-dark);">Inside Our Machine Shop</h2>
        <p class="mt-4 text-lg" style="color: var(--text-muted);">A glimpse of our CNC equipment in action.</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-5axis-machine-01.png" alt="5-axis CNC machining center close up" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-machine-closeup-01.jpg" alt="CNC vertical machining center" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-5axis-machine-03.jpg" alt="5-axis CNC machine spindle in operation" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-machine-closeup-03.jpg" alt="CNC machining center control panel" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-machine-closeup-05.jpg" alt="CNC machine spindle detail" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-5axis-machine-05.jpg" alt="5-axis CNC trunnion table" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-machine-closeup-07.jpg" alt="CNC machining center side view" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-machine-closeup-09.jpg" alt="Vertical CNC mill machine" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
      </div>
    </div>
  </section>

"""
        # Insert before CTA section
        cta_match = re.search(r'(\s*<!-- CTA)', content)
        if cta_match:
            pos = cta_match.start()
            content = content[:pos] + gallery_html + content[pos:]
        else:
            content += gallery_html
        write_file(eq_page, content)
        updates.append(f"UPDATED: equipment EN gallery")
        print("  OK: Added equipment gallery")

# =============================================================
# 3. Equipment page (ZH) - add gallery section
# =============================================================
print("\n=== Updating Equipment page ZH ===")
eq_zh = PAGES / "zh" / "capabilities" / "equipment" / "index.astro"
if eq_zh.exists():
    content = read_file(eq_zh)
    if "设备画廊" not in content and "Equipment Gallery" not in content:
        gallery_zh = """
  <!-- 设备画廊 -->
  <section class="section-padding" style="background-color: var(--page-bg);">
    <div class="container-custom">
      <div class="text-center mb-14">
        <span class="red-line mx-auto"></span>
        <h2 class="text-3xl font-bold" style="color: var(--brand-dark);">车间设备实拍</h2>
        <p class="mt-4 text-lg" style="color: var(--text-muted);">CNC设备实景一览。</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-5axis-machine-01.png" alt="五轴CNC加工中心特写" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-machine-closeup-01.jpg" alt="CNC立式加工中心" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-5axis-machine-03.jpg" alt="五轴CNC主轴加工中" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-machine-closeup-03.jpg" alt="CNC加工中心控制面板" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-machine-closeup-05.jpg" alt="CNC主轴细节" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-5axis-machine-05.jpg" alt="五轴转台" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-machine-closeup-07.jpg" alt="CNC加工中心侧视" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-machine-closeup-09.jpg" alt="立式CNC铣床" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>
      </div>
    </div>
  </section>

"""
        cta_match = re.search(r'(\s*<!-- CTA|<!-- 联系我们|<!-- 获取报价)', content)
        if cta_match:
            pos = cta_match.start()
            content = content[:pos] + gallery_zh + content[pos:]
        else:
            content += gallery_zh
        write_file(eq_zh, content)
        updates.append(f"UPDATED: equipment ZH gallery")
        print("  OK: Added equipment gallery (ZH)")

# =============================================================
# 4. Case sub-pages - add product photo galleries
# =============================================================
print("\n=== Updating case sub-pages ===")
case_galleries = {
    "cases/electronics/index.astro": {
        "title": "Electronics Machining Gallery",
        "title_zh": None,
        "images": [
            ("/images/products/aluminum/cnc-aluminum-part-01.jpg", "CNC machined aluminum electronic component"),
            ("/images/products/aluminum/cnc-aluminum-part-03.jpg", "Precision aluminum housing for electronics"),
            ("/images/products/aluminum/cnc-aluminum-part-05.jpg", "Anodized aluminum electronic part"),
            ("/images/products/aluminum/cnc-aluminum-part-07.jpg", "Custom aluminum electronic enclosure"),
            ("/images/products/aluminum/cnc-aluminum-part-09.jpg", "CNC milled aluminum component"),
            ("/images/products/aluminum/cnc-aluminum-part-11.jpg", "Precision machined aluminum part"),
        ]
    },
    "cases/medical/index.astro": {
        "title": "Medical Machining Gallery",
        "title_zh": None,
        "images": [
            ("/images/products/aluminum/cnc-aluminum-part-02.jpg", "CNC machined medical aluminum component"),
            ("/images/products/aluminum/cnc-aluminum-part-04.jpg", "Precision medical device part"),
            ("/images/products/plastic/cnc-plastic-part-01.jpg", "Medical plastic machined component"),
            ("/images/products/plastic/cnc-plastic-part-03.jpg", "CNC milled plastic medical part"),
            ("/images/products/general/precision-machined-part-01.jpg", "Precision turned medical component"),
            ("/images/products/general/precision-machined-part-03.jpg", "Micro machined medical part"),
        ]
    },
    "cases/prototype/index.astro": {
        "title": "Prototype Gallery",
        "title_zh": None,
        "images": [
            ("/images/products/aluminum/cnc-aluminum-part-06.jpg", "CNC prototyping aluminum part"),
            ("/images/products/aluminum/cnc-aluminum-part-08.jpg", "Rapid prototype aluminum component"),
            ("/images/products/general/precision-machined-part-02.jpg", "Precision prototype part"),
            ("/images/products/general/precision-machined-part-04.jpg", "CNC prototype machined component"),
            ("/images/products/aluminum/cnc-aluminum-part-10.jpg", "Prototype aluminum housing"),
            ("/images/products/plastic/cnc-plastic-part-02.jpg", "Plastic prototype part"),
        ]
    },
    "cases/mass-production/index.astro": {
        "title": "Mass Production Gallery",
        "title_zh": None,
        "images": [
            ("/images/products/aluminum/cnc-aluminum-part-12.jpg", "Mass produced CNC aluminum parts batch"),
            ("/images/products/aluminum/cnc-aluminum-part-14.jpg", "Aluminum components batch production"),
            ("/images/products/aluminum/cnc-aluminum-part-16.jpg", "CNC machined parts production run"),
            ("/images/products/aluminum/cnc-aluminum-part-18.jpg", "Aluminum production parts"),
            ("/images/products/plastic/cnc-plastic-part-04.jpg", "Plastic mass production parts"),
            ("/images/products/plastic/cnc-plastic-part-06.jpg", "Batch produced plastic components"),
        ]
    },
    "cases/turning/index.astro": {
        "title": "CNC Turning Gallery",
        "title_zh": None,
        "images": [
            ("/images/products/general/precision-machined-part-05.jpg", "CNC turned precision component"),
            ("/images/products/general/precision-machined-part-06.jpg", "Turned metal part"),
            ("/images/products/aluminum/cnc-aluminum-part-13.jpg", "CNC turned aluminum part"),
            ("/images/products/aluminum/cnc-aluminum-part-15.jpg", "Turned aluminum component"),
            ("/images/products/aluminum/cnc-aluminum-part-17.jpg", "Precision turned aluminum shaft"),
            ("/images/products/aluminum/cnc-aluminum-part-19.jpg", "CNC lathe aluminum part"),
        ]
    },
    "cases/5-axis/index.astro": {
        "title": "5-Axis Machining Gallery",
        "title_zh": None,
        "images": [
            ("/images/equipment/gallery/cnc-5axis-machine-01.png", "5-axis CNC machining center"),
            ("/images/equipment/gallery/cnc-5axis-machine-03.jpg", "5-axis machine spindle operation"),
            ("/images/equipment/gallery/cnc-5axis-machine-05.jpg", "5-axis trunnion table"),
            ("/images/products/aluminum/cnc-aluminum-part-20.jpg", "5-axis machined complex aluminum part"),
            ("/images/products/aluminum/cnc-aluminum-part-03.jpg", "5-axis milled aluminum component"),
            ("/images/equipment/gallery/cnc-machine-closeup-11.jpg", "5-axis CNC close-up detail"),
        ]
    },
}

for page_rel, config in case_galleries.items():
    page_path = PAGES / page_rel
    if not page_path.exists():
        print(f"  SKIP (not found): {page_rel}")
        continue
    content = read_file(page_path)
    if "Product Gallery" in content or "产品画廊" in content:
        print(f"  SKIP (already has gallery): {page_rel}")
        continue

    imgs_html = "\n".join([
        f'        <div class="rounded-industrial overflow-hidden aspect-square">\n'
        f'          <img src="{src}" alt="{alt}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />\n'
        f'        </div>'
        for src, alt in config["images"]
    ])

    gallery = f"""
  <!-- Product Gallery -->
  <section class="section-padding" style="background-color: var(--page-bg);">
    <div class="container-custom">
      <div class="text-center mb-14">
        <span class="red-line mx-auto"></span>
        <h2 class="text-3xl font-bold" style="color: var(--brand-dark);">{config['title']}</h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
{imgs_html}
      </div>
    </div>
  </section>

"""
    # Insert before CTA
    cta_match = re.search(r'(\s*<!-- CTA|<!-- Related|<!-- Contact)', content)
    if cta_match:
        pos = cta_match.start()
        content = content[:pos] + gallery + content[pos:]
    else:
        content += gallery
    write_file(page_path, content)
    updates.append(f"UPDATED: {page_rel}")
    print(f"  OK: {page_rel}")

# =============================================================
# 5. Capabilities/quality page - add quality images
# =============================================================
print("\n=== Updating capabilities pages ===")
tol_page = PAGES / "capabilities" / "tolerance" / "index.astro"
if tol_page.exists():
    content = read_file(tol_page)
    if "quality-inspection-machine" not in content:
        qa_gallery = """
  <!-- Quality Inspection -->
  <section class="section-padding" style="background-color: var(--card-white);">
    <div class="container-custom">
      <div class="text-center mb-14">
        <span class="red-line mx-auto"></span>
        <h2 class="text-3xl font-bold" style="color: var(--brand-dark);">Inspection Equipment</h2>
        <p class="mt-4 text-lg" style="color: var(--text-muted);">Precision measurement you can trust.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="rounded-industrial overflow-hidden">
          <img src="/images/quality/quality-inspection-machine-01.jpg" alt="CMM coordinate measuring machine for precision inspection" class="w-full h-64 object-cover" loading="lazy" width="600" height="256" />
        </div>
        <div class="rounded-industrial overflow-hidden">
          <img src="/images/quality/quality-inspection-machine-02.png" alt="Quality inspection equipment at Eternal CNC" class="w-full h-64 object-cover" loading="lazy" width="600" height="256" />
        </div>
        <div class="rounded-industrial overflow-hidden">
          <img src="/images/quality/quality-inspection-machine-03.png" alt="Precision measurement instruments" class="w-full h-64 object-cover" loading="lazy" width="600" height="256" />
        </div>
      </div>
    </div>
  </section>

"""
        cta_match = re.search(r'(\s*<!-- CTA)', content)
        if cta_match:
            pos = cta_match.start()
            content = content[:pos] + qa_gallery + content[pos:]
        write_file(tol_page, content)
        updates.append("UPDATED: capabilities/tolerance")
        print("  OK: capabilities/tolerance")

# =============================================================
# Summary
# =============================================================
print(f"\n=== Batch Update Complete: {len(updates)} pages updated ===")
for u in updates:
    print(f"  {u}")
