import re, traceback
from collections import Counter

files = [
    'F:/V7/dist/ru/equipment-matrix/index.html',
    'F:/V7/dist/ru/capabilities/equipment/index.html',
    'F:/V7/dist/ru/resources/index.html',
]
han = re.compile(r'[\u4e00-\u9fff]+')
out = []
try:
    for f in files:
        try:
            txt = open(f, encoding='utf-8').read()
        except Exception as e:
            out.append('== ' + f + ' ERR ' + str(e)); continue
        c = Counter(han.findall(txt))
        out.append('== ' + f)
        if not c:
            out.append('  (no Han chars)')
        for r, n in c.most_common():
            out.append('  ' + r + '  x' + str(n))
except Exception:
    out.append('FATAL:\n' + traceback.format_exc())

open('F:/V7/.workbuddy/check-han-ru-result.txt', 'w', encoding='utf-8').write('\n'.join(out))
