---
id: unfloored-zero-scale-bars
category: layout
tags: [chart,axis,label,correctness,accessibility,restraint]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---

A comparison whose whole point is dominance breaks the moment the small values
are floored to a legible bar height — the floor is a lie told at exactly the
place the chart is read. Keep one true-zero scale, let a 1% value resolve to
the two or three pixels it earns, and lift every number off its bar into a band
at a fixed offset from the baseline. A mark too short to hold its label still
carries one, and the degenerate hairline *is* the finding. Give the dominant
bar 55–75% of the plot box.

```js
const k = plotH * .66 / maxAbs      /* 0.55–0.75 of the box */
const h = Math.abs(v) * k           /* never Math.max(h, MIN_BAR) */
```
⚠ Needs a drawn zero rule and a printed value at every mark — a 2px bar states
nothing alone, and hue is not a sign a screen reader hears.
