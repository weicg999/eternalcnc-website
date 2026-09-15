---
title: "Before or After Finishing: The One Line Most Drawings Forget"
description: "The easiest thing to leave off a finish spec isn't the thickness — it's the tolerance basis. Is that dimension before or after the coating? Leave it blank and the machine shop, the finisher and incoming inspection each assume something different. Here are the three ways to write it, which finishes move dimensions in which direction, and the arithmetic behind a post-finish callout."
pubDate: 2026-09-13
category: "Machining Tips"
system: "general"
tags: ["surface finishing", "tolerances", "drawing callouts", "plating", "anodizing", "incoming inspection"]
author: "Eternal CNC Engineering Team"
readingTime: "11 min read"
---

A batch got scrapped, and there is no one to blame on the drawing.

A shaft, Ø20 k6, with a note calling for 20 µm of electroless nickel. The machine shop turns it to Ø20.005 — comfortably inside the band (+0.002 / +0.015). The plater runs it as written, 20 µm. It comes back at Ø20.045.

Thirty microns over the top limit. The bearing won't go on.

Nobody did anything wrong. The machine shop shipped a part that passed. The plater followed the callout. Inspection measured against the drawing.

What the drawing left out was one line: **is that k6 before plating, or after?**

## 1. Three parties, three defaults

This fails over and over because every link in the chain carries a default that makes sense on its own:

| Party | Default reading | Why it's defensible |
|---|---|---|
| Machine shop | Tolerance is **before** finishing | What I ship has to pass |
| Finisher | I own thickness and appearance | I don't move the dimension, and I shouldn't own it |
| Incoming inspection | Tolerance is **after** finishing | I measure the part that has to assemble |

All three are reasonable. None of them are compatible.

**If you don't state it, you are betting that one of them will read your mind.** They won't. Each will assume it's the drawing's problem.

One more thing while we're here: applying anodizing intuition to plating gets you twice as wrong. An anodic film grows half out and half in. **Electroless nickel and zinc plate grow entirely outward.** At 20 µm, anodizing moves a diameter by 20 µm; nickel moves it by 40.

## 2. Three ways to write it

| How | What goes on the drawing | Upside | Cost |
|---|---|---|---|
| Before finishing | Dimension, noted "before finish" | Shop machines straight to size | Finished part may be out; it surfaces at assembly |
| After finishing | Noted "after finish", or simply left silent | Assembly is protected | Shop has to back-calculate stock; coating variation eats the tolerance |
| Both | Same feature, two ranges — before and after | The only version nobody argues about | You have to do the math, and hold the finisher to a thickness band |

The rule I'd give anyone: **any dimension that has to assemble gets both.** Purely cosmetic surfaces are fine with "after finishing" alone.

Writing both splits the responsibility cleanly — the shop knows how much stock to leave, the finisher knows how tight the thickness has to be, inspection knows which state to measure. One extra line buys you a whole argument.

## 3. Different finishes move dimensions in different directions

This is the layer people skip: finishes don't just differ in how much they move a dimension — they differ in **which way**.

| Finish | Direction | Typical amount | Watch for |
|---|---|---|---|
| Anodize, Type II | Half out, half in | Diameter ± thickness (12 µm → ±12 µm) | Aluminum only |
| Hard anodize, Type III | Same, larger | Diameter ± 25–100 µm | Lowers fatigue strength in high-strength aluminum |
| Electroless nickel | Entirely outward | Diameter + 2 × thickness (5–50 µm) | Very uniform, coats blind holes |
| Zinc plating | Entirely outward | Diameter + 2 × thickness (8–25 µm) | Hydrogen embrittlement on hardened steel |
| Black oxide | Barely moves | ~1 µm | Not protection on its own — oil after |
| Passivation (stainless) | No buildup | — | A cleaning step, not a coating |
| Electropolishing | **Removes** material | A few µm | Opposite direction; edges lose more than flats |
| Bead blasting | Essentially no size change | — | Thin walls can be distorted |
| Heat treatment | **Distorts, unpredictably** | Not predictable | Hardened parts usually get ground afterward — another handoff |

The one-line version: **anodize and plating grow, electropolishing shrinks, heat treatment wanders.**

Put several of those on one part and leave the basis unstated, and no shop on earth can hold it.

## 4. The arithmetic of a post-finish callout

Say you decide to dimension after finishing — the choice that protects assembly. Now the math starts.

Back to Ø20 k6. The band is +0.002 / +0.015, so the finished part may land anywhere in Ø20.002–Ø20.015. Total width: **13 µm**.

Before-plate size = finished size − 2 × thickness.

The trouble is that factor of two: **any variation in coating thickness doubles at the diameter.**

Now suppose the callout just says "electroless nickel, 20 µm." The plater won't aim at 20. Thin means rework; thick means nobody complains. **So what actually ships tends to run 20–28 µm, biased to the top.**

At 20 µm, the shop needs to hit Ø19.962–Ø19.975.
At 28 µm, it needs Ø19.946–Ø19.959.

Same drawing. Which one is the shop supposed to machine to? It either guesses or calls you.

**That's the hidden cost of dimensioning after finishing: you also have to give the coating a thickness band, and it has to be narrow enough for a shop to hit.**

Try 20–24 µm: the pre-plate range becomes Ø19.954–Ø19.975 — **21 µm wide, wider than the 13 µm k6 band it has to fit inside.** The arithmetic doesn't close.

Which is why experienced drawings usually end up at the third option:

**On a tight-tolerance mating surface, mask it. Don't plate it at all.**

k6 gives you 13 µm of room. That isn't enough to absorb any coating with real variation. Rather than juggle the numbers, keep the coating off that face.

## 5. Not just aluminum

Aluminum anodizing is the familiar case, but steel and stainless leak in their own ways.

**Zinc on steel.** Three things to write: thickness by standard grade (Fe/Zn 8 means 8 µm), the standard itself (GB/T 9799, equivalent to ISO 2081), and the de-embrittlement requirement for hardened parts. **Hydrogen embrittlement is the quietest way a plated high-strength steel part fails.**

**Passivation on stainless.** Easier: cite a standard such as ASTM A967 and state the purpose — removing free iron. Passivation adds essentially nothing, so dimensions can safely be called out as finished.

**Heat treatment.** Two things: final hardness (HRC or HV) and the condition (through-hardened, solution treated and aged, quench and temper). What actually bites is **sequence** — heat treatment distorts, and hardened steel won't take a normal cutter, so there is usually a grinding step afterward. Put heat treatment before finish machining and say so: "grind to final dimension after heat treatment."

**Electroless nickel.** Beyond thickness, give the phosphorus band: low-phos (1–4%) is harder, high-phos (10–13%) more corrosion resistant, mid-phos sits between. Leave it out and you have handed the decision to the plater.

## 6. What a complete callout looks like

Steel this time, to avoid repeating the aluminum example:

```
Material: 45 steel
Heat treatment: quench and temper to 28–32 HRC (grind to final dimension after HT)
Finish: zinc plate per GB/T 9799 Fe/Zn 8, yellow chromate, 8–12 µm
  – Ø25 h6 journal: MASK — no plating
  – All other surfaces: plate as noted
  – Hardened part: de-embrittle within 4 h of plating (180 °C × 4 h)
Surface roughness: Ra 1.6, grind marks axial
```

Four lines in there are doing the real work:

1. **"grind to final dimension after HT"** — pins the basis to the final state
2. **"MASK — no plating"** — solves a tight tolerance with masking instead of arithmetic
3. **"8–12 µm"** — gives the plater a band to hold
4. **"de-embrittle"** — the failure mode nobody sees coming

Leave all four off and the plater coats the whole part by default, the Ø25 h6 lands at Ø25.016–Ø25.024 and misses, and nobody knows to bake it.

## 7. Neither basis is free

There's a version of this article that tells you post-finish tolerances are best practice. They aren't. They're a trade.

Dimensioning after finishing protects the assembly and pushes risk upstream into your machining cost. Dimensioning before finishing is easy to machine and pushes risk downstream into assembly. Neither is free. The right answer depends on which failure costs more — a scrapped batch, or a line that stops.

What is best practice is stating which one you mean.

## 8. FAQ

**If the drawing doesn't say, what will the shop assume?**

Finishers generally work to thickness and appearance and leave tolerances alone. Machine shops, protecting themselves, tend to treat the tolerance as before-finish. Stack those two and you get the shaft from the opening. Don't count on anyone to infer it.

**Can I just give the tolerance and skip the finish type?**

No. The basis and the process have to appear together — different finishes move dimensions in different directions, by different amounts. "Ø20 k6" with no process named tells a shop almost nothing.

**Isn't after-finishing safer?**

Safer for assembly, harder for machining. It pulls coating variation into the tolerance band. Use it and you have to tighten the thickness band too.

**Can a thick coating and a tight tolerance coexist?**

Yes — three ways: mask it, open the tolerance, or change the process. Insisting that machining compensation covers it is usually a bet on coating consistency.

**Does heat treatment need a stated basis?**

Yes, and it matters more than plating. Heat treatment distorts unpredictably, and hardened parts usually get ground afterward. Put it before finish machining and state that dimensions apply after grinding.

**Should surface roughness be specified alongside tolerances?**

It's its own callout, but be careful when it sits next to a finish: anodizing and plating don't hide tool marks, they amplify them. If appearance has to be consistent, specify the prep — blast grit size, or an explicit Ra — as carefully as the color.

## 9. Where we stand on this

We machine to the basis your drawing states, and we raise it at quote time: which dimensions will move in finishing, by how much, and whether masking or compensation is the better call.

The one thing we try not to do is ship a batch that measures fine in our inspection room and binds up on your assembly line. When a callout contradicts itself — an h6 journal with zinc plating, an H7 bore with hard anodize — we'd rather say so during DFM than explain it afterward.

Send us the STEP and the PDF. If the drawing carries a finish note, we'll tell you what it does to your fits before we quote.

[Free DFM review and quote](/contact/get-a-quote)
