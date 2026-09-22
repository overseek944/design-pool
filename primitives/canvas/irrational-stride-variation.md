---
id: irrational-stride-variation
category: canvas
tags: [canvas,generative,field,deterministic,correctness,scatter]
axes: none
cost: 1
seen: 10
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

Quantise the value wherever the field is read as data rather than as scatter. A
continuous jitter on opacity or size makes every mark unique and so unrankable;
the same hash bucketed into 3–4 tiers — thresholds near 25% and 60% — reads as a
scale with a legend behind it, and the tiers are tokens a caller can retint. An
integer hash suits the bucketing better than a fractional stride: one multiply
by a large odd constant, then a modulus, and adjacent indices land at opposite
ends of the range instead of walking the scale.
```js
const tier = i => { const h = Math.imul(i, 0x9e3779b1) >>> 0
                    return h % 97 < 26 ? .62 : h % 97 < 62 ? .82 : 1 }
```
⚠ A modulus that shares a factor with the stride collapses the tiers onto a
short cycle — keep it prime, and count the buckets over the real index range
before trusting the mix.

Low discrepancy is the wrong target where the field should read as organic.
Even scatter looks printed; scatter that clumps looks placed by hand. Draw one
anchor, spend it on a run of 4–9 marks jittered a few mark-widths around it,
then draw the next — the field gains voids and knots for one counter, and run
length is the only knob. Jitter 1.5–3× the mark size; runs past ten read as a
blob rather than a cluster.
```js
if (--left <= 0) { ax = rnd() * w; ay = rnd() * h; left = 4 + (rnd() * 6 | 0) }
p.x = ax + (rnd() - .5) * 2 * J; p.y = ay + (rnd() - .5) * 2 * J
```
⚠ A cluster anchored near an edge loses half its marks to the clamp and that
side reads as thinner — inset the anchor range by the jitter, not the marks.
