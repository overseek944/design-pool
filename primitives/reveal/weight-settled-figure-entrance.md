---
id: weight-settled-figure-entrance
category: reveal
tags: [svg,stroke,reveal,chart,entrance,geometry]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A line figure — a grid, a radar web, a diagram frame — can land by tightening
rather than fading. Enter from scale .92–.96 with the stroke 1.5–3× its resting
weight, both easing out together, so the lines visibly draw taut as the figure
settles. Give the outer rim a heavier start and a 10–20% longer run than the
inner lines. From-only keyframes: rest is the base rule.

```css
.grid { transform-box: view-box; transform-origin: 50%;
  animation: settle .55s cubic-bezier(.05,.7,.1,1) both }
@keyframes settle { from { opacity: 0; scale: .94; stroke-width: .27px } }
```
⚠ `stroke-width` repaints every frame — fine for one figure, not a field.
Under `non-scaling-stroke` the start weight is in screen pixels.
