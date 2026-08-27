#!/usr/bin/env python3
"""Convert EternalCNC Mutual NDA DOCX to a formal bilingual PDF."""
import os
import sys
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
    KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from xml.sax.saxutils import escape

BRAND_RED = colors.HexColor('#8B0000')
TEXT_DARK = colors.HexColor('#1A1A1A')
TEXT_GRAY = colors.HexColor('#444444')
PAGE_BG = colors.HexColor('#FFFFFF')

FONT_DIR = 'C:/Windows/Fonts'
pdfmetrics.registerFont(TTFont('SimSun', os.path.join(FONT_DIR, 'simsunb.ttf')))
pdfmetrics.registerFont(TTFont('SimHei', os.path.join(FONT_DIR, 'simhei.ttf')))
pdfmetrics.registerFont(TTFont('Arial', os.path.join(FONT_DIR, 'arial.ttf')))
pdfmetrics.registerFont(TTFont('ArialBold', os.path.join(FONT_DIR, 'arialbd.ttf')))


def esc(text: str) -> str:
    return escape(text).replace('\n', '<br/>')


def cn(text: str, size: float = 10.5, bold: bool = False, color=TEXT_DARK) -> str:
    return f"<font name='{'SimHei' if bold else 'SimSun'}' size={size} color='{color.hexval()}'>{esc(text)}</font>"


def en(text: str, size: float = 9.5, bold: bool = False, color=TEXT_GRAY) -> str:
    return f"<font name='{'ArialBold' if bold else 'Arial'}' size={size} color='{color.hexval()}'>{esc(text)}</font>"


def bilingual(cn_text: str, en_text: str, cn_size: float = 10.5, en_size: float = 9.5) -> Paragraph:
    html = f"{cn(cn_text, size=cn_size)}<br/>{en(en_text, size=en_size)}"
    return Paragraph(html, style_paragraph)


def heading(cn_text: str, en_text: str = None) -> Paragraph:
    if en_text:
        html = f"{cn(cn_text, size=12.5, bold=True, color=BRAND_RED)}<br/>{en(en_text, size=10.5, bold=True, color=BRAND_RED)}"
    else:
        html = cn(cn_text, size=12.5, bold=True, color=BRAND_RED)
    return Paragraph(html, style_heading)


style_paragraph = ParagraphStyle(
    'NDAParagraph',
    fontName='SimSun',
    fontSize=10.5,
    leading=16,
    textColor=TEXT_DARK,
    spaceAfter=6,
    wordWrap='CJK',
    alignment=0,
    leftIndent=0,
)

style_en_only = ParagraphStyle(
    'NDAEnOnly',
    fontName='Arial',
    fontSize=9.5,
    leading=14,
    textColor=TEXT_GRAY,
    spaceAfter=6,
    wordWrap='CJK',
    alignment=0,
    leftIndent=0.5*cm,
)

style_heading = ParagraphStyle(
    'NDAHeading',
    fontName='SimHei',
    fontSize=12.5,
    leading=18,
    textColor=BRAND_RED,
    spaceBefore=10,
    spaceAfter=6,
    wordWrap='CJK',
)

style_center = ParagraphStyle(
    'NDACenter',
    fontName='SimHei',
    fontSize=20,
    leading=26,
    textColor=BRAND_RED,
    alignment=1,
    spaceAfter=4,
)

style_subcenter = ParagraphStyle(
    'NDASubCenter',
    fontName='ArialBold',
    fontSize=13,
    leading=18,
    textColor=TEXT_DARK,
    alignment=1,
    spaceAfter=16,
)

style_info = ParagraphStyle(
    'NDAInfo',
    fontName='SimSun',
    fontSize=10,
    leading=15,
    textColor=TEXT_DARK,
    spaceAfter=3,
    wordWrap='CJK',
)


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(BRAND_RED)
    canvas.setLineWidth(0.5)
    # top decorative line
    canvas.line(2*cm, A4[1] - 1.5*cm, A4[0] - 2*cm, A4[1] - 1.5*cm)
    # footer line + page number
    canvas.line(2*cm, 1.5*cm, A4[0] - 2*cm, 1.5*cm)
    canvas.setFont('Arial', 8)
    canvas.setFillColor(TEXT_GRAY)
    canvas.drawCentredString(A4[0]/2, 1*cm, f"EternalCNC Mutual NDA  |  Page {doc.page}")
    canvas.restoreState()


def build_pdf(output_path: str):
    doc = BaseDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=2.2*cm,
        rightMargin=2.2*cm,
        topMargin=2.5*cm,
        bottomMargin=2.5*cm,
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='normal')
    doc.addPageTemplates([PageTemplate(id='nda', frames=frame, onPage=header_footer)])

    story = []

    # Title
    story.append(Paragraph(cn('保  密  协  议', size=20, bold=True), style_center))
    story.append(Paragraph(en('Mutual Non-Disclosure Agreement (NDA)', size=13, bold=True), style_subcenter))

    # Meta info
    story.append(Paragraph(cn('协议编号 No.：XYH-NDA-202608001', size=10), style_info))
    story.append(Paragraph(cn('签订地 Place：深圳 Shenzhen', size=10), style_info))
    story.append(Paragraph(cn('签订日期 Date：2026 年 8 月 12 日', size=10), style_info))
    story.append(Spacer(1, 8))

    # Parties intro
    story.append(bilingual(
        '本协议由以下双方于上述日期签订：',
        'This Mutual Non-Disclosure Agreement (this "Agreement") is entered into by and between the parties below as of the date set forth above.'
    ))
    story.append(bilingual(
        '披露方 / Disclosing Party：______________________________（以下简称"甲方"）\nParty A (Disclosing Party): ______________________________',
        ''
    ))
    story.append(bilingual(
        '接收方 / Receiving Party：鑫永恒（深圳）精密实业有限公司 Xinyongheng (Shenzhen) Precision Industrial Co., Ltd.（以下简称"乙方"）\nParty B (Receiving Party): Xinyongheng (Shenzhen) Precision Industrial Co., Ltd.',
        ''
    ))
    story.append(Spacer(1, 6))

    # Whereases
    story.append(heading('鉴于：', 'Whereas,'))
    story.append(bilingual(
        '甲方拟向乙方披露某些非公开的技术、商业及项目信息，以便乙方就精密 CNC 加工、零件制造及相关服务进行报价、评估或承接生产；双方均可能向对方披露保密信息。',
        'Party A intends to disclose certain non-public technical, commercial and project information to Party B for the purpose of quotation, evaluation or production of precision CNC machined parts; and both parties may disclose Confidential Information to each other.'
    ))

    # Articles
    story.append(heading('第一条 【定义】', 'Article 1 Definitions'))
    story.append(bilingual(
        '1.1 "保密信息"指一方（披露方）以口头、书面、电子、图形、样品或任何其他形式向另一方（接收方）披露的、与披露方业务、产品、技术、客户、价格或项目有关的所有非公开信息，包括但不限于图纸、CAD/CAM 文件、3D 模型、规格书、公差要求、工艺方案、样品、报价及双方往来邮件。',
        '1.1 "Confidential Information" means all non-public information disclosed by one party (the Disclosing Party) to the other (the Receiving Party) in any form, including drawings, CAD/CAM files, 3D models, specifications, tolerances, process proposals, samples, quotations and correspondence.'
    ))
    story.append(bilingual(
        '1.2 保密信息不包括以下信息：(a) 已为公众所知悉且非因接收方违约所致；(b) 接收方在接收前已合法持有且无保密义务；(c) 接收方从无保密义务的第三方合法取得；(d) 依适用法律、法规或司法机关/仲裁机构要求而须披露的信息（但接收方应及时书面通知披露方）。',
        '1.2 Exclusions: (a) publicly known; (b) lawfully held by Receiving Party without confidentiality obligation; (c) lawfully obtained from a third party without restriction; (d) required to be disclosed by applicable law (upon prompt notice to Disclosing Party).'
    ))

    story.append(heading('第二条 【保密义务】', 'Article 2 Confidentiality Obligations'))
    story.append(bilingual(
        '2.1 接收方应对保密信息严格保密，仅可为本协议目的（报价、评估及/或生产承接）而使用，不得用于任何其他目的。',
        '2.1 Receiving Party shall keep Confidential Information strictly confidential and use it solely for the purpose of this Agreement (quotation, evaluation and/or production).'
    ))
    story.append(bilingual(
        '2.2 接收方应采取合理的管理及技术措施保护保密信息的安全，保护程度不低于其保护自身同类保密信息的标准。',
        '2.2 Reasonable administrative and technical safeguards shall be maintained.'
    ))
    story.append(bilingual(
        '2.3 未经披露方事先书面同意，接收方不得向任何第三方复制、分发、披露或转让保密信息。因生产需要须向分包商披露的，应事先取得披露方书面同意，并确保该分包商承担同等保密义务。披露方可一次性书面授权接收方，允许其将保密信息披露给特定的热处理、表面处理、线切割等工序分包商，无需逐项另行申请，但接收方应确保该等分包商承担同等保密义务；若分包商范围发生变更，接收方应事先通知披露方。',
        '2.3 No reproduction, distribution, disclosure or transfer to any third party without prior written consent. Subcontractors may be involved only with prior written consent and under equivalent confidentiality obligations. The Disclosing Party may grant a one-time blanket written authorization to the Receiving Party to disclose Confidential Information to specified subcontractors for heat treatment, surface treatment, wire EDM and similar processes without further separate approval, provided that the Receiving Party ensures such subcontractors assume equivalent confidentiality obligations; any material change to the scope of such subcontractors shall be notified to the Disclosing Party in advance.'
    ))
    story.append(bilingual(
        '2.4 接收方应将保密信息的知悉范围限于为履行本协议目的而必须知悉的员工、顾问或分包商，并就该等人员的违约行为向披露方承担责任。',
        '2.4 Access shall be limited to those who need to know.'
    ))

    story.append(heading('第三条 【保密期限】', 'Article 3 Term'))
    story.append(bilingual(
        '3.1 本协议项下的保密义务自保密信息披露之日起生效，至该等信息依法成为公开信息之日止持续有效。',
        '3.1 Confidentiality obligations commence upon disclosure and survive until the information becomes publicly known through no fault of Receiving Party.'
    ))
    story.append(bilingual(
        '3.2 尽管有上述规定，对于标注为"永久保密"或依信息性质应永久保密的信息（如核心工艺诀窍、专有设计），接收方的保密义务在该等信息披露后 5（五）年 内持续有效；经双方书面约定，可延长至更长期限。',
        '3.2 For information marked "permanently confidential" or of inherently permanent nature, obligations shall survive for 5 (five) years from disclosure (extendable to a longer term by written agreement).'
    ))

    story.append(heading('第四条 【返还或销毁】', 'Article 4 Return or Destruction'))
    story.append(bilingual(
        '4.1 本协议终止、项目未成交或经披露方书面请求时，接收方应在收到请求后 15（十五）个工作日 内返还或按披露方指示销毁全部保密信息及其副本（含电子文件），并书面确认已完成返还或销毁。',
        '4.1 Upon termination of this Agreement, project non-acceptance, or written request by Disclosing Party, Receiving Party shall return or destroy all Confidential Information and confirm in writing within 15 (fifteen) business days.'
    ))
    story.append(bilingual(
        '4.2 本条义务不影响接收方依法须留存备份的情形（如适用法律法规或审计要求），但该等备份仍应受本协议保密义务约束。',
        '4.2 This does not affect backups required by applicable law or audit, which shall remain subject to confidentiality.'
    ))

    story.append(heading('第五条 【知识产权】', 'Article 5 Intellectual Property'))
    story.append(bilingual(
        '5.1 保密信息的披露不视为向接收方转让或许可任何专利权、著作权、商标权、商业秘密或其他知识产权。所有保密信息及其衍生成果的知识产权均归披露方所有。',
        '5.1 Disclosure does not transfer or license any patent, copyright, trademark, trade secret or other IPR. All Confidential Information and derivative works remain the property of Disclosing Party.'
    ))
    story.append(bilingual(
        '5.2 接收方为履行本协议目的而开发的工艺方案、加工程序（含 G 代码）、工装夹具设计等，如系基于披露方保密信息而完成，披露方有权在采购订单中约定相关知识产权的归属及使用范围。',
        '5.2 Any process proposals, machining programs (including G-code), tooling and fixture designs developed by Receiving Party based on Confidential Information of Disclosing Party for the purpose of this Agreement may be subject to separate IP ownership and usage terms as agreed in the purchase order.'
    ))

    story.append(heading('第六条 【违约责任】', 'Article 6 Liability for Breach'))
    story.append(bilingual(
        '6.1 任何一方违反本协议约定的，应向守约方支付违约金 人民币拾万元整（¥100,000.00），并赔偿守约方因此遭受的全部实际损失（包括但不限于诉讼费、律师费、公证费及合理的调查费用）。若实际损失高于违约金金额，守约方有权主张差额部分。',
        '6.1 The breaching party shall pay liquidated damages of RMB One Hundred Thousand Yuan (¥100,000.00) to the non-breaching party and indemnify the non-breaching party for all actual losses (including litigation, attorney, notarization and reasonable investigation costs). If the actual loss exceeds the liquidated damages, the non-breaching party shall be entitled to claim the difference.'
    ))
    story.append(bilingual(
        '6.2 双方确认，保密信息一旦泄露可能造成难以弥补的损害，守约方除主张金钱赔偿外，亦有权依法申请责令停止违约行为及采取其他救济措施。',
        '6.2 Both parties acknowledge that breach may cause irreparable harm; the non-breaching party may seek injunctive and other equitable relief.'
    ))

    story.append(heading('第七条 【不构成要约】', 'Article 7 No Offer'))
    story.append(bilingual(
        '披露方向接收方披露保密信息，或接收方向披露方提供报价、工艺方案、样品等，均不构成任何一方对另一方下达采购订单或承接生产义务的承诺。双方之间的任何采购或生产合作，须另行签署独立的《采购合同》或《加工承揽合同》后方可生效。',
        'Disclosure of Confidential Information or provision of quotations, process proposals, samples by either party shall not constitute a commitment to place or accept a purchase order. Any procurement or production cooperation shall be subject to a separate Purchase Agreement or Processing Contract signed by both parties.'
    ))

    story.append(heading('第八条 【适用法律与争议解决】', 'Article 8 Governing Law and Dispute Resolution'))
    story.append(bilingual(
        '8.1 本协议的订立、效力、解释、履行及争议解决均适用中华人民共和国法律（不包括香港特别行政区、澳门特别行政区及台湾地区法律）。',
        '8.1 This Agreement is governed by the laws of the People\'s Republic of China (excluding Hong Kong, Macao and Taiwan).'
    ))
    story.append(bilingual(
        '8.2 因本协议引起的或与本协议有关的任何争议，双方应首先友好协商解决；协商不成的，任何一方均有权将争议提交深圳国际仲裁院（SCIA），按照其届时有效的仲裁规则在深圳进行仲裁，仲裁裁决为终局，对双方均有约束力。',
        '8.2 Any dispute shall first be settled by friendly negotiation; if unsuccessful, either party may submit to the Shenzhen Court of International Arbitration (SCIA) for binding arbitration in Shenzhen.'
    ))

    story.append(heading('第九条 【其他】', 'Article 9 Miscellaneous'))
    story.append(bilingual(
        '9.1 本协议为双向（互为披露方与接收方）保密协议；如仅一方披露保密信息，本协议对该方作为披露方、另一方作为接收方同样适用。',
        '9.1 This is a mutual NDA; it applies equally where only one party discloses.'
    ))
    story.append(bilingual(
        '9.2 本协议的任何修改或补充均须以书面形式作出，并经双方授权代表签字（及/或盖章）后生效。',
        '9.2 Amendments must be in writing and signed by authorized representatives.'
    ))
    story.append(bilingual(
        '9.3 本协议一式两份，甲乙双方各执一份，具有同等法律效力，自双方签字（及/或盖章）之日起生效。',
        '9.3 This Agreement is made in duplicate, one for each party, effective upon signature and/or sealing.'
    ))

    story.append(Spacer(1, 14))
    story.append(Paragraph(cn('（以下无正文，为本协议签署页）', size=10.5), style_paragraph))
    story.append(Spacer(1, 10))

    # Signature table
    sig_data = [
        [Paragraph(cn('甲方 Party A（披露方）', bold=True), style_paragraph),
         Paragraph(cn('乙方 Party B（接收方）', bold=True), style_paragraph)],
        [Paragraph(cn('公司名称（盖章）：\n________________________\n\nCompany Name (Seal):\n________________________', size=10), style_paragraph),
         Paragraph(cn('公司名称（盖章）：鑫永恒（深圳）精密实业有限公司\nXinyongheng (Shenzhen) Precision Industrial Co., Ltd.\n\nCompany Name (Seal):\nXinyongheng (Shenzhen) Precision Industrial Co., Ltd.', size=10), style_paragraph)],
        [Paragraph(cn('授权代表（签字）：\n________________________\n\nAuthorized Signature:\n________________________', size=10), style_paragraph),
         Paragraph(cn('授权代表（签字）：\n________________________\n\nAuthorized Signature:\n________________________', size=10), style_paragraph)],
        [Paragraph(cn('日期 Date：\n______年______月______日', size=10), style_paragraph),
         Paragraph(cn('日期 Date：\n______年______月______日', size=10), style_paragraph)],
    ]
    sig_table = Table(sig_data, colWidths=[doc.width/2 - 6, doc.width/2 - 6], rowHeights=[1*cm, 3.2*cm, 2.4*cm, 1.4*cm])
    sig_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CCCCCC')),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(sig_table)

    doc.build(story)
    print(f'PDF generated: {output_path}')


if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else 'public/downloads/EternalCNC-Mutual-NDA-ENCN.pdf'
    build_pdf(out)
