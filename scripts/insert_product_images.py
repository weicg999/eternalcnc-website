#!/usr/bin/env python3
"""Batch insert product image showcase sections into industry and service pages."""

import os
import re

BASE = r"F:\V7\src\pages"

# Define image sections for each page
# Each entry: (file_path, search_pattern, replacement_with_image_section)

def make_image_section(title, subtitle, images, bg_var="--page-bg"):
    """Generate an HTML image showcase section."""
    cards = []
    for img_path, alt_text, caption in images:
        cards.append(f'''        <div class="group overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style="border-color: var(--border-color);">
          <img src="{img_path}" alt="{alt_text}" width="400" height="300" loading="lazy" class="w-full h-48 object-cover" />
          <div class="p-3"><p class="text-xs font-medium" style="color: var(--brand-dark);">{caption}</p></div>
        </div>''')
    
    cards_html = "\n".join(cards)
    return f'''  <!-- Product Showcase -->
  <section style="background-color: var({bg_var}); padding: 80px 0;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-sm font-semibold uppercase tracking-wider mb-2" style="color: var(--brand-red);">Product Showcase</p>
      <h2 class="text-3xl font-bold mb-4" style="color: var(--brand-dark);">{title}</h2>
      <p class="mb-12 max-w-2xl" style="color: var(--text-muted);">
        {subtitle}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
{cards_html}
      </div>
    </div>
  </section>

'''

# EN Industry pages
pages_config = {
    # Automotive - add between Capabilities and Quality
    r"industries\automotive\index.astro": {
        "insert_before": "  <!-- Quality -->",
        "section": make_image_section(
            "Automotive Parts Gallery",
            "Real automotive CNC machined parts from our workshop — complex housings, brackets, and structural components.",
            [
                ("/images/cases/automotive/complex-aluminum-housings-01.jpg", "Complex CNC machined aluminum housings for automotive", "Complex Aluminum Housings"),
                ("/images/cases/automotive/complex-aluminum-housings-02.jpg", "Aluminum alloy housings CNC machined multiple angles", "Housings Side View"),
                ("/images/cases/automotive/complex-aluminum-housings-03.jpg", "Precision aluminum automotive parts batch", "Automotive Parts Batch"),
                ("/images/cases/automotive/complex-casting-parts-showcase.jpg", "Complex casting parts CNC machined for automotive", "Casting Parts"),
            ]
        )
    },
    # Robotics
    r"industries\robotics\index.astro": {
        "insert_before": "  <!-- Quality -->",
        "section": make_image_section(
            "Robotics Parts Gallery",
            "Custom CNC machined brackets, mounts, and structural parts for robotics and automation systems.",
            [
                ("/images/cases/robotics/custom-aluminum-brackets-01.jpg", "Custom CNC machined aluminum brackets for robotics", "Custom Brackets"),
                ("/images/cases/robotics/custom-aluminum-brackets-02.jpg", "Aluminum mounting brackets CNC machined", "Mounting Brackets"),
                ("/images/cases/robotics/custom-aluminum-brackets-03.jpg", "Precision aluminum structural parts for robots", "Structural Parts"),
                ("/images/cases/precision/precision-aluminum-components-01.jpg", "Precision aluminum components for motion control", "Precision Components"),
            ]
        )
    },
    # Energy
    r"industries\energy\index.astro": {
        "insert_before": "  <!-- Quality -->",
        "section": make_image_section(
            "Energy Parts Gallery",
            "Aluminum enclosures and precision components for energy and power systems.",
            [
                ("/images/cases/energy/aluminum-enclosure-batch-production.jpg", "Aluminum enclosure batch production for energy systems", "Aluminum Enclosures"),
                ("/images/cases/large-parts/large-aluminum-plate-machining.jpg", "Large aluminum plate CNC machining for energy", "Large Plate Machining"),
                ("/images/cases/precision/precision-aluminum-components-02.jpg", "Precision aluminum components for energy equipment", "Precision Components"),
                ("/images/cases/automotive/complex-casting-parts-showcase.jpg", "Complex machined parts for energy applications", "Complex Parts"),
            ]
        )
    },
    # Quality Inspection service
    r"services\quality-inspection.astro": {
        "insert_before": "  <!-- Quality -->",
        "section": make_image_section(
            "Inspection in Action",
            "Real inspection scenes from our quality lab — precision measurement of machined parts.",
            [
                ("/images/quality/hand-held-micromachined-part-showcase.jpg", "Quality inspection of micromachined precision part", "Micromachined Part Inspection"),
                ("/images/quality/hand-held-micromachined-part-showcase2.jpg", "Precision measurement with TESA measuring equipment", "TESA Measurement"),
                ("/images/cases/screws-batch/finished-part-showcase.jpg", "Finished CNC machined screw part detail", "Finished Part Detail"),
                ("/images/cases/screws-batch/cnc-machined-screw-batch-showcase.jpg", "Batch of CNC machined screws quality checked", "Screw Batch QC"),
            ],
            bg_var="--card-white"
        )
    },
}

# ZH versions - mirror with Chinese text
zh_pages_config = {
    r"zh\cases\index.astro": None,  # Will handle separately
}

def insert_section(filepath, insert_before, section_text):
    """Insert a section before the given marker in the file."""
    full_path = os.path.join(BASE, filepath)
    
    if not os.path.exists(full_path):
        print(f"SKIP (not found): {filepath}")
        return False
    
    with open(full_path, 'r', encoding='utf-8-sig') as f:
        content = f.read()
    
    if insert_before in content:
        # Check if already has Product Showcase
        if "Product Showcase" in content or "产品展示" in content:
            print(f"SKIP (already has showcase): {filepath}")
            return False
        
        content = content.replace(insert_before, section_text + insert_before)
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"OK: {filepath}")
        return True
    else:
        # Try alternate markers
        alt_markers = ["  <!-- Standards -->", "  <!-- CTA -->"]
        for alt in alt_markers:
            if alt in content:
                if "Product Showcase" in content:
                    print(f"SKIP (already has showcase): {filepath}")
                    return False
                content = content.replace(alt, section_text + alt)
                with open(full_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"OK (alt marker): {filepath}")
                return True
        print(f"SKIP (marker not found): {filepath}")
        return False

# Process EN pages
print("=== EN Pages ===")
for filepath, config in pages_config.items():
    insert_section(filepath, config["insert_before"], config["section"])

# Process ZH industry pages (mirror with Chinese text)
print("\n=== ZH Industry Pages ===")

def make_zh_image_section(title, subtitle, images, bg_var="--page-bg"):
    """Generate a Chinese HTML image showcase section."""
    cards = []
    for img_path, alt_text, caption in images:
        cards.append(f'''        <div class="group overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style="border-color: var(--border-color);">
          <img src="{img_path}" alt="{alt_text}" width="400" height="300" loading="lazy" class="w-full h-48 object-cover" />
          <div class="p-3"><p class="text-xs font-medium" style="color: var(--brand-dark);">{caption}</p></div>
        </div>''')
    
    cards_html = "\n".join(cards)
    return f'''  <!-- 产品展示 -->
  <section style="background-color: var({bg_var}); padding: 80px 0;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-sm font-semibold uppercase tracking-wider mb-2" style="color: var(--brand-red);">产品展示</p>
      <h2 class="text-3xl font-bold mb-4" style="color: var(--brand-dark);">{title}</h2>
      <p class="mb-12 max-w-2xl" style="color: var(--text-muted);">
        {subtitle}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
{cards_html}
      </div>
    </div>
  </section>

'''

zh_configs = {
    r"zh\industries\automotive\index.astro": {
        "insert_before": "  <!-- Quality -->",
        "section": make_zh_image_section(
            "汽车零件展示",
            "来自车间的真实汽车CNC加工零件——复杂壳体、支架、结构件。",
            [
                ("/images/cases/automotive/complex-aluminum-housings-01.jpg", "CNC加工复杂铝合金汽车壳体", "复杂铝合金壳体"),
                ("/images/cases/automotive/complex-aluminum-housings-02.jpg", "铝合金壳体多角度CNC加工", "壳体侧视图"),
                ("/images/cases/automotive/complex-aluminum-housings-03.jpg", "精密铝汽车零件批量", "汽车零件批量"),
                ("/images/cases/automotive/complex-casting-parts-showcase.jpg", "汽车复杂铸造零件CNC加工", "铸造零件"),
            ]
        )
    },
    r"zh\industries\robotics\index.astro": {
        "insert_before": "  <!-- Quality -->",
        "section": make_zh_image_section(
            "机器人零件展示",
            "定制CNC加工支架、安装件和结构件，用于机器人和自动化系统。",
            [
                ("/images/cases/robotics/custom-aluminum-brackets-01.jpg", "机器人定制CNC加工铝支架", "定制支架"),
                ("/images/cases/robotics/custom-aluminum-brackets-02.jpg", "铝安装支架CNC加工", "安装支架"),
                ("/images/cases/robotics/custom-aluminum-brackets-03.jpg", "机器人精密铝结构件", "结构件"),
                ("/images/cases/precision/precision-aluminum-components-01.jpg", "运动控制精密铝组件", "精密组件"),
            ]
        )
    },
    r"zh\industries\energy\index.astro": {
        "insert_before": "  <!-- Quality -->",
        "section": make_zh_image_section(
            "能源零件展示",
            "铝外壳和精密组件，用于能源和电力系统。",
            [
                ("/images/cases/energy/aluminum-enclosure-batch-production.jpg", "能源系统铝外壳批量生产", "铝外壳"),
                ("/images/cases/large-parts/large-aluminum-plate-machining.jpg", "大型铝板CNC加工", "大板加工"),
                ("/images/cases/precision/precision-aluminum-components-02.jpg", "能源设备精密铝组件", "精密组件"),
                ("/images/cases/automotive/complex-casting-parts-showcase.jpg", "能源应用复杂加工件", "复杂零件"),
            ]
        )
    },
}

for filepath, config in zh_configs.items():
    insert_section(filepath, config["insert_before"], config["section"])

print("\n=== Done ===")
