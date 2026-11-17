# -*- coding: utf-8 -*-
"""Generate issue-09.astro (en/zh/ru) from the 2026-11-13 draft, using issue-08.astro as template."""
import io, re, sys

DRAFT = r"F:\V7\行业与新闻_草稿_2026-11-13.md"
TPL = {
    "en": r"F:\V7\src\pages\knowledge\news\issue-08.astro",
    "zh": r"F:\V7\src\pages\zh\knowledge\news\issue-08.astro",
    "ru": r"F:\V7\src\pages\ru\knowledge\news\issue-08.astro",
}
OUT = {
    "en": r"F:\V7\src\pages\knowledge\news\issue-09.astro",
    "zh": r"F:\V7\src\pages\zh\knowledge\news\issue-09.astro",
    "ru": r"F:\V7\src\pages\ru\knowledge\news\issue-09.astro",
}

s = io.open(DRAFT, encoding="utf-8").read()
i_zh = s.index("# 一、中文（简体）")
i_en = s.index("# 二、English")
i_ru = s.index("# 三、Русский")
SEC = {"zh": s[i_zh:i_en], "en": s[i_en:i_ru], "ru": s[i_ru:]}


def js(v):
    return "'" + v.replace("\\", "\\\\").replace("'", "\\'") + "'"


CFG = {
    "zh": dict(
        kpi_kw="KPI", obs=r"^观察 \d", src_prefix="来源：",
        faq_head="## 常见问题", rel_head="## 相关阅读",
        fields={"标题": "title", "摘要": "summary", "对零件意味着什么": "mean", "来源": "source"},
    ),
    "en": dict(
        kpi_kw="KPI", obs=r"^Observation \d", src_prefix="Source:",
        faq_head="## Frequently asked questions", rel_head="## Related reading",
        fields={"Title": "title", "Summary": "summary",
                "What it means for your parts": "mean", "Source": "source"},
    ),
    "ru": dict(
        kpi_kw="KPI", obs=r"^Наблюдение \d", src_prefix="Источник:",
        faq_head="## Частые вопросы", rel_head="## Что почитать дальше",
        fields={"Заголовок": "title", "Аннотация": "summary",
                "Что это значит для ваших деталей": "mean", "Источник": "source"},
    ),
}


def parse(lang):
    cfg = CFG[lang]
    sec = SEC[lang]
    chunks = sec.split("\n### ")[1:]
    kpis, stories, faqs, related = [], [], [], []
    for ch in chunks:
        head, _, body = ch.partition("\n")
        head = head.strip()
        # a chunk ends where the next H2 section starts (the "## ..." heading is not an H3 boundary)
        body = body.split("\n## ")[0]
        if head.startswith("KPI"):
            sep = "｜" if "｜" in head else "—"
            parts = [p.strip() for p in head.split(sep, 1)]
            metric = parts[1]
            lines = [l.strip() for l in body.strip().split("\n") if l.strip() and l.strip() != "---"]
            src = ""
            keep = []
            for l in lines:
                if l.startswith(cfg["src_prefix"]):
                    src = l[len(cfg["src_prefix"]):].strip()
                else:
                    keep.append(l)
            kpis.append((metric, " ".join(keep), src))
        elif re.match(cfg["obs"], head):
            if "｜" in head:
                parts = [p.strip() for p in head.split("｜")]
            else:
                parts = [p.strip() for p in re.split(r"\s+—\s+", head)]
            tag, date = parts[1], parts[2]
            d = {}
            for k, key in cfg["fields"].items():
                m = re.search(r"\*\*" + re.escape(k) + r"\*\*[:：]\s*(.+)", body)
                if not m:
                    raise SystemExit("field missing: %s in %s" % (k, head))
                d[key] = m.group(1).strip()
            stories.append((tag, date, d["title"], d["summary"], d["mean"], d["source"]))
    # faqs
    faq_txt = sec[sec.index(cfg["faq_head"]):sec.index(cfg["rel_head"])]
    for m in re.finditer(r"\*\*(.+?)\*\*\n(.+?)(?=\n\n|\n## |\Z)", faq_txt, re.S):
        faqs.append((m.group(1).strip(), " ".join(x.strip() for x in m.group(2).strip().split("\n"))))
    # related
    rel_txt = sec[sec.index(cfg["rel_head"]):]
    for m in re.finditer(r"^-\s*(.+?)\s*→\s*`([^`]+)`", rel_txt, re.M):
        related.append((m.group(1).strip(), m.group(2).strip()))
    if len(kpis) != 3 or len(stories) != 5:
        raise SystemExit("%s: kpis=%d stories=%d" % (lang, len(kpis), len(stories)))
    return kpis, stories, faqs, related


def blocks(lang):
    kpis, stories, faqs, related = parse(lang)
    k = "\n".join("  { metric: %s, label: %s, source: %s }," % (js(a), js(b), js(c)) for a, b, c in kpis)
    st = "\n".join(
        "  {\n    tag: %s,\n    date: %s,\n    title: %s,\n    summary: %s,\n    what_it_means: %s,\n    source: %s,\n  },"
        % (js(a), js(b), js(c), js(d), js(e), js(f)) for a, b, c, d, e, f in stories)
    fq = "\n".join("  { q: %s, a: %s }," % (js(a), js(b)) for a, b in faqs)
    rl = "\n".join("  { label: %s, href: %s }," % (js(a), js(b)) for a, b in related)
    return k, st, fq, rl


ISSUE = {
    "en": dict(label="Issue", number="09", date="13 November 2026",
               blurb="Five things the shop floor noticed \u2014 and what they mean for the parts you send us.",
               title="CNC Precision Machining Shop-Floor News \u00b7 Issue 09 | Eternal CNC",
               desc="Mid-November 2026: producer prices up 5.7% while fabricated metal products manage 1.7%, mechanical and electrical exports at 16.81 trillion yuan with industrial robots growing only 17.8%, Beijing writing a 2,000-hour MTBF and one-to-two-day samples into policy, the HNC-10 controller running a language model on board, and Gree's 300 million yuan temperature-control tender that is entirely air cooling.",
               old_date="6 November 2026", tpl_next="13 November 2026", next="20 November 2026",
               next_text="Storylines we are following: November industrial-robot and machine-tool output from the National Bureau of Statistics; whether October's producer-price scissors carries into December quotations; whether buyers actually start holding prototyping lead times to the one-to-two-day benchmark Beijing has just written down; and whether prototype and small-batch structural work picks up ahead of those 2027 liquid-cooling lines.",
               title_fix=("Issue 08", "Issue 09")),
    "zh": dict(label="第", number="09", date="2026 年 11 月 13 日",
               blurb="车间里注意到的五件事 \u2014\u2014 以及它们对您送来的零件意味着什么。",
               title="CNC 精密零件加工厂的行业观察 \u00b7 第 09 期 | Eternal CNC",
               desc="2026 年 11 月中：出厂价涨 5.7% 而金属制品只涨 1.7%；前 10 个月机电出口 16.81 万亿元、工业机器人仅增 17.8%；北京把 2000 小时无故障和 1\u20142 天出样写进政策；华中10型数控系统内置大模型；格力 3 亿元温控集采全是风冷。",
               old_date="2026 年 11 月 6 日", tpl_next="2026 年 11 月 13 日", next="2026 年 11 月 20 日",
               next_text="正在跟进的线索：国家统计局 11 月的工业机器人与数控机床产量；10 月那组 PPI 剪刀差会不会延续进 12 月的报价单；北京那份方案落地后，客户是不是真的开始拿「样品 1\u20142 天」来要求打样交期；以及液冷那批 2027 年产线投产之前，打样与小批结构件的询价会不会先热起来。",
               title_fix=("第 08 期 | Eternal CNC", "第 09 期 | Eternal CNC")),
    "ru": dict(label="Выпуск", number="09", date="13 ноября 2026",
               blurb="Пять вещей, которые заметил цех, \u2014 и что они значат для деталей, которые вы нам присылаете.",
               title="Новости отрасли CNC-производства \u00b7 Выпуск 09 | Eternal CNC",
               desc="Середина ноября 2026 года: отпускные цены +5,7%, а металлоизделия всего +1,7%; экспорт механики и электротехники 16,81 трлн юаней при росте промышленных роботов лишь на 17,8%; Пекин записал в программу 2 000 часов наработки на отказ и образцы за один-два дня; система HNC-10 несёт языковую модель на борту; тендер Gree на 300 млн юаней целиком на воздушном охлаждении.",
               old_date="6 ноября 2026", tpl_next="13 ноября 2026", next="20 ноября 2026",
               next_text="Сюжеты, за которыми мы следим: ноябрьская статистика по выпуску промышленных роботов и станков с ЧПУ; перейдёт ли октябрьская ценовая \u00abножницы\u00bb в декабрьские предложения; начнут ли заказчики реально требовать срок изготовления образца в один-два дня \u2014 ориентир, который Пекин только что записал в программу; и оживёт ли спрос на образцы и мелкие партии конструкционных деталей до запуска жидкостных линий в 2027 году.",
               title_fix=("Выпуск 08", "Выпуск 09")),
}


def sub1(text, old, new, label):
    n = text.count(old)
    if n != 1:
        raise SystemExit("replace count %d for %s: %r" % (n, label, old[:60]))
    return text.replace(old, new)


for lang in ("en", "zh", "ru"):
    cfg = ISSUE[lang]
    k, st, fq, rl = blocks(lang)
    t = io.open(TPL[lang], encoding="utf-8").read()

    # 1. next-issue date first: at this point the string is unique (issue.date is still the old one)
    t = sub1(t, ">%s</h3>" % cfg["tpl_next"], ">%s</h3>" % cfg["next"], lang + " nextdate")
    # 2. issue object
    t = re.sub(r"const issue = \{\n.*?\n\};\n",
               "const issue = {\n  label: %s,\n  number: %s,\n  date: %s,\n  blurb: %s,\n};\n"
               % (js(cfg["label"]), js(cfg["number"]), js(cfg["date"]), js(cfg["blurb"])),
               t, count=1, flags=re.S)
    # 3. data blocks
    for name, body in (("kpis", k), ("stories", st), ("faqs", fq), ("related", rl)):
        t, n = re.subn(r"const " + name + r" = \[\n.*?\n\];\n",
                       "const %s = [\n%s\n];\n" % (name, body), t, count=1, flags=re.S)
        if n != 1:
            raise SystemExit("block %s not replaced in %s" % (name, lang))
    # 4. page title + description
    m = re.search(r'  title="([^"]*)"\n  description="([^"]*)"', t)
    if not m:
        raise SystemExit("layout attrs not found " + lang)
    t = t.replace(m.group(0), '  title="%s"\n  description="%s"' % (cfg["title"], cfg["desc"]), 1)
    # 5. next-issue paragraph
    m = re.search(r'<p class="text-sm leading-relaxed mb-5" style="color: var\(--text-body\);">\n(.*?)\n          </p>',
                  t, re.S)
    if not m:
        raise SystemExit("next-issue para not found " + lang)
    t = t.replace(m.group(0),
                  '<p class="text-sm leading-relaxed mb-5" style="color: var(--text-body);">\n%s\n          </p>'
                  % cfg["next_text"], 1)

    io.open(OUT[lang], "w", encoding="utf-8", newline="\n").write(t)
    print("written", OUT[lang], len(t), "bytes")
