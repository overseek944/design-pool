---
id: tier-ascended-blur-ladder
category: canvas
tags: [canvas,shader,webgl,blur,performance,ambient]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A blur wide enough to turn shapes into light is unreachable by tap count. Buy
the radius with resolution: draw the source into a target at a fraction of
canvas size, run separable passes there, blit up and blur again, ending at full
size. A texel at 1/12 scale is twelve pixels wide, so nine taps reach twelve
times further, and each step up re-blurs the resampling stairs away. Space the taps several texels apart too; a field this smooth has nothing
between them to lose. 2–4 tiers, 3–6 passes each.

```js
const TIERS = [{ scale: 1/12, passes: 6 }, { scale: 1/6, passes: 4 }, { scale: 1, passes: 3 }]
const OFFSETS = [0., 5., 10., 15., 20.]   // texels between taps, not 0–4
for (const t of TIERS) { blur(t, t.passes); blitUp(t) }
```
⚠ Everything above the first tier's Nyquist limit is gone before the first pass
— for grounds and glows, never where the blur must stay legible. Reallocate
targets on resize only.
