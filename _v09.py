# -*- coding: utf-8 -*-
import io
import re

D = io.open(r"F:\V7\行业与新闻_草稿_2026-11-13.md", encoding="utf-8").read()
P = {"en": r"F:\V7\src\pages\knowledge\news\issue-09.astro",
     "zh": r"F:\V7\src\pages\zh\knowledge\news\issue-09.astro",
     "ru": r"F:\V7\src\pages\ru\knowledge\news\issue-09.astro"}
i_zh, i_en, i_ru = D.index("# 一、中文"), D.index("# 二、English"), D.index("# 三、Русский")
SEC = {"zh": D[i_zh:i_en], "en": D[i_en:i_ru], "ru": D[i_ru:]}

FIELD = re.compile(r"""(?:label|source|q|a|title|summary|what_it_means|metric): '((?:[^'\\]|\\.)*)'""")
FIELDLINE = re.compile(
    r"\*\*(?:标题|摘要|对零件意味着什么|来源|Title|Summary|What it means for your parts|Source|"
    r"Заголовок|Аннотация|Что это значит для ваших деталей|Источник)\*\*[:：]\s*(.+)")


def unjs(v):
    return v.replace("\\\\", "\\").replace("\\'", "'")


for lang, path in P.items():
    t = io.open(path, encoding="utf-8").read()
    pool = "\n".join(unjs(m.group(1)) for m in FIELD.finditer(t))
    missing = [m.group(1).strip() for m in FIELDLINE.finditer(SEC[lang])
               if m.group(1).strip() not in pool]
    print(lang, "fields compared:", len(FIELDLINE.findall(SEC[lang])), "missing:", len(missing))
    for x in missing[:5]:
        print("   !", x[:90])

t_en = io.open(P["en"], encoding="utf-8").read()
t_ru = io.open(P["ru"], encoding="utf-8").read()
t_zh = io.open(P["zh"], encoding="utf-8").read()
print("EN CJK:", re.findall(r"[\u4e00-\u9fff]+", t_en))
print("RU CJK:", re.findall(r"[\u4e00-\u9fff]+", t_ru))
print("EN corner quotes:", t_en.count("「") + t_en.count("」"),
      "RU corner quotes:", t_ru.count("「") + t_ru.count("」"))
print("ZH 「」:", t_zh.count("「"), t_zh.count("」"),
      "RU «»:", t_ru.count("«"), t_ru.count("»"),
      "RU german:", t_ru.count("„") + t_ru.count("“"))
for lang, path in P.items():
    t = io.open(path, encoding="utf-8").read()
    print(lang,
          "| label:", re.search(r"label: '([^']*)'", t).group(1),
          "| number:", re.search(r"number: '([^']*)'", t).group(1),
          "| date:", re.search(r"date: '([^']*)'", t).group(1))
    print("     next h3:", re.search(r'mb-3" style="color: var\(--brand-dark\);">([^<]*)</h3>', t).group(1))
    print("     kpis:", len(re.findall(r"\{ metric:", t)),
          "stories:", len(re.findall(r"what_it_means:", t)),
          "faqs:", len(re.findall(r"\{ q:", t)),
          "related:", len(re.findall(r"\{ label: .*, href:", t)))
