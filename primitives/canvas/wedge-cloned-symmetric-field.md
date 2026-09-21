---
id: wedge-cloned-symmetric-field
category: canvas
tags: [canvas,generative,symmetry,field,particles,cheap]
axes: {energy: 1, density: 4, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A ring of marks placed from one pass of random draws clumps unevenly, and no
amount of reseeding stops one half reading denser than the other. Scatter
inside a single sector of `2π/k` instead, then emit those members `k` times,
each rotated by one sector: the field gains exact rotational symmetry, the wrap
is seamless because the sector angle divides the circle, and only a `k`-th of
the values are drawn. Folds 3–6 read as deliberately symmetric; 8–12 as an even
ring whose repeat is not findable.

```js
const seg = 2 * Math.PI / K
const base = Array.from({ length: n }, () => ({ r: r0 + spread * rnd(), th: rnd() * seg }))
for (let s = 0; s < K; s++) for (const p of base) draw(p.r, p.th + s * seg)
```
⚠ A per-member phase clones too, so the field pulses in `k` locked groups —
offset phase by `s` as well, or the symmetry shows the moment it animates.
