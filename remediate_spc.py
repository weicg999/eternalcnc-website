import os, re

SRC = r"F:/V7/src"

en_phrases = [
    ("Full SPC process control", "Full in-process quality control"),
    ("full SPC control", "full in-process quality control"),
    ("full SPC", "full in-process quality control"),
    ("SPC Process Control", "Process Quality Control"),
    ("SPC process control", "in-process quality control"),
    ("SPC statistical process control", "In-process quality control"),
    ("Statistical process control", "In-process quality control"),
    ("SPC and inspection reports", "Inspection reports"),
    ("SPC-monitored", "Quality-monitored"),
    ("SPC Control", "Process Control"),
    ("SPC sampling inspection", "Sampling inspection"),
    ("SPC plan", "Quality plan"),
    ("SPC data", "Quality data"),
    ("SPC control", "Process control"),
    ("with SPC", "with in-process quality control"),
    ("rigorous SPC and process control", "rigorous in-process quality control"),
]

zh_phrases = [
    ("SPC 过程管控", "过程质量管控"),
    ("SPC 过程控制", "过程质量控制"),
    ("SPC 统计过程控制", "过程质量管控"),
    ("SPC 统计报告", "过程质量统计报告"),
    ("SPC 统计按客户要求", "过程质量管控按客户要求"),
    ("全程 SPC 过程管控", "全程过程质量管控"),
    ("全程SPC管控", "全程过程质量管控"),
    ("全程 SPC 管控", "全程过程质量管控"),
    ("SPC 按客户要求", "过程质量管控按客户要求"),
    ("SPC/GD&T", "过程质量管控/GD&T"),
    ("SPC 数据", "质量数据"),
    ("SPC 统计", "过程质量统计"),
    ("SPC 控制", "过程控制"),
]


def remediate(text, is_zh):
    if is_zh:
        for a, b in zh_phrases:
            text = text.replace(a, b)
        text = re.sub(r'SPC', '过程质量管控', text)
    else:
        for a, b in en_phrases:
            text = text.replace(a, b)
        text = re.sub(r'\bSPC\b', 'in-process QC', text)
    return text


changed = []
for root, dirs, files in os.walk(SRC):
    for f in files:
        if not f.endswith('.astro'):
            continue
        p = os.path.join(root, f)
        with open(p, encoding='utf-8') as fh:
            orig = fh.read()
        is_zh = '/zh/' in p.replace('\\', '/')
        new = remediate(orig, is_zh)
        if new != orig:
            with open(p, 'w', encoding='utf-8') as fh:
                fh.write(new)
            changed.append(p.replace('\\', '/'))

print("Changed files:", len(changed))
for c in changed:
    print(c)
