---
id: precomputed-cell-attenuation-field
category: canvas
tags: [canvas,legibility,performance,ambient,contrast,generative]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A generative field at full strength everywhere either drowns the copy over it or
gets dialled down until it is invisible. Build a per-cell envelope once per
resize into a `Float32Array` — a soft well where the text sits, full strength at
the edges — and the per-frame cost becomes one read and a multiply. Legibility
with no visible mask edge, and the distance maths leaves the hot loop. Well
radius 0.4–0.6 of the shorter axis.

```js
field = new Float32Array(cols * rows)            // rebuilt on resize only
const d = Math.hypot((c*cellW - fx) / rx, (r*lineH - fy) / ry), k = 1 - d
field[r * cols + c] = d < 1 ? k * k * (3 - 2 * k) : 0
const alpha = Math.min(base * (1 - field[i]), .36)
```
⚠ Rebuild in the resize handler, never the frame loop — a stale field leaves the
well off-centre after a rotation. Cap the final alpha too; attenuation alone
guarantees no contrast floor.

Where the copy is a block flush to one edge rather than a centred mass, the
envelope collapses to one axis: a linear ramp over 80–150px from the text's
outer edge, clamped, with a second ramp holding the field off the bottom rule.
Two `clamp`-shaped multiplies and no distance call at all — worth taking when
the well would only ever be rectangular.
