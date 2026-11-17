# -*- coding: utf-8 -*-
import io

EDITS = {
    "en": dict(
        path=r"F:\V7\src\pages\knowledge\news\index.astro",
        entry=("09", "13 November 2026",
               "What the shop floor noticed \u2014 mid-November",
               "Producer prices up 5.7% while fabricated metal products manage 1.7%, mechanical and electrical exports at 16.81 trillion yuan with industrial robots at 17.8%, Beijing writing a 2,000-hour MTBF and one-to-two-day samples into policy, the HNC-10 controller running a model on board, and a 300 million yuan Gree tender that is entirely air cooling.",
               "/knowledge/news/issue-09/"),
        next=("const nextIssue = '13 November 2026';", "const nextIssue = '20 November 2026';"),
    ),
    "zh": dict(
        path=r"F:\V7\src\pages\zh\knowledge\news\index.astro",
        entry=("09", "2026 年 11 月 13 日",
               "这一期，厂里看到的——十一月中旬",
               "出厂价涨 5.7% 而金属制品只涨 1.7%、前 10 个月机电出口 16.81 万亿元而工业机器人仅增 17.8%、北京把 2000 小时无故障与 1—2 天出样写进政策、华中10型数控系统内置大模型、格力 3 亿元温控集采全是风冷。",
               "/zh/knowledge/news/issue-09/"),
        next=("const nextIssue = '2026 年 11 月 13 日';", "const nextIssue = '2026 年 11 月 20 日';"),
    ),
    "ru": dict(
        path=r"F:\V7\src\pages\ru\knowledge\news\index.astro",
        entry=("09", "13 ноября 2026",
               "Что заметил цех — середина ноября",
               "Отпускные цены +5,7%, а металлоизделия всего +1,7%; экспорт механики и электротехники 16,81 трлн юаней при росте промышленных роботов на 17,8%; Пекин записал в программу 2 000 часов наработки на отказ и образцы за один-два дня; HNC-10 несёт модель на борту; тендер Gree на 300 млн юаней целиком на воздушном охлаждении.",
               "/ru/knowledge/news/issue-09/"),
        next=("const nextIssue = '13 ноября 2026';", "const nextIssue = '20 ноября 2026';"),
    ),
}

for lang, cfg in EDITS.items():
    p = cfg["path"]
    t = io.open(p, encoding="utf-8").read()
    num, date, title, blurb, href = cfg["entry"]

    # 1. the previous latest entry becomes non-latest
    n = t.count("    latest: true,")
    assert n == 1, (lang, "latest:true count", n)
    t = t.replace("    latest: true,", "    latest: false,", 1)

    # 2. prepend the new entry right after "const archive = ["
    new = ("const archive = [\n"
           "  {\n"
           "    number: '%s',\n"
           "    date: '%s',\n"
           "    title: '%s',\n"
           "    blurb: '%s',\n"
           "    href: '%s',\n"
           "    latest: true,\n"
           "  },\n" % (num, date, title, blurb, href))
    assert t.count("const archive = [\n") == 1, lang
    t = t.replace("const archive = [\n", new, 1)

    # 3. next issue date
    old, newv = cfg["next"]
    assert t.count(old) == 1, (lang, "nextIssue", t.count(old))
    t = t.replace(old, newv, 1)

    io.open(p, "w", encoding="utf-8", newline="\n").write(t)
    print("updated", p)
