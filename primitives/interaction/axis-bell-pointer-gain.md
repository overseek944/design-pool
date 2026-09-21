---
id: axis-bell-pointer-gain
category: interaction
tags: [interaction,pointer,falloff,data,hover,detail]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A row of elements already carrying values can answer the pointer without any
being selected. Multiply each one's own value by a bell centred on the pointer's
position along the row's one meaningful axis — gain, not replacement, so the
data survives under the cursor and the row bulges as though amplified rather
than lighting a hit target. Park the centre far outside on `pointerleave` and
the bell decays through the same arithmetic, no branch and no leave animation.
Radius 90–180px, peak 1.5–2×.

```js
let px = -1e4                                    // parked, not a null check
el.addEventListener('pointerleave', () => px = -1e4)
const u = (x[i] - px) / R
bar[i].style.transform = `scaleY(${v[i] * (1 + A * Math.exp(-u * u))})`
```
⚠ Pointer-only: decorate a row already legible at rest, never make this how a
value is read. A style write per element per frame is the cost — window the loop
to the indices the bell reaches.
