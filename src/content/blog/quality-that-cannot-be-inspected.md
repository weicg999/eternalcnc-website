---
title: "100% Inspection Still Misses It: Quality Only Process Control Can Guarantee"
description: "Quality that cannot be verified after the fact escapes 100% inspection. ISO 9001 calls these special processes. Ask suppliers how the process is validated."
pubDate: 2026-11-16
category: Machining Tips
tags: ["Special Processes", "Process Validation", "ISO 9001", "Quality Systems", "Inspection", "Surface Finishing"]
system: general
author: Eternal CNC Engineering Team
readingTime: "10 min read"
---

You pay for 100% inspection. The supplier agrees. The dimensional report has no gaps, and every value sits inside tolerance.

Then a few things still get through — no matter how many parts you measure.

Nothing is wrong with the inspection. For these characteristics, conformance simply cannot be verified economically after the fact. There is no column for them on the inspection sheet.

## 1. One line divides quality in two

Start with the half you can measure: dimensions, coating thickness, appearance, thread go/no-go. You can measure it, judge it against a gauge, and write a number in a report. Raising the inspection rate genuinely helps. Our piece on [inspection and acceptance](/knowledge/tech-blog/inspection-and-acceptance/) covers that half.

The other half looks like this:

- Weld penetration, joint strength, and the heat-affected zone
- Internal structure, toughness, and strength after heat treatment
- Coating adhesion, corrosion resistance, and sealing quality
- Bond strength and internal quality after composite forming

These have one thing in common. They are not merely "hard to make." **You either have to cut the part open, wait a long time, or test a coupon instead of the part.** Cut it open, and the part is gone.

So the dividing line takes one sentence: **can the result be verified by subsequent monitoring or measurement?** If yes, inspection handles it. If no, only the process can.

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 316" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Quality characteristics split by whether the result can be verified after the fact: left released by inspection, right controlled by process validation and periodic revalidation" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">One drawing, two ways to guarantee it</text>
<rect x="16" y="46" width="236" height="248" rx="9" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<rect x="268" y="46" width="236" height="248" rx="9" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<text x="134" y="78" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#0C447C">Verifiable after</text>
<text x="386" y="78" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#633806">Not verifiable</text>
<text x="134" y="112" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Size · coating · finish</text>
<text x="386" y="112" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Adhesion · grain · corrosion</text>
<path d="M134 128 L134 152 M128 146 L134 152 L140 146" style="fill:none;stroke:#85B7EB;stroke-width:2"/>
<path d="M386 128 L386 152 M380 146 L386 152 L392 146" style="fill:none;stroke:#EF9F27;stroke-width:2"/>
<text x="134" y="182" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Measure → accept</text>
<text x="386" y="182" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Set params → coupons</text>
<text x="134" y="216" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Inspection works</text>
<text x="386" y="216" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#633806">Revalidate</text>
<text x="134" y="258" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Inspection owns results</text>
<text x="386" y="258" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Validation owns process</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 1 · One dividing line: can the result be verified after the fact? Left goes to inspection, right to process validation</figcaption>
</figure>

## 2. The standard said it long ago — the signpost moved twice

ISO 9001 has one sentence about this, carried through four editions. **Clause 8.5.1 f)** says that where the output cannot be verified by subsequent monitoring or measurement, the organization must validate the ability of those processes to achieve planned results — and revalidate periodically. Not once and done.

Its address has changed twice:

| Edition | Where it lives | What it looks like |
|---|---|---|
| 2000 / 2008 | **7.5.2** | A standalone clause, titled process validation |
| 2015 | **8.5.1 f)** | Folded into eight controlled conditions, as one lettered item |
| 2026 | **8.5.1** | Requirement retained, clause structure unchanged |

The requirement never moved. The signpost moved twice. That is why many quality manuals still have a section 7.5.2, and people cannot find the thing they themselves wrote when they open a newer edition.

The name comes from **GB/T 19000-2016** (identical to ISO 9000:2015). Note 5 to 3.4.1 says: a process whose conformity cannot readily or economically be confirmed is usually called a **special process**.

Notice that the definition has exactly one test: **can you verify the output?** Nothing about how hard, how expensive, or how skilled the operator needs to be. Aerospace readers meet the same requirement in AS9100 clause 8.5.1.2; the wording changes, the test does not.

## 3. The version change is under way — don't use the version number as your test

This section is easy to misread, so be precise: a certificate showing the old edition is not expired.

- ISO 9001:2026 was published on **September 16, 2026**, with an ISO press release the same day.
- The 2015 edition was superseded, but certified organizations have a **3-year transition period**. ISO states there is no need to rush; follow your certification body's schedule.
- The current Chinese national standard **GB/T 19001-2016** is identical to the 2015 edition. Checked on the National Public Service Platform for Standards Information as of 11 November 2026, it is still marked current, with a 2023 review concluding "continue to be valid."

So three notations coexist: 7.5.2 in the quality manual, 2015 on the certificate, 2026 in the audit criteria. It looks messy. It is the same requirement under three signposts.

For buyers and engineers, only one sentence matters: **don't judge a supplier by the version number — ask how the requirement is implemented.** The requirement exists in all four editions. Nobody can opt out.

## 4. Which CNC operations fall on the wrong side

In machining, these are the categories that public sources repeatedly place on that side:

- **Welding and brazing** — strength and penetration cannot be checked part by part; rely on procedure qualification, operator certification, and parameter records.
- **Heat treatment** — structure and strength usually require sectioning or sampling; rely on furnace temperature, hold time, and witness coupons.
- **Anodizing, chemical conversion, passivation, electroplating, painting** — thickness can be measured, but adhesion and corrosion resistance are normally checked periodically on coupons, not on every part.
- **Bonding and composite forming** — strength comes from destructive test coupons.

Coating thickness is the easiest thing to mix up. It belongs to **the verifiable half**, so the drawing should say whether a dimension is measured before or after finishing. Our pieces on [before or after finishing](/knowledge/tech-blog/before-or-after-finishing/) and [anodizing dimension control](/knowledge/tech-blog/robotics-anodizing-dimension-control/) work that number out. You cannot measure adhesion on every part either — keep the two separate.

One caution the other way: cleanliness often gets filed here by reflex, but it sits on **the verifiable side**. The hard part is specifying the test method, not finding a way to test it. Our article on [medical parts machining](/knowledge/tech-blog/medical-parts-machining/) covers that. Put it on the wrong side, and you end up skipping a test you should have run.

## 5. What to ask your supplier

Asking "did you inspect it" covers half the question. The other half needs a different set of questions. Four you can paste straight into an RFQ:

- On this drawing, which operations produce results that cannot be verified afterward? Ask for the list. Do not accept "we inspect everything."
- Who set the process parameters for those operations, and on what basis? You want procedure qualification or coupon records, not feel.
- What triggers revalidation? A material change, a new bath, a new subcontractor, major equipment repair, or parameter drift should all count.
- What records ship with the parts? Coupon reports, heat lots, parameter curves. Do not accept "certificate to follow by email."

The third question is the one most often skipped. **Process validation is not a one-time certificate — when conditions change, you do it again.**

## 6. Why prototype shops should ask earlier

When quantities are small, a destructive coupon is expensive per part, and the subcontracted finishing station has a long queue. It is tempting to say "let's skip it on this batch."

But a process that is out of control fails differently from an out-of-tolerance dimension. A dimension problem affects one part or a few. An unvalidated process means **the credibility of the whole batch is gone** — the fault is in the process, not in any single piece.

Our piece on [why lead times slip](/knowledge/tech-blog/why-lead-times-slip/) writes the gap in the quality system as one line: process control missing, final inspection left holding the bag. It does not blow up in the inspection report. It blows up in returns, rework, and rescheduling.

## Frequently asked questions

**Is 100% inspection useless, then?**
No. For the verifiable half, raising the inspection rate is still worth it. The problem is that it cannot cover the other half. Do not treat full inspection as the whole answer.

**If a supplier holds an ISO 9001 certificate, does that mean this is done?**
The certificate means the requirement exists in their system. It does not mean these particular processes were validated. Look at records: procedure qualifications, coupon reports, and the triggers for revalidation.

**Is a special process just a difficult operation?**
No. The only test is "can the output be economically verified afterward?" A simple operation can land on this side, and a difficult one may not.

## Major references

- ISO press release, September 16, 2026: ISO 9001:2026 published (publication date and revision scope) — iso.org/news/2026/09/ISO9001-2026
- ISO, "ISO 9001:2026: What businesses need to know" FAQ (2015 edition superseded, 3-year transition, harmonized structure retained) — iso.org/quality-management/iso-9001-2026
- National Public Service Platform for Standards Information: GB/T 19001-2016 detail page (current, identical to ISO 9001:2015, review of 2023-12-28 concluded "continue to be valid"); GB/T 19000-2016 search result (current, adoption status) — std.samr.gov.cn / openstd.samr.gov.cn, accessed 11 November 2026
- GB/T 19000-2016 (identical to ISO 9000:2015), 3.4.1 note 5, Chinese rendering of the special process term; the history of ISO 9001 clause 8.5.1 f, plus coupon examples for surface finishing and AS9100 8.5.1.2, from public clause commentary and technical material (Quality Magazine, Dataplate, Wensi Consulting, accessed 11 November 2026; none are facsimiles of the standards themselves)

## Where we stand

Where we can help is specific:

- Before quoting, we flag which operations on your drawing fall on the "cannot verify afterward" side and align with you on them.
- We state up front which records subcontracted heat treatment and surface finishing must return — not after the goods ship.
- We provide the accompanying documents in one pass, following the [inspection and acceptance](/knowledge/tech-blog/inspection-and-acceptance/) standard.

If your parts are stuck on post-plate adhesion, heat-treat hardness, or a supplier who cannot explain how a process is validated, send the drawing. Let's draw that dividing line first.

[Free DFM review and quote](/contact/get-a-quote/)
