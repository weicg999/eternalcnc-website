# -*- coding: utf-8 -*-
"""扫描官网源码中实际写入的 description，统计过短(<50)与超长(>160)，避免dist解析误导。"""
import os, re, glob, html as _html

SRC = r'F:\V7\src'
fm = re.compile(r'^---\s*\n(.*?)\n---', re.S)
desc_fm = re.compile(r'^description:\s*(?:"([^"]*)"|\'([^\']*)\'|(\S.*))', re.M)
# 模板传入 description="..." 或 description={...}
desc_prop = re.compile(r'<PageLayout[\s\S]*?<PageLayout|(?<=<PageLayout).*?description=(?:\"|\')(.*?)(?:\"|\')', re.S)
desc_any = re.compile(r'description=(?:\"|\')(.*?)(?:\"|\')|description=`(.*?)`', re.S)

def clean(s): return _html.unescape(re.sub(r'\s+',' ',s).strip())

short_list=[]; long_list=[]
count_files=0
# 1) content 博客 frontmatter
for f in glob.glob(os.path.join(SRC,'content','**','*.md'), recursive=True):
    txt=open(f,encoding='utf-8').read()
    m=fm.search(txt)
    if not m: continue
    dm=desc_fm.search(m.group(1))
    if dm:
        count_files+=1
        val=dm.group(1) or dm.group(2) or dm.group(3)
        d=clean(val)
        if len(d)>160: long_list.append((f,len(d),d))
        elif 0<len(d)<50: short_list.append((f,len(d),d))

# 2) pages .astro 模板/frontmatter description
for f in glob.glob(os.path.join(SRC,'pages','**','*.astro'), recursive=True):
    txt=open(f,encoding='utf-8').read()
    vals=[]
    m=fm.search(txt)
    if m:
        dm=desc_fm.search(m.group(1))
        if dm: vals.append((dm.group(1) or dm.group(2) or dm.group(3)))
    for dm in desc_any.finditer(txt):
        vals.append(dm.group(1) or dm.group(2))
    if not vals: continue
    count_files+=1
    for v in vals:
        d=clean(v)
        if not d: continue
        if len(d)>160: long_list.append((f,len(d),d))
        elif len(d)<50: short_list.append((f,len(d),d))

print(f'扫描含 description 的源文件: {count_files}')
print(f'\n=== desc<50 过短 共 {len(short_list)} 处 ===')
for f,l,d in sorted(short_list,key=lambda x:x[1]):
    print(f'[{l:>3}字] {os.path.relpath(f,SRC).replace(chr(92),"/")}   | "{d[:40]}"')
print(f'\n=== desc>160 超长 共 {len(long_list)} 处 ===')
for f,l,d in sorted(long_list,key=lambda x:-x[1]):
    print(f'[{l:>3}字] {os.path.relpath(f,SRC).replace(chr(92),"/")}')