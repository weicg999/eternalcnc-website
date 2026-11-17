# -*- coding: utf-8 -*-
import io
import re
import urllib.request

URLS = {"en": "https://eternalcnc.com/knowledge/news/issue-09/",
        "zh": "https://eternalcnc.com/zh/knowledge/news/issue-09/",
        "ru": "https://eternalcnc.com/ru/knowledge/news/issue-09/"}
LBL = {"en": "What it means for your parts", "zh": "对零件意味着什么",
       "ru": "Что это значит для ваших деталей"}
DATE = {"en": "13 November 2026", "zh": "2026 年 11 月 13 日", "ru": "13 ноября 2026"}
NEXT = {"en": "20 November 2026", "zh": "2026 年 11 月 20 日", "ru": "20 ноября 2026"}

for lang, url in URLS.items():
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 check"})
    t = urllib.request.urlopen(req, timeout=40).read().decode("utf-8")
    title = re.search(r"<title>(.*?)</title>", t, re.S).group(1).strip()
    print(lang, "| bytes", len(t))
    print("   title:", title)
    print("   stories:", t.count(LBL[lang]) - (1 if lang == "zh" else 0),
          "| date:", DATE[lang] in t,
          "| next:", NEXT[lang] in t)
    if lang != "zh":
        cjk = re.findall(r"[\u4e00-\u9fff]+", re.sub(r"<script.*?</script>", "", t, flags=re.S))
        print("   CJK leakage:", cjk[:5], "count", len(cjk))
        print("   corner quotes:", t.count("「") + t.count("」"))
    print("   quote check:", "「" in t and lang == "zh", )
