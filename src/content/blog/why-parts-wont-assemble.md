---
title: "Why Your Parts Won't Assemble: Fit, Accumulation, and Datum Transfer"
description: "The drawing is right, machining is in tolerance, yet assembly jams. The cause is not the machine — it is three effects stacking at once: fit, tolerance accumulation, and datum transfer. A clear read on the three root causes of assembly failure."
category: Machining Tips
system: general
pubDate: 2026-09-16
author: Eternal CNC Engineering Team
readingTime: 9 min read
---

You have probably been here: every part measures in tolerance, the CMM report is green across the board, and then at the assembly bench two parts refuse to line up, a screw jams halfway, or the shaft wobbles when it spins.

It is not the machine, and it is not sloppy drafting. It is **three effects acting at once, and amplifying each other** — fit, tolerance accumulation, and datum transfer.

This article does not tell you how to make one dimension tighter. It explains why “every part is good” can still end up as “nothing fits.” Understand these three layers and you will dodge half the assembly traps the next time you draft a build.

## 1. Fit: how many “legal” ways are there for two parts to meet

“Goes in” and “goes in without rattling” are two different things.

Mechanical design splits hole-and-shaft fits into three families:

- **Clearance fit**: the hole is always larger than the shaft, with a little play left over. A bearing outer ring in its housing usually leaves a few to a few tens of microns so it seats and does not bind when warm.
- **Transition fit**: hole and shaft are about the same size; assembly may be loose or tight, held by friction or a dowel pin. Flange faces use this so the surfaces sit flush yet still come apart.
- **Interference fit**: the shaft is larger than the hole and must be pressed or frozen in. Motor rotors on shafts, bushings pressed into aluminum — the connection comes from that squeezed layer.

The catch: writing “Ø30” on a drawing is nowhere near enough. An Ø30 hole against an Ø30 shaft could be a sloppy clearance fit or an impossible interference fit. The difference is those ten-odd microns and the tolerance code that follows — H7/g6, H7/k6, H7/p6, and the like.

Most jam-at-assembly problems trace back to a wrong fit grade: a place that should have had clearance was drawn as transition, or a locating face was treated as something to press hard. We covered how to write fit codes instead of raw numbers in our piece “[Which Dimensions Deserve a Tight Tolerance](/knowledge/tech-blog/which-dimensions-deserve-tight-tolerance/)” — here the point is why the fit grade decides whether it assembles at all.

## 2. Accumulation: every part passes, the sum may not

This is the layer most often missed.

Say five parts stack on a shaft, each with a face-to-face distance called out at 20 ±0.1. On its own, a 0.1 deviation is trivial — anyone can hold it.

But stack five and the total length is 100, with an allowed spread of ±0.5? **No.** In the worst case all five drift long and the total becomes 100.5; all five drift short and it is 99.5. The total can roam from 99.5 to 100.5 — **a single 0.1 deviation has been amplified to 0.5**.

That is a “tolerance chain” (also called a dimension chain). A string of end-to-end dimensions adds their errors head to tail. You inspect each part green, yet at assembly the chain runs long and either leaves a gap you cannot close or a surplus you cannot fit.

The realistic version: dozens of dimensions chain together in an assembly. As long as several happen to drift the same direction, the total goes out. Statistically it usually cancels (each drifts its own way), but **the worst case always exists**, and when it shows up it can scrap a whole batch.

So people who draft assemblies well do not spread tolerance evenly. They **ask first which few dimensions decide whether it fits, and concentrate the tight tolerance there**, loosening the rest.

## 3. Datum transfer: the zero you measure from is not the zero assembly uses

This layer is the sneakiest.

On a part, the drawing fixes a “datum” — say a big plane is A, an axis is B. Every dimension is called out from A and B. That is the **design datum**.

But on the machine, the part is clamped on a different face and cut from that face’s zero — the **process datum**. At inspection, the gauge is set up on a third face — the **measurement datum**.

If all three are the same, error is smallest. In reality they often are not: design calls from the bottom, the machine clamps from the side, inspection squares from the end. Every time the datum changes, a chance to “not line up” appears, and error is quietly stacked on.

**Datum mismatch is like moving house between coordinate systems — you lose a little each move.** The accumulation layer talks about errors adding along one direction; the datum layer says you may not even be adding with the same ruler.

The cure is direct: make design, process, and assembly datums coincide, or at least keep the transfer chain short. What we discussed for mecha joints — “unified datum, one setup” — is exactly eating this layer: the part is clamped once and never flipped, every related feature is cut from the same zero, and the datum never changes from start to finish. Our piece “[Let Precision Grow Itself](/knowledge/tech-blog/let-precision-grow-itself/)” walks through that method.

## 4. When all three blow up: why “looks right” still will not fit

One layer alone, you usually muddle through. The danger is all three stacked:

- The fit was drawn a touch tight (transition where clearance belonged).
- A few dimensions in the chain all drifted long (accumulation over ran).
- Those same dimensions were not even called from the same face (datum transfer added one more cut).

Each layer by itself sits “within tolerance,” yet together they eat the assembly clearance and a screw jams halfway.

**“Every part good yet nothing fits” is not a mystery — it is the inevitable result when three error layers all walk the same direction.** It is rarely one dimension out of spec; it is that no one looked back from the final “turn the screw” step. Every dimension only answers to itself; no one asked where they all sum to.

## 5. How a shop fixes it: stop the problem at the drafting stage

When we take this kind of work, we do not wait for parts to fail at the assembly bench. We move early, in three places:

1. **Allocate tolerance by function, not evenly.** Find the two or three dimensions that decide “will it fit,” keep the tight tolerance on them, and loosen the rest to cheap-and-easy. Every micron you save up front is real money.
2. **Unify the datum, shorten the transfer chain.** One set of datum faces for design, process, and inspection; features that can finish in one setup never get flipped.
3. **Cut critical fit faces in one setup.** Features like the mecha joint’s “two bearing bores must be coaxial” are cut in a single setup, so coaxiality is given by the machine, not dialed in afterward.
4. **Run a clearance check before assembly (DFM).** Before release, work the tolerance chain once: in the worst case, is there enough total length, how much clearance remains. We call this the DFM review, and it catches most “will not fit” problems before production.
5. **Build gauges to the assembly datum.** The inspection fixture’s zero must match the zero used at assembly — do not judge good on a different datum, or you get the “gauge says pass, assembly says no” embarrassment.

Put together, it is one line: **do not treat assembly as something that happens after machining — it is decided the moment you draw the first line.**

## 6. One line for you

**Assembly is never just “put the good parts together” — it tests whether you thought, at the drafting stage, about that last person turning the screw.**

## Where we stand on this

At Eternal CNC we have seen plenty of work where every single part is pretty but the build falls apart at assembly. Our habit is not to rework after the fact, but to run a DFM review the same day your drawing arrives: we work the fit grades, the tolerance chain, and the datum transfer once, and block the “will not fit” risk before the machine ever starts.

If you have a part stuck at assembly right now, or want fewer traps in the next batch of drawings, send us the drawing. **Free DFM review and quote** — we help you answer “will it fit” before production, not after.

[Free DFM review and quote](/contact/get-a-quote)
