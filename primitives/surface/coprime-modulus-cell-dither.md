---
id: coprime-modulus-cell-dither
category: surface
tags: [pattern, texture, grid, nth-child, dots]
axes: {energy: 1, density: 4, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A grid of real elements reads as machine-made when every variation lands on the
same column. Modulate it with `nth-child(an+b)` and pick `a` coprime with the
column count: matched cells walk one step per row and never stack, so a couple
of rules scatter opacity and weight with no per-cell markup and no seed. Against
12 columns, 5, 7 and 11 scatter; 4 and 6 stripe. Let the rules overlap — a cell
matching two is the rarest.

```css
.field i:nth-child(5n+1), .field i:nth-child(7n+3) { opacity: .38 }
.field i:nth-child(11n+2) { background: var(--accent) }
```
⚠ Coprimacy is against the *rendered* count: a grid dropping 12 → 6 makes 6 a
divisor again and stripes. Restate the moduli there.
