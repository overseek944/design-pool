---
id: irrational-stride-variation
category: canvas
tags: [canvas,generative,field,deterministic,correctness,scatter]
axes: none
cost: 1
seen: 4
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

A stride gives one value per index, which is not enough when generation needs a
*stream* — several draws per element, rejection loops, or a distribution that
has to be shaped (`cbrt` for a solid, `sqrt` for a disc). Seed a small integer
generator instead and take values in a fixed order: still identical on server
and client and across reloads, still no stored array, and the call site reads
like `Math.random()`. Re-seed from the same constant to replay a layout exactly.
```js
let s = 1337
const rnd = () => ((s = 16807 * s % 2147483647) - 1) / 2147483646
```
⚠ Order-dependent — inserting one draw reshuffles everything after it, so a
generator under revision changes layout on edits that look unrelated.

Both forms key on a linear index, which a *lattice* does not have: change the
column count on resize and every cell takes a new value, so a field reshuffles
at each breakpoint rather than reflowing. Key on the cell's own coordinates
instead — one hash of `(row, col)` — and a cell keeps its variation no matter
how many neighbours it gains or loses. The GLSL sine hash ports directly and
needs no table.
```js
const h = (r, c) => { const v = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453
                      return v - Math.floor(v) }                    // 0…1
const size = base + (h(row + 1, col + 1) - .5) * 2 * spread
```
⚠ Offset the inputs off zero. At `(0, 0)` the sine is exactly 0 and the first
cell is not merely predictable, it is the same across every field on the page.
