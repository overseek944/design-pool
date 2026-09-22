---
id: radius-linked-point-field
category: canvas
tags: [canvas,svg,field,points,generative,depth,texture]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scatter of points reads as noise. Join every pair closer than one radius `R`
and it reads as structure: degree follows local density, so clusters come out
of the distribution itself, with no layout pass. Give each link alpha
`A · (1 − L/R)` — cutoff and falloff share the constant, so the longest link is
already invisible and the field has no edge. `R` at 1.0–1.3× the mean
point spacing lands degree near 3–4; `A` .4–.6, with 10–15% of nodes in the
accent a size step larger.

```js
for (const [a, b] of pairs(p)) {              // every pair, once
  const L = Math.hypot(b.x - a.x, b.y - a.y)
  if (L < R) link(a, b, A * (1 - L / R)) }    // alpha reaches 0 at R
```
⚠ Pairing is O(n²) — fine for a few thousand points solved once, fatal per
frame. Below ~0.9× mean spacing the graph shatters into isolated pairs and
reads as a render fault.
