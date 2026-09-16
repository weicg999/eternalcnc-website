---
title: "Let Precision Grow Itself: Design Rules for Mecha Beginners"
description: "The last piece covered which joint to build first. This one covers how to get that one joint made accurately. You do not need tolerance symbols yet. Three ideas — datum, one setup, spigot — solve most beginner assembly problems, and together they beat writing a page of 0.01s."
pubDate: 2026-09-16
category: "Machining Tips"
tags: ["robotics", "mecha", "datum", "one setup", "spigot", "DFM", "getting started"]
system: "robotics"
author: "Eternal CNC Engineering Team"
readingTime: "8 min read"
---

You finished a joint. The 3D model looks great, every dimension is called out, you send it to a shop. The parts come back, you press the bearings in, and the shaft turns stiff, or binds, or will not go in at all.

You did not draw it wrong. You left out one thing.

The last piece was about which joint to build first. This one is about how to get that one joint made right. You do not need tolerance symbols yet. Three ideas solve most beginner assembly problems, and once they are in place, the shop does the hard part for you.

## 1. Why a drawing that looks correct can still bind

Here is the failure shape.

Two bearing bores, both dimensioned, both toleranced, say both Ø30 H7. The shop makes them, and each bore is within spec on its own. You assemble, press the shaft in, and it will not turn.

The problem is not the size of either bore. The problem is that the drawing never said **which feature the two bores are aligned to**.

Diameter controls how big the hole is. What diameter cannot control is whether the centers of the two bores fall on the same line. Tip that line a little and the shaft is forced crooked.

That “relative to what” question is the first of today’s three ideas: the datum.

## 2. Datum: give the ruler a zero

Datum sounds technical. It is one sentence: **every dimension needs an agreed starting point.**

You measure your height from the floor. Same person, measured from the seat of a chair, gives a different number. So a dimension is only meaningful once both sides agree where to start.

Parts are the same. A part carries many dimensions, like “this hole is 30 mm from that face.” Where does the 30 mm start? There has to be an agreed starting face or line. That is the datum.

So whenever your drawing says “this must be flat, straight, aligned,” add “relative to which face.” That “which face” is the datum.

**A flat, straight, or aligned call with no reference is not a call at all.**

Picking the datum also matters for the shop: choose a flat, large, easy-to-clamp face as datum A. Do not pick a small, angled, curved face. If the shop cannot clamp it steady, everything after is guesswork.

## 3. Coaxial: the two bores must share one line

Back to the binding joint. For it to turn smoothly, the two bearing bores must sit on **the same axis.**

Plain version: if you draw a line through the center of bore 1, it should pass exactly through the center of bore 2. Tip it and the shaft is forced off.

But “coaxial” cannot stand alone. You have to say **which datum the coaxiality is judged against.**

If you only write “bores coaxial” without naming a datum, the shop picks its own starting point. If that point differs from the one in your head, both bores look fine and the shaft still binds on assembly.

That is where the datum from the last section earns its keep: hang coaxiality on the datum A you specified, and the shop knows what to measure against.

## 4. One setup: get coaxiality for free

Once you know you need coaxiality, the beginner move is to tighten tolerances: 0.01, 0.005, 0.002, smaller and smaller, hoping tighter means more accurate.

There is a cheaper and more reliable way that does not lean on tolerances at all: **one setup.**

Meaning: the part is clamped, then not released or flipped. Both bearing bores are cut in one pass with the same tool. Because they are made in the same clamping, they are on the same axis by construction. The only error left comes from the machine itself, which is small, not from you re-clamping, re-indicating, and re-establishing the datum each time.

Flip the part three times, re-indicate each time, and each re-indication adds a little error. Stack a few and coaxiality becomes a matter of luck.

So the drawing trick is: **place the two bearing bores on one axis, reachable from one opening, so the shop can do them without flipping.** That one choice beats a page of 0.01s.

## 5. Spigot: let the part center itself

One more move turns a hard job into an easy one.

Instead of forcing the shop to hold the two bores absolutely coaxial, add a raised ring or recess at the mating location. The trade calls it a **spigot.** The bearing or mating part drops in and centers itself against that shoulder, and the accuracy demand drops.

Analogy: lining a shaft up with two rings by eye is tedious. Put a guide sleeve between them and the shaft slides in along it. The spigot is that guide sleeve.

For the shop, a spigotted part can carry looser tolerances, cost less, and yield better. It is a discount you give yourself at the design stage.

## 6. Put the three together

String it together. When you draw a joint housing, follow this shape:

- **Use the bottom face as datum A.** Pick the largest flat face; dimension everything from it.
- **Put the two bearing bores on one axis.** One setup finishes them; coaxiality comes free.
- **Add a spigot at the bore mouth.** On assembly it self-centers, trading “absolutely coaxial” for “drops in and aligns.”

Do those three and your joint is essentially “accurate if built to print,” not dependent on a veteran’s touch.

One line to close on:

**One setup plus spigot centering plus a unified datum beats writing a pile of 0.01s.**

(How errors behave once N joints stack up, and how the assembly datum propagates link by link, is the assembly piece’s job. Not opening that here.)

## 7. Frequently asked questions

**How many datums do I need to call out?**

Start with one. The largest flat face as A solves most cases. Add B and C only when you need to control a bore relative to another axis.

**Is tighter tolerance always better?**

No. Every 0.01 you specify raises price and lowers yield. Tighten only where the shaft must turn, the face must slide, or the parts must mate. Loosen the rest.

**Does a spigot make the part more complex and costly?**

The opposite. A spigot moves the accuracy demand from “absolute machining” to “assembly location,” which usually makes machining cheaper. One small shoulder saves the labor and scrap of chasing coaxiality by hand.

## Where we stand on this

Joint module housings, output flanges, sensor brackets: we make these every day, so the above is not textbook. It is quoted work.

If you already have a joint drawing, even one joint, one piece, send it over and we will run a free DFM review. Which tolerances are genuinely necessary. Which can be opened up. Which dimensioning choices quietly double the price. It costs you a few days and may save your first version.

[Free DFM review and quote](/contact/get-a-quote)
