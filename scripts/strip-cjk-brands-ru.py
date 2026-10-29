# -*- coding: utf-8 -*-
"""Remove Chinese brand parentheticals from RU pages (user-approved 2026-09-20).
Scope: ONLY the 3 RU files that contain Han chars in rendered text.
  1) src/pages/ru/equipment-matrix.astro
  2) src/pages/ru/capabilities/equipment.astro
  3) src/pages/ru/resources.astro
Rule A: remove ' (...Han...)' parentheticals (incl. preceding space).
Rule B: literal ' / 鑫永恒' -> '' (resources.astro, not parenthesized).
Comments in ru/knowledge/tech-blog/*.astro are code comments (not rendered) - untouched.
"""
import re, io

FILES = [
    r"F:\V7\src\pages\ru\equipment-matrix.astro",
    r"F:\V7\src\pages\ru\capabilities\equipment.astro",
    r"F:\V7\src\pages\ru\resources.astro",
]

# \s*\( ... Han ... \)  ->  ''
PAREN_RE = re.compile(r"\s*\([^)]*[\u4e00-\u9fff][^)]*\)")

for path in FILES:
    with io.open(path, "r", encoding="utf-8") as f:
        text = f.read()
    before_han = len(re.findall(r"[\u4e00-\u9fff]", text))
    text2, n_paren = PAREN_RE.subn("", text)
    n_literal = text2.count(" / 鑫永恒")
    text2 = text2.replace(" / 鑫永恒", "")
    after_han = len(re.findall(r"[\u4e00-\u9fff]", text2))
    with io.open(path, "w", encoding="utf-8", newline="") as f:
        f.write(text2)
    print(f"{path}")
    print(f"  paren removals={n_paren}, literal removals={n_literal}, Han chars {before_han}->{after_han}")

print("DONE")
