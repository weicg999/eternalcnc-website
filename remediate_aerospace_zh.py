import os

# Curated-map only. Specific ZH phrases so we DON'T touch:
#  - image file/folder paths (e.g. /images/cases/aerospace/...)
#  - product-name "航空插头" (aviation connector, a real component type)
FILES = [
    r"F:/V7/src/pages/zh/materials/index.astro",
    r"F:/V7/src/pages/zh/capabilities/materials/index.astro",
    r"F:/V7/src/pages/zh/equipment/sunrise-dmu400-5axis.astro",
    r"F:/V7/src/pages/zh/knowledge/material-guide.astro",
    r"F:/V7/src/pages/zh/knowledge/material-handbook/index.astro",
    r"F:/V7/src/pages/zh/knowledge/whitepapers/index.astro",
    r"F:/V7/src/pages/zh/cases/5-axis/index.astro",
    r"F:/V7/src/pages/zh/services/cnc-machining.astro",
    r"F:/V7/src/pages/materials/index.astro",   # EN "Medical implants" -> non-implant
]

MAPS = [
    # --- ZH aerospace (航空/航空航天) -> high-reliability / satellite ---
    ("航空夹具", "高可靠性夹具"),
    ("航空结构件", "高可靠性结构件"),
    ("航空、医疗", "高可靠性、医疗"),
    ("航空、化工、石油天然气", "高可靠性、化工、石油天然气"),
    ("、航空", "、高可靠性"),
    ("航空级", "高可靠性级"),
    ("航空航天", "高可靠性"),
    ("航空钛合金", "高可靠性钛合金"),
    ("航空、受力件", "高可靠性、受力件"),
    ("航空/高强度", "高可靠性/高强度"),
    ("五轴航空支架", "五轴卫星支架"),
    # --- ZH medical implant -> non-implant ---
    ("医疗植入物", "非植入医疗器械"),
    # --- EN medical implant (materials table) -> non-implant ---
    ("Medical implants", "non-implant medical"),
]

changed = []
for p in FILES:
    if not os.path.exists(p):
        print("MISSING:", p)
        continue
    with open(p, encoding="utf-8") as fh:
        t = fh.read()
    orig = t
    for a, b in MAPS:
        t = t.replace(a, b)
    if t != orig:
        with open(p, "w", encoding="utf-8") as fh:
            fh.write(t)
        changed.append(p.replace("\\", "/"))

print("Changed files:", len(changed))
for c in changed:
    print(c)
