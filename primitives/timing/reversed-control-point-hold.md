---
id: reversed-control-point-hold
category: timing
tags: [motion,easing,timing,hover,transition]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Nothing in `cubic-bezier(x1,y1,x2,y2)` requires `x1 < x2`. Cross them — the
first control point's x near 1, the second's near 0 — and the curve becomes an
S far steeper than any conventional ease-in-out: about a tenth of the travel in
the first 40% of the time, half of it in the middle fifth, then a long settle.
A 450–600ms transition reads as instant response with a long tail rather than
as lag. A `y1` a hair below zero adds two or three percent of anticipation
before the burst.

```css
transition: transform .5s cubic-bezier(1, -0.02, 0.01, 0.99);
```
⚠ The hold is long enough that a pointer leaving mid-curve appears not to have
triggered anything — only for states that reverse on the same curve.
