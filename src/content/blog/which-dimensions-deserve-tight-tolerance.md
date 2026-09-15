---
title: "Tighter Isn't Better: Which Dimensions Are Worth Paying For"
description: "Treating tolerance as a precision score is the most expensive misunderstanding on a drawing. The standard itself recommends the medium class m for machined metal parts, and reminds you to weigh what the shop can actually hold. This piece explains where the money goes when you tighten one step, how four questions tell you which dimensions deserve it, and what the difference looks like on one flange."
pubDate: 2026-09-15
category: "Machining Tips"
system: "general"
tags: ["tolerances", "fits", "tolerance stack-up", "drawing basics", "cost control", "DFM"]
author: "Eternal CNC Engineering Team"
readingTime: "10 min read"
---

A customer sends a drawing. Twenty-odd dimensions, and nearly every one of them carries ±0.02.

Why? The answer is usually one sentence: the part needs to be accurate.

We do not rush to talk them out of it, and we do not simply accept it either. We ask one question instead: **of those twenty-odd dimensions, which ones have something on the other side?**

## 1. The standard itself tells you not to over-tighten

ISO 2768-1 is the basis for general tolerances, the ones that apply when a drawing does not say otherwise. It splits them into four classes: f, m, c and v, from fine to very coarse.

What is interesting is the recommendation the standard writes for itself: **for machined metal parts, use the medium class m by preference.**

It adds a second line: when choosing a class, you must take into account, above all, the usual accuracy of the shop that will make the part.

Read together, those two lines say one thing — **a tolerance class is not a grade you climb. It is an agreement between you and one specific shop.** Whatever class you ask for, they have to hold it with the machines, tools and gauges they already own.

So when a drawing arrives covered in ±0.02, the first question is not whether the requirement is high. It is where those requirements actually land.

(The m class is ±0.2 mm across the 6 to 30 mm band, roughly ten times wider than a bearing bore at H7. We worked that arithmetic through in [From Idea to Quotable Drawing](/knowledge/tech-blog/from-idea-to-quotable-drawing/), so we will not repeat it here.)

## 2. Where the money goes when you tighten one step

Tighter costs more is a conclusion. Where it costs more is what you can actually decide with. There are at least five places.

**First, stock allowance.** With a loose tolerance, roughing can leave a generous allowance and the final pass cleans it up. Tighten past a certain point and the allowance has to be small, because a heavy final cut will push the dimension out of the band. A small allowance means an extra semi-finishing step in the middle.

**Second, cutting parameters.** Holding a dimension usually means bringing the feed down, and sometimes switching to a smaller, stiffer tool. Cutting time does not scale in proportion.

**Third, measurement.** A ±0.2 dimension is a caliper job. A ±0.01 dimension needs a CMM, a controlled temperature, and possibly inspection of every single part — and every part inspected consumes inspection time.

**Fourth, yield.** The narrower the band, the higher the share of parts that land outside it. A part outside the band is not slightly off; it is scrap or rework, and that cost gets spread across the batch.

**Fifth, environment and stress.** Past a certain point, workholding stress, cutting heat and the release of internal stress in the material start to dominate the dimension. What you need to add at that stage is not precision. It is process steps — stress relief, aging, a temperature-controlled room.

Add the five together and you get one sentence: **what you buy with a tighter tolerance is not a better part. It is more process steps, a slower cycle, more measurement, and a higher scrap rate.**

## 3. What a few thousandths of a millimeter actually means

Everything so far has been arithmetic inside the normal precision range. One step further down, the rules change — **not by getting more expensive, but by the number of shops that can do it at all.**

We have two parts on hand right now, each with one spot on the drawing that is far tighter than the rest. When a drawing like that comes in, the first reaction on the floor is not to price it. It is to work out whether we can reach it.

Put the scale in perspective first. **0.01 mm is a tenth of a human hair. 0.005 mm is half that. 0.002 mm is a fifth of it.** At that order of magnitude you have left machining quality behind and walked into metrology.

| Requirement | Roughly what it is | Normally held with |
|---|---|---|
| ±0.05 | Ordinary precision machining | CNC plus calipers and micrometers |
| ±0.01 | A tenth of a hair | A good machine, semi-finishing, micrometers and a CMM |
| ±0.005 | A twentieth of a hair | A high-precision machine in a controlled room, CMM inspection of every part |
| ±0.002 | A fiftieth of a hair | A high-precision machine, a controlled room, and dedicated measurement |

(The right column is what it takes. It is a necessary condition, not a sufficient one.)

At the 0.002 level, three gates come down at once.

**The machine itself, first.** A dimension is walked out one pulse at a time. The resolution, the thermal growth of the ballscrew, the repeatability of the guides — every one of them has to be an order of magnitude smaller than the number you are trying to hold. An ordinary machining center at this level is not failing for lack of effort; its physical resolution does not reach. So the machines that can are high-end imported precision machines, or domestic machines built for accuracy such as Beijing Jingdiao. That single item rules out most shops — and it is the real reason so many will not take the job. Not that they do not want the money. That they cannot hold it if they take it.

**The environment, second.** You need a temperature-controlled room. Steel expands by roughly eleven to twelve parts per million per degree Celsius — on a 100 mm part, one degree moves the length about one micrometer. The number you are holding sits at exactly that level, so the swing in the room, the warmth of the spindle, even the heat of a hand during measurement, all become part of the error.

**Measurement, third.** To know whether you hit it, you need a CMM and you need to measure it at the same controlled temperature. The gauge's own error has to sit below the number you are trying to hold.

Add the three together and this is no longer one dimension. It brings a machine, a room, a measurement chain, and a whole frozen process along with it.

**That explains something: why a drawing can look easy and quote absurdly high.** The expensive part is not the batch. It is that one dimension, which lifted the production conditions for the entire run — even though everything else on the part is ordinary.

It explains something else too: **why work like this keeps changing suppliers even when the volume is there.** It is not a negotiation that fails. It is that the tolerance cannot be held — and the larger the volume, the more parts have to be held, so a small wobble in yield turns into a scrapped batch. Parts that cannot be made lose money at any unit price.

So the useful question is not whether the tolerance can be held, but which feature it sits on and how it will be verified. The same ±0.002 gets a very different answer depending on those two.

## 4. Every drawing has three kinds of dimensions

Run through those twenty-odd dimensions and they sort themselves into three piles.

| Kind | What it looks like | Worth tightening? |
|---|---|---|
| Mating dimensions | There is something on the other side — a shaft goes in, a face seats, a joint rotates | Yes |
| Stack-up dimensions | Meaningless on their own, but they take part in a tolerance chain that decides whether several parts assemble | Yes |
| Everything else | Self-contained: outer profiles, clearance space, fillets, cosmetic faces | No — tightening buys nothing |

Which collapses to a single test: **is there anything on the other side of this dimension?**

If there is, a tight tolerance buys you a part that assembles. If there is not, it buys you a certificate covered in passing numbers.

## 5. Four questions that tell you whether a dimension is worth paying for

The line between the first pile and the third is rarely as clean as it looks from the drawing. So here are four tests. **All four have to come back yes before it is worth tightening.**

1. **Is there a mating part?** A bearing, a pin, another face that seats against it.
2. **Is it in a tolerance chain?** If the total clearance between two assembled parts is decided jointly by this dimension and another one, it is in the chain.
3. **Is it a functional face or a clearance face?** Faces that locate, seal, rotate or carry load are functional. Faces that exist so the tool can reach somewhere are clearance.
4. **Can you actually verify it?** This is the one that gets skipped.

The fourth deserves its own paragraph. A drawing says ±0.01. Goods-in has a caliper. Now neither you, nor the supplier, nor the drawing knows whether it was held.

**A tolerance you cannot verify is a tolerance you did not specify.** It will not improve quality. It will only raise the price, because you cannot reject the parts when they arrive.

## 6. Write the fit code instead of a bare number

So far this has been about which dimensions deserve a tight tolerance. This section is about how to write the one you decided on.

The same Ø30 bore can be written:

```
Ø30 +0.021 / 0
```

Or:

```
Ø30 H7
```

Identical dimension. Different amount of information.

A fit code describes the relationship between a hole and a shaft, not two isolated numbers. Seeing H7, the shop knows immediately that this is the hole of a mating pair — the reamer, the plug gauge and the measuring method are all standard items. Seeing +0.021 / 0, they have to convert it before they recognise it as H7.

Standard fits come in two systems:

- Hole basis — the hole deviation is fixed at H, with lower deviation zero, and the fit is set by changing the shaft code. H7/g6 is a sliding fit, H7/h6 a close fit, H7/k6 a light press.
- Shaft basis — the shaft deviation is fixed at h, with upper deviation zero, and the fit is set by changing the hole code.

Hole basis is what almost everybody uses, for a practical reason: reamers, plug gauges and inspection tooling are made for it. Shaft basis is not wrong, it just means the shop keeps a second set of everything.

One mistake worth avoiding: writing the direction backwards. A hole labelled h6 and a shaft labelled H7 is a drawing that contradicts itself — the H series belongs to holes, the h series to shafts. When a shop sees that combination there is only one thing they can do, and it is phone you.

So: **wherever a fit code will do, do not write a bare number.**

## 7. The two most common wastes

**The first is tightening the whole drawing.** Changing a general tolerance of ±0.2 to ±0.02 across the board. The price goes up, and the three or four dimensions that decide whether the part assembles are exactly the ones you did not need to touch. Everything else buys you nothing.

**The second is tightening where nobody can measure.** This one is quieter. The drawing looks professional, and quality and price are both unchanged.

One warning in the other direction, though: **too loose is expensive as well.** Leave a mating face at ±0.2 and every part passes on its own, and the assembly still will not go together. Rework, remakes and slipped schedules usually cost more than tightening that one dimension would have at the start.

So the answer is not looser is cheaper. **Both ends are expensive, and there is a correct position in the middle.** The four questions above are how you find it.

## 8. The same flange, two ways

**Version A — looks strict**

```
General tolerance ±0.05
All dimensions ±0.02
```

**Version B — looks loose**

```
General tolerance ISO 2768-m
Bearing bore Ø30 H7
Register Ø50 h6
Perpendicularity of flange face to datum A, 0.02
Position of bolt holes to datum A, Ø0.2
All other dimensions per general tolerance
```

Version B costs less and assembles more reliably. The difference is not tightness. It is that **the money sits on the features that have something to mate with.**

Those features are precisely the ones [Robot Joint and Flange Parts](/knowledge/tech-blog/robot-joint-and-flange-parts/) describes as mattering more than size tolerance — coaxiality, perpendicularity, position — the ones that decide whether a joint binds.

There is one layer further down as well. What those dimensions end up as also depends on whether the part gets a surface finish. A single hard anodize layer can eat most of an H7 band, as we worked through in [Before or After Finishing](/knowledge/tech-blog/before-or-after-finishing/). **However well the drawing is toleranced, the finishing step can still change it.**

## Frequently asked questions

**Isn't a tighter tolerance the safer choice?**

The safer choice is the correct tolerance, not the tight one. The only thing a tight tolerance guarantees is that the price goes up — and the price comes back to you.

**So how tight is too tight?**

There is no universal number, but there is a practical dividing line: the magnitudes a caliper can hold, and the magnitudes that need a CMM. Cross that line and the cost structure changes — not by a little on machining, but in measurement and yield.

**A supplier says they can hold it. Is that enough?**

Follow up with what they will hold it on and how they will verify it. A shop that names the process and the gauge has answered. A shop that says do not worry, our precision is fine has not.

**If I loosen tolerances, will the part come back wrong?**

Possibly, yes. Which is why the critical few dimensions still get called out individually. What you loosen is the rest. **A general tolerance note is a safety net, not a replacement for specifying.**

## Where we stand

We are a precision parts shop in Shenzhen with thirty CNC machines including true 5-axis, turning alongside them, and a finishing network around all of it — anodizing, plating, heat treatment, grinding, wire EDM.

When a drawing arrives with every dimension at ±0.02, we ask which faces mate. That one question usually moves the price. **Not because we want to relax anything, but because among those twenty-odd dimensions there are normally three or four that actually need holding, and the rest of the money is being spent on nothing.**

We do not loosen what should be tight, either. On a mating face we would rather agree the tolerance with you up front than quote low and explain later why it will not assemble.

So if you have a drawing with a batch of dimensions you are not sure about, send it over. We will pick out the few that are worth paying for, let the rest ride on the general tolerance, and then tell you what that saves.

[Free DFM review and quote](/contact/get-a-quote)
