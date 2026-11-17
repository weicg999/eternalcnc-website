# -*- coding: utf-8 -*-
"""Generate Issue 08 pages (EN/ZH/RU) from the draft markdown, patch the three index pages."""
import io, os, re

ROOT = r'F:\V7'
DRAFT = os.path.join(ROOT, '行业与新闻_草稿_2026-11-06.md')

def rd(p):
    return io.open(p, encoding='utf-8').read()

def wr(p, s):
    io.open(p, 'w', encoding='utf-8', newline='\n').write(s)

def js(s):
    s = s.strip()
    s = s.replace('\\', '\\\\').replace("'", "\\'")
    s = re.sub(r'\s*\n\s*', ' ', s)
    return "'" + s + "'"

draft = rd(DRAFT)
segs = re.split(r'\n# 二、English\n|\n# 三、Русский\n', draft)
assert len(segs) == 3, len(segs)
ZH, EN, RU = segs

FIELD = re.compile(r'\n\*\*[^*\n]+\*\*\s*[：:]\s*')

def parse(seg, kpi_head, story_head, src_word, faq_head, rel_head):
    kpis = []
    for b in re.split(kpi_head, seg)[1:]:
        b = b.split('\n## ')[0].strip()
        metric, _, rest = b.partition('\n')
        m = re.search(r'\n' + src_word + r'[：:]\s*([^\n]+)', rest)
        assert m and metric.strip(), b[:60]
        kpis.append((metric.strip(), rest[:m.start()].strip(), m.group(1).strip()))
    assert len(kpis) == 3, len(kpis)

    stories = []
    for b in re.split(story_head, seg)[1:]:
        head, _, rest = b.partition('\n')
        bits = re.split(r'\s*[｜—]\s*', head.strip())
        assert len(bits) == 2, head
        chunks = [c.split('\n## ')[0].strip() for c in FIELD.split('\n' + rest) if c.strip()]
        assert len(chunks) == 4, (head, len(chunks))
        stories.append(dict(tag=bits[0], date=bits[1], title=chunks[0],
                            summary=chunks[1], what_it_means=chunks[2], source=chunks[3]))
    assert len(stories) == 5, len(stories)

    faqs = re.findall(r'\*\*([^*\n]+)\*\*\n(.+)', re.split(faq_head, seg)[-1])
    assert len(faqs) == 3, faqs
    related = re.findall(r'^- (.+?) → `(.+?)`\s*$', re.split(rel_head, seg)[-1], re.M)
    assert len(related) == 4, related
    return kpis, stories, faqs, related

zh_k, zh_s, zh_f, zh_r = parse(ZH, r'\n### KPI \d+ ｜ ', r'\n### 观察 \d+ [｜—]\s*', '来源',
                               r'\n## 常见问题\n', r'\n## 相关阅读\n')
en_k, en_s, en_f, en_r = parse(EN, r'\n### KPI \d+ — ', r'\n### Observation \d+ —\s*', 'Source',
                               r'\n## Frequently asked questions\n', r'\n## Related reading\n')
ru_k, ru_s, ru_f, ru_r = parse(RU, r'\n### KPI \d+ — ', r'\n### Наблюдение \d+ —\s*', 'Источник',
                               r'\n## Частые вопросы\n', r'\n## Что почитать дальше\n')

def blk_kpis(k):
    return 'const kpis = [\n' + ''.join(
        '  { metric: %s, label: %s, source: %s },\n' % (js(a), js(b), js(c)) for a, b, c in k) + '];'

def blk_stories(st):
    out = 'const stories = [\n'
    for s in st:
        out += '  {\n'
        for k in ('tag', 'date', 'title', 'summary', 'what_it_means', 'source'):
            out += '    %s: %s,\n' % (k, js(s[k]))
        out += '  },\n'
    return out + '];'

def blk_faqs(f):
    return 'const faqs = [\n' + ''.join('  { q: %s, a: %s },\n' % (js(a), js(b)) for a, b in f) + '];'

def blk_related(r):
    return 'const related = [\n' + ''.join(
        '  { label: %s, href: %s },\n' % (js(a), js(b)) for a, b in r) + '];'

def split_file(text):
    lines = text.split('\n')
    assert lines[0].strip() == '---'
    i = 1
    while lines[i].strip() != '---':
        i += 1
    return '\n'.join(lines[1:i]), '\n'.join(lines[i + 1:])

def rebuild(src_path, out_path, kpis, stories, faqs, related, date_str,
            new_title, new_desc, next_date, next_text):
    front, body = split_file(rd(src_path))
    for name, new in (('kpis', blk_kpis(kpis)), ('stories', blk_stories(stories)),
                      ('faqs', blk_faqs(faqs)), ('related', blk_related(related))):
        pat = re.compile(r'const %s = \[.*?\n\];' % name, re.S)
        front, n = pat.subn(lambda m, s=new: s, front, count=1)
        assert n == 1, name
    front, n = re.subn(r"(const issue = \{[^}]*?number: )'[^']*'",
                       lambda m: m.group(1) + "'08'", front, count=1, flags=re.S)
    assert n == 1, 'issue.number'
    front, n = re.subn(r"(const issue = \{[^}]*?date: )'[^']*'",
                       lambda m: m.group(1) + js(date_str), front, count=1, flags=re.S)
    assert n == 1, 'issue.date'
    body, n = re.subn(r'title="[^"]*"', lambda m: 'title="%s"' % new_title, body, count=1)
    assert n == 1, 'title'
    body, n = re.subn(r'description="[^"]*"', lambda m: 'description="%s"' % new_desc, body, count=1)
    assert n == 1, 'description'
    body, n = re.subn(r'(<h3 class="text-xl font-bold mb-3" style="color: var\(--brand-dark\);">)[^<]*(</h3>)',
                      lambda m: m.group(1) + next_date + m.group(2), body, count=1)
    assert n == 1, 'nextdate'
    body, n = re.subn(r'(<p class="text-sm leading-relaxed mb-5" style="color: var\(--text-body\);">\n)(.*?)(\n\s*</p>)',
                      lambda m: m.group(1) + next_text + m.group(3), body, count=1, flags=re.S)
    assert n == 1, 'nextstory'
    wr(out_path, '---\n' + front + '\n---\n' + body)

rebuild(os.path.join(ROOT, 'src/pages/knowledge/news/issue-07.astro'),
        os.path.join(ROOT, 'src/pages/knowledge/news/issue-08.astro'),
        en_k, en_s, en_f, en_r, '6 November 2026',
        'CNC Precision Machining Shop-Floor News · Issue 08 | Eternal CNC',
        'Early November 2026: manufacturing PMI back to 49.3 while equipment and high-tech hold above 50, an AI direct-drive machine tool 30-60% above the national standard, 100 humanoids a day at Lens Kunshan, 10 million cold plates a year planned in Zhangjiagang, and five humanoids on the assembly line at Schaeffler Taicang.',
        '13 November 2026',
        'Storylines we are following: November industrial-robot and machine-tool output from the National Bureau of Statistics; whether the October PMI drop shows up in December order books or stays a one-month dip; and whether humanoid joint-module makers start asking part suppliers for life-test data rather than only a dimensional report.')

rebuild(os.path.join(ROOT, 'src/pages/zh/knowledge/news/issue-07.astro'),
        os.path.join(ROOT, 'src/pages/zh/knowledge/news/issue-08.astro'),
        zh_k, zh_s, zh_f, zh_r, '2026 年 11 月 6 日',
        'CNC 精密零件加工厂的行业观察 · 第 08 期 | Eternal CNC',
        '2026 年 11 月初：制造业 PMI 回落至 49.3 而装备与高技术仍在线上、AI 全直驱机床整机性能超国标 30%—60%、蓝思昆山日产百台人形机器人、张家港千万套级冷板项目、舍弗勒装配线上岗五台人形机器人。',
        '2026 年 11 月 13 日',
        '正在跟进的线索：国家统计局 11 月的工业机器人与数控机床产量；10 月 PMI 的回落会不会落进 12 月的订单簿，还是只是一个月的波动；以及人形机器人关节模组厂会不会开始向零件供应商要寿命试验数据，而不只是一份尺寸报告。')

rebuild(os.path.join(ROOT, 'src/pages/ru/knowledge/news/issue-07.astro'),
        os.path.join(ROOT, 'src/pages/ru/knowledge/news/issue-08.astro'),
        ru_k, ru_s, ru_f, ru_r, '6 ноября 2026',
        'Новости отрасли CNC-производства · Выпуск 08 | Eternal CNC',
        'Начало ноября 2026 года: PMI обрабатывающей промышленности вернулся к 49,3, оборудование и высокие технологии держатся выше 50, станок с прямым приводом и ИИ на 30–60% выше национального стандарта, Lens Technology выдаёт 100 гуманоидов в день, в Чжанцзягане планируют 10 млн холодных плит в год, а на сборочной линии Schaeffler работают пять гуманоидов.',
        '13 ноября 2026',
        'Сюжеты, за которыми мы следим: ноябрьская статистика по выпуску промышленных роботов и станков с ЧПУ от Государственного статистического управления; отразится ли октябрьское падение PMI в портфеле заказов декабря или останется колебанием одного месяца; и начнут ли производители шарнирных модулей для гуманоидов запрашивать у поставщиков деталей данные ресурсных испытаний, а не только размерный протокол.')

IDX = {
    'en': dict(path='src/pages/knowledge/news/index.astro',
               entry=dict(number='08', date='6 November 2026',
                          title='What the shop floor noticed - early November',
                          blurb='Manufacturing PMI back to 49.3 while equipment and high-tech hold above 50, an AI direct-drive machine tool 30-60% above the national standard, 100 humanoids a day at Lens Kunshan, 10 million cold plates a year planned in Zhangjiagang, and five humanoids on the assembly line at Schaeffler Taicang.',
                          href='/knowledge/news/issue-08/'),
               next='13 November 2026'),
    'zh': dict(path='src/pages/zh/knowledge/news/index.astro',
               entry=dict(number='08', date='2026 年 11 月 6 日',
                          title='这一期，厂里看到的——十一月上旬',
                          blurb='制造业 PMI 回落至 49.3 而装备与高技术仍在线上、AI 全直驱机床整机性能超国标 30%—60%、蓝思昆山日产百台人形机器人、张家港千万套级冷板项目、舍弗勒装配线上岗五台人形机器人。',
                          href='/zh/knowledge/news/issue-08/'),
               next='2026 年 11 月 13 日'),
    'ru': dict(path='src/pages/ru/knowledge/news/index.astro',
               entry=dict(number='08', date='6 ноября 2026',
                          title='Что заметил цех — начало ноября',
                          blurb='PMI обрабатывающей промышленности вернулся к 49,3, а оборудование и высокие технологии держатся выше 50; станок с прямым приводом и ИИ на 30-60% выше национального стандарта; 100 гуманоидов в день в Куньшане; 10 млн холодных плит в год в Чжанцзягане; пять гуманоидов на линии Schaeffler.',
                          href='/ru/knowledge/news/issue-08/'),
               next='13 ноября 2026'),
}

NEXT_TXT = {
    'en': 'Storylines we are following: November industrial-robot and machine-tool output from the National Bureau of Statistics; whether the October PMI drop shows up in December order books or stays a one-month dip; and whether humanoid joint-module makers start asking part suppliers for life-test data rather than only a dimensional report.',
    'zh': '正在跟进的线索：国家统计局 11 月的工业机器人与数控机床产量；10 月 PMI 的回落会不会落进 12 月的订单簿，还是只是一个月的波动；以及人形机器人关节模组厂会不会开始向零件供应商要寿命试验数据，而不只是一份尺寸报告。',
    'ru': 'Сюжеты, за которыми мы следим: ноябрьская статистика по выпуску промышленных роботов и станков с ЧПУ от Государственного статистического управления; отразится ли октябрьское падение PMI в портфеле заказов декабря или останется колебанием одного месяца; и начнут ли производители шарнирных модулей для гуманоидов запрашивать у поставщиков деталей данные ресурсных испытаний, а не только размерный протокол.',
}

for k, cfg in IDX.items():
    p = os.path.join(ROOT, cfg['path'])
    t = rd(p)
    t, n = re.subn(r'latest: true', 'latest: false', t, count=1)
    assert n == 1, ('latest', k)
    e = cfg['entry']
    entry = ('  {\n    number: %s,\n    date: %s,\n    title: %s,\n    blurb: %s,\n'
             '    href: %s,\n    latest: true,\n  },\n') % (
        js(e['number']), js(e['date']), js(e['title']), js(e['blurb']), js(e['href']))
    t, n = re.subn(r'(const archive = \[\n)', lambda m: m.group(1) + entry, t, count=1)
    assert n == 1, ('archive', k)
    t, n = re.subn(r"const nextIssue = '[^']*';", lambda m: 'const nextIssue = ' + js(cfg['next']) + ';', t, count=1)
    assert n == 1, ('nextIssue', k)
    t, n = re.subn(r'(<p class="text-sm leading-relaxed mb-5" style="color: var\(--text-body\);">\n)(.*?)(\n\s*</p>)',
                   lambda m: m.group(1) + NEXT_TXT[k] + m.group(3), t, count=1, flags=re.S)
    assert n == 1, ('story', k)
    wr(p, t)

print('OK')
for nm, k, s, f, r in (('ZH', zh_k, zh_s, zh_f, zh_r), ('EN', en_k, en_s, en_f, en_r), ('RU', ru_k, ru_s, ru_f, ru_r)):
    print(nm, '| KPI:', [x[0] for x in k])
    print(nm, '| tags:', [x['tag'] for x in s])
    print(nm, '| dates:', [x['date'] for x in s], '| faq:', len(f), '| rel:', len(r))
