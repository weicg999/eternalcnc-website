# -*- coding: utf-8 -*-
"""映射 desc过短页面url -> 源文件候选路径，便于批量补写description"""
import os, re, glob, html as _html

DIST = r'F:\V7\dist'
content_root = r'F:\V7\src'
title_re = re.compile(r'<title>(.*?)</title>', re.S | re.I)
desc_re = re.compile(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', re.S | re.I)

def clean(s): return _html.unescape(re.sub(r'\s+',' ',s).strip())

# 预构建路由 -> 源文件映射（加速查找）
import collections
route2src = {}
for f in glob.glob(os.path.join(content_root,'pages','**','*.astro'), recursive=True):
    rel = os.path.relpath(f, os.path.join(content_root,'pages')).replace('\\','/')
    r = rel[:-6]
    if r.endswith('/index'): r = r[:-6]
    if r == 'index': r = ''
    route2src.setdefault('/'+r, []).append(f)
    route2src.setdefault('/'+r+'/', []).append(f)

out = []
for f in glob.glob(os.path.join(DIST,'**','index.html'), recursive=True):
    rel = os.path.relpath(f, DIST).replace('\\','/').rstrip('index.html') or '/'
    md = desc_re.search(open(f,encoding='utf-8',errors='ignore').read())
    if not md: continue
    d = clean(md.group(1))
    if 0 < len(d) < 50:
        # 定位源
        srcs = route2src.get(('/' + rel).strip(), []) or route2src.get(rel, [])
        # tech-blog
        m = re.match(r'knowledge/tech-blog/([^/]+)/?$', rel.lstrip('/'))
        tag=''
        if m:
            cand = os.path.join(content_root,'content','blog', m.group(1)+'.md')
            srcs.append(cand)
            tag='blog'
            if not os.path.exists(cand): tag='blog??'
        out.append((rel.replace('/','/'), len(d), d, ' / '.join(os.path.basename(x) for x in srcs) or 'UNRESOLVED', tag))

print(f'desc过短页面共 {len(out)} 页\n')
idx=1
for rel,l,d,src,tag in sorted(out, key=lambda x:x[0]):
    print(f'{idx:>2}. [{l:>2}字] {src}   <- {rel}   ({tag})'); idx+=1