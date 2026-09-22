---
id: split-step-size-ramp
category: type
tags: [type, scale, tokens, density, hierarchy]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

One step function cannot serve a type scale's whole range. A ratio — 1.2–1.33× —
is right above roughly 16px and useless below it: at 10px it yields three rungs
before the legibility floor, where dense chrome needs six or eight. Run an
additive ladder under that hinge instead, 0.5px per rung to ~15px, ratio above.
The narrow band a badge, a caption and a control all share then has rungs enough
to rank them, and the display end keeps its proportion.

```css
--ui-1: 9px; --ui-2: 9.5px; --ui-3: 10px; --ui-4: 10.5px;  /* +.5px to 15px */
--d-1:  18px; --d-2: 24px;  --d-3: 32px;                   /* ×1.33 above    */
```
⚠ Half a pixel is a rounding difference at 1dppx — adjacent rungs rank reliably
only where weight or ink separates them too. The floor belongs to the reader,
not the ramp: never drop under 9px to buy one more rung.
