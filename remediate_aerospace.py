import os

# Curated string map ONLY. No broad regex, so image file paths
# (e.g. /images/cases/5-axis/cnc-5axis-aerospace-bracket-...webp) are left intact.
FILES = [
    r"F:/V7/src/pages/materials/index.astro",
    r"F:/V7/src/pages/capabilities/materials/index.astro",
    r"F:/V7/src/pages/knowledge/news/index.astro",
    r"F:/V7/src/pages/knowledge/material-handbook/index.astro",
    r"F:/V7/src/pages/equipment/sunrise-dmu400-5axis.astro",
    r"F:/V7/src/pages/cases/5-axis/index.astro",
    r"F:/V7/src/pages/zh/cases/5-axis/index.astro",
]

MAPS = [
    ("Aerospace Fitting", "Satellite Fitting"),
    ("aerospace-spec parts", "high-reliability parts"),
    ("aerospace fittings", "satellite fittings"),
    ("across aerospace, energy", "across satellite, energy"),
    ("5-Axis Aerospace Bracket", "5-Axis Satellite Bracket"),
    ("Aluminum 5-axis aerospace bracket", "Aluminum 5-axis satellite bracket"),
    ("铝合金五轴航空支架", "铝合金五轴卫星支架"),
    ("aerospace-grade titanium", "high-reliability titanium"),
    ("aerospace grade", "high-strength"),
    ("Aerospace fixtures", "high-reliability fixtures"),
    ("Aerospace structural", "high-reliability structural"),
    ("Aerospace, chemical processing", "high-reliability, chemical processing"),
    ("Aerospace, medical implants", "high-reliability, medical implants"),
    ("Medical implants, semiconductor, aerospace", "Medical implants, semiconductor, high-reliability"),
    ("Ideal for aerospace & automotive", "Ideal for high-reliability & automotive"),
    ("across automotive, medical, electronics, and aerospace sectors", "across automotive, medical, electronics, and high-reliability sectors"),
    ("used in aerospace and load-bearing parts", "used in high-reliability and load-bearing parts"),
    ("Load-bearing, aerospace / high strength", "Load-bearing, high-reliability / high strength"),
    ("aerospace structural parts", "high-reliability structural parts"),
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
