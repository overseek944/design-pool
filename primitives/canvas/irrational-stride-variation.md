---
id: irrational-stride-variation
category: canvas
tags: [canvas,generative,field,deterministic,correctness,scatter]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`Math.random()` for per-index variation costs a stored array, a different result
on server and client, and visible clumping. Use the fractional part of the index
times an irrational stride — stateless, identical every reload, low-discrepancy,
so hundreds of marks spread evenly instead of pooling. Sum two strides and
subtract one for a signed, centre-weighted offset. Strides 0.3–0.9, a fresh pair
per attribute.

```js
const f = x => x - Math.floor(x)
const jit = i => f(i * .75487767) + f(i * .56984029) - 1   // −1…1
const x = cx + jit(i) * ampX
```
⚠ A stride near a simple fraction lays the values on a visible lattice — draw
200 before trusting one.
