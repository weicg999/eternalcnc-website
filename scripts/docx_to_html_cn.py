#!/usr/bin/env python
"""Convert EternalCNC-Company-Profile-CN.docx to a standalone branded HTML file."""
import sys
from docx import Document
from docx.oxml.ns import qn

SRC = r"F:\V7\public\downloads\EternalCNC-Company-Profile-CN.docx"
OUT = r"F:\V7\public\downloads\EternalCNC-Company-Profile-CN.html"

doc = Document(SRC)

CSS = """
  :root { --brand-red:#8B0000; --brand-dark:#1A1A1A; --brand-silver:#6B7280; --line:#E5E7EB; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: "Microsoft YaHei","Helvetica Neue",Arial,sans-serif; color:var(--brand-dark); line-height:1.7; }
  .page { max-width: 820px; margin: 0 auto; padding: 28px 30px; }
  header.cover { border-bottom: 3px solid var(--brand-red); padding-bottom: 18px; margin-bottom: 24px; }
  .brand { font-size: 26px; font-weight: 800; color: var(--brand-red); letter-spacing:.5px; }
  .brand small { display:block; font-size:13px; font-weight:500; color:var(--brand-silver); letter-spacing:2px; text-transform:uppercase; margin-top:4px; }
  h2 { font-size: 18px; color: var(--brand-red); border-left: 4px solid var(--brand-red); padding-left: 10px; margin: 28px 0 12px; }
  p, li { font-size: 14px; color:#222; }
  ul { padding-left: 22px; }
  table { width:100%; border-collapse: collapse; margin: 12px 0; font-size: 13px; }
  th, td { border: 1px solid var(--line); padding: 8px 10px; text-align:left; vertical-align: top; }
  th { background: #F7F2F2; color: var(--brand-red); font-weight:700; }
  tbody tr:nth-child(even) { background:#FAFAFA; }
  .note { font-size: 12px; color: var(--brand-silver); border:1px dashed var(--line); padding:8px 10px; border-radius:6px; margin-top:16px; }
  footer { margin-top: 30px; border-top:1px solid var(--line); padding-top:12px; font-size:12px; color:var(--brand-silver); display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; }
  @media print { @page { size: A4; margin: 16mm; } .page { padding:0; max-width:none; } h2 { page-break-after: avoid; } table { page-break-inside: auto; } tr { page-break-inside: avoid; } }
"""

def para_html(p):
    text = p.text.strip()
    if not text:
        return ""
    # detect heading by style
    style = (p.style.name or "") if p.style else ""
    if "Heading 1" in style:
        return f"<h2>{text}</h2>"
    if "Heading" in style:
        return f"<h3 style='color:var(--brand-red);margin:18px 0 8px;font-size:15px;'>{text}</h3>"
    # bullet / numbered
    num_pr = p._p.find(qn('w:numPr'))
    if num_pr is not None:
        return f"<li>{text}</li>"
    return f"<p>{text}</p>"

def table_html(t):
    rows = []
    for r in t.rows:
        cells = [c.text.strip().replace("\n", "<br/>") for c in r.cells]
        rows.append(cells)
    if not rows:
        return ""
    head = rows[0]
    body = rows[1:]
    th = "".join(f"<th>{c}</th>" for c in head)
    trs = ""
    for row in body:
        trs += "<tr>" + "".join(f"<td>{c}</td>" for c in row) + "</tr>"
    return f"<table><thead><tr>{th}</tr></thead><tbody>{trs}</tbody></table>"

body_parts = []
in_list = False
for block in doc.element.body.iterchildren():
    tag = block.tag
    if tag == qn('w:p'):
        from docx.text.paragraph import Paragraph
        p = Paragraph(block, doc)
        h = para_html(p)
        if h.startswith("<li>"):
            if not in_list:
                body_parts.append("<ul>")
                in_list = True
            body_parts.append(h)
        else:
            if in_list:
                body_parts.append("</ul>")
                in_list = False
            body_parts.append(h)
    elif tag == qn('w:tbl'):
        if in_list:
            body_parts.append("</ul>")
            in_list = False
        from docx.table import Table
        body_parts.append(table_html(Table(block, doc)))

if in_list:
    body_parts.append("</ul>")

content = "\n".join(body_parts)

html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>鑫永恒 · Eternal CNC 公司简介</title>
<meta name="description" content="鑫永恒（深圳）精密实业有限公司 / Eternal CNC 公司简介：精密 CNC 加工、24 台设备、汽车/医疗/电子/机器人/通信卫星等领域全球 B2B 供应。" />
<style>{CSS}</style>
</head>
<body>
<div class="page">
  <header class="cover">
    <div class="brand">鑫永恒精密机械<small>Eternal CNC · 公司简介 2026</small></div>
  </header>
{content}
  <footer>
    <span>鑫永恒（深圳）精密实业有限公司 · Eternal CNC</span>
    <span>sales@eternalcnc.com</span>
  </footer>
</div>
</body>
</html>
"""

with open(OUT, "w", encoding="utf-8") as f:
    f.write(html)

print("WROTE", OUT, len(html), "bytes")
