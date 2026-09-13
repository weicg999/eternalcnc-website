---
title: "From 10 to 1,000: What Actually Changes When a Robot Part Goes to Production"
description: "Making one good part is easy. Making part 200 match part 1 is the whole job. Where the process changes at each quantity band, what the cost structure does, and why robotics often never justifies a hard fixture."
pubDate: 2026-09-10
category: "Industry Insights"
tags: ["robotics", "prototyping", "low-volume production", "fixtures", "process control", "cost structure"]
author: "Eternal CNC Engineering Team"
readingTime: "9 min read"
system: "robotics"
---

The question we get most often from robot teams, usually about three weeks after a successful pilot build: *"We validated on ten. Now we need two hundred. Can you just run the same thing twenty more times?"*

The honest answer is no — and the reason isn't that anybody did anything wrong. It's that **quantity changes the process, not just the count.** A process that is correct for ten parts is usually the wrong process for two hundred, in the same way that a camping stove is the wrong way to cook for a restaurant.

This article is about where those changes sit, so you can time them instead of discovering them.

## Making one good part is easy

Any competent shop can make one good part. You put your best programmer on it, your most careful operator, you measure everything, you adjust until it's right.

**The hard problem is making part 200 match part 1.** That is a different capability entirely, and it doesn't come from care. It comes from fixtures, a written process, and a measurement cadence — all three of which cost money that only makes sense above a certain quantity.

When you're comparing suppliers on a production quote, this is the thing to ask about. Not "can you make this part" but **"what will you do differently at two hundred than you did at ten?"** A supplier who can't answer that in specifics is quoting you twenty prototype runs.

## The four bands

Robot structural parts don't scale smoothly. They cross thresholds where the right process changes.

| Quantity | What the process looks like | What dominates the cost |
|---|---|---|
| **1–10** (prototype) | No dedicated fixture. Soft jaws, a vise, often one setup on a 5-axis. Programmer attention is the main resource. | Programming + setup + first-article inspection |
| **10–50** (pilot) | Simple dedicated fixture or modular fixturing starts to pay. First written setup sheet. Part-specific tooling. | Machine time, then setup |
| **50–300** (low-volume production) | Hard fixture or a proper modular system. Tool-life management. Sampling inspection. Material bought in one lot. | Machine time + material |
| **300+** (production) | The part should probably be redesigned for a different process — casting, extrusion, or a mill-turn cell. | Material, and the question of whether CNC is still right |

Two things worth noticing in that table.

The first is that **the pilot band is where design problems surface**, not the prototype band. Ten parts is too few to reveal an assembly issue; you hand-picked ten that fit. Fifty forces the question, because at fifty you meet the parts you didn't choose.

The second is that last row. If a structural part is genuinely going to 1,000 a year, CNC bar-and-plate is often no longer the cheapest answer, and a supplier who doesn't raise that is leaving money on your table. We raise it.

## What the cost structure does

In [the ten-station walk](/knowledge/tech-blog/from-drawing-to-cost/) we broke a ten-piece quote open line by line. Here's how those lines move as quantity goes up — using the same example part, indexed to 10 pieces = 100:

| Quantity | Cost index per part | Programming + setup share | Biggest line item |
|---|---|---|---|
| 10 | 100 | ~30% | programming + setup + FAI |
| 50 | ~60 | ~12% | machine time |
| 200 | ~45 | ~4% | machine time + material |
| 1,000 | ~38 | ~1% | material |

Read that as one sentence: **the fixed costs get divided, the variable costs don't.** Programming, setup and first-article inspection are paid once regardless of quantity, so they collapse per-part as the run grows. Material and machine time per part barely move. That's the entire economic argument for volume, and it's also why the drop from 10 to 50 is dramatic and the drop from 200 to 1,000 is modest.

The corollary matters for planning: **most of the available cost reduction happens in the first step up.** Going from 10 to 50 changes your unit cost far more than going from 200 to 1,000 does.

## Five things that break when you scale

These are the failures we actually see, and none of them are visible at ten pieces.

1. **Tool wear becomes a dimension.** At ten pieces one tool lasts the whole job and you never notice it wearing. At two hundred, tools wear across the batch and dimensions drift slowly — not enough to fail any single part, enough to make the last fifty different from the first fifty. The fix is boring: a tool-life count, a change interval, and offset compensation that's written down rather than remembered.

2. **The material lot becomes a cosmetic and a certification problem.** Ten parts out of one bar match each other. Two hundred across four deliveries of 6061 might not, visibly, once they're anodised — which is why we keep coming back to buying the whole run's material in one lot, and to [what anodising does to colour](/knowledge/tech-blog/robotics-anodizing-dimension-control/). If you need material certs, that's also a purchasing decision made before the first chip, not after.

3. **The outsourced step becomes the bottleneck.** At ten pieces, anodising is an errand. At two hundred it's a scheduled batch with a queue behind it, and one re-work loop is a two-week delay instead of a two-day one. Whatever you think your lead time is, the anodiser's schedule is a bigger part of it than the machine shop's.

4. **Inspection has to be planned.** Full first-article on part one, then a sampling plan: which dimensions get measured every part, which every tenth, which only at setup. Without that plan you either measure everything forever (expensive) or nothing (how you ship a bad batch).

5. **Design freeze gets expensive.** Once a hard fixture is built, changing a locating feature means changing the fixture. This is the real cost of "just one more revision."

## What to freeze, and when

- **Freeze before the pilot run:** datums, critical tolerances, material, surface treatment spec. These four determine the fixture and the tooling.
- **Still negotiable during pilot:** non-critical dimensions, cosmetic notes, hole counts on faces the fixture doesn't locate off, thread sizes.
- **Expensive after fixture build:** anything the fixture touches or locates on.

And one piece of advice that saves more money than any of this: **if you already know there's a rev B coming, say so at quote time.** We will keep the process deliberately soft — soft jaws instead of a hard fixture, modular instead of dedicated — and accept a slightly higher unit cost to keep your revision cheap. A supplier who builds you a beautiful dedicated fixture on a part you're about to change has done you no favours.

## Why robotics often never justifies a hard fixture

Here's the part that's specific to this industry, and it runs against standard manufacturing advice.

Standard advice: as volume rises, invest in a dedicated fixture and amortise it. In consumer or automotive production that's obviously right — you're making 50,000 of one thing.

Robotics doesn't behave that way. A robot company's structural parts typically live at **20 to 200 pieces before the design changes**, because the whole machine is still evolving: the joint gets a bigger bearing, the link gets lighter, the harness moves, and rev B arrives. A hard fixture amortised over 150 parts and then scrapped is worse than no fixture at all.

So the right strategy for most robot parts is **design the process for change**:

- Modular or soft fixturing instead of dedicated.
- [One-setup 5-axis](/knowledge/tech-blog/robotics-5-axis-one-setup/) instead of a multi-op fixture — you get fixture-grade consistency without owning a fixture you'll throw away.
- Keep the setup sheet a *document*, so the process is repeatable even though the hardware is generic.
- Buy material in one lot per revision, so each revision at least matches itself.

That's a deliberate trade: slightly higher unit cost, dramatically lower cost of being wrong. For a machine that's still being figured out, it's almost always the right one.

## Frequently asked questions

**Can you hold the same unit price at 200 that you quoted at 10?**

No, and you shouldn't want us to. At 200 the price should be substantially lower per part — that's the fixed costs dividing out. But the process underneath is different, and if a quote comes back with the same number at both quantities, somebody has either padded the 200 or underbid the 10.

**Should we just order 200 now to get the better price?**

Only if the design is frozen. Otherwise you're buying 200 of a part you're about to change, at the exact moment your cost of change is highest. Order the pilot quantity, learn what the pilot teaches you, then commit. The volume discount will still be there.

**Do we need a fixture at 20 pieces?**

Usually not. Twenty is soft-jaw or one-setup territory, unless a tolerance genuinely can't be held otherwise — and if that's the case, the tolerance is worth a second look before it's worth a fixture.

**How do you actually guarantee part 200 matches part 1?**

Four things, none of them heroic: a fixture or a documented repeatable setup, a written setup sheet nobody improvises around, a measurement cadence with a sampling plan, and one material lot. That's it. Consistency is a system, not a person — which is also why you should be suspicious of any supplier whose answer to this question is the name of their best machinist.

## Where we fit

We live in the 10-to-300 band, which is exactly where robot companies live. We'll tell you when a fixture is worth building and when it isn't, when your part has outgrown CNC, and when a revision is likely enough that we should keep the tooling soft on purpose.

Send the STEP, the PDF, and — if you know it — the quantity you think you'll actually need over the next year. That last number changes the process more than the drawing does.

[Get a free DFM review and quote](/contact/get-a-quote)
