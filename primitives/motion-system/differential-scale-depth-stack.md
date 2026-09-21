---
id: differential-scale-depth-stack
category: motion-system
tags: [motion,transform,scale,depth,parallax,scroll]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Depth on a push needs no `perspective` and no Z. Stack co-located layers on one
`transform-origin` and give each its own scale *rate* off the same driver: the
near layer outruns the far one, the gap opens as the push deepens, and the
reader reads travel rather than a picture getting bigger. One scalar in, one
multiplier per layer, every layer still a flat composited box. Spread the rates
2–4× apart; past ~5× the far layer looks static.

```css
.far  { transform: scale(var(--push)) }                     /* 1 → 1.5 */
.near { transform: scale(calc(1 + (var(--push) - 1) * 3)) } /* 1 → 2.5 */
```
⚠ Layers separate at their shared edges, so the stack must be clipped by a
parent — only the far layer may reach the frame.
