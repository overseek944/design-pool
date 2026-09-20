---
id: tangent-oriented-mark-field
category: surface
tags: [surface,texture,generative,ambient,detail,svg]
axes: {energy: 2, density: 4, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A field of round dots reads as spray. Give each mark a long axis and rotate it
to the tangent of the curve it samples, and the same field reads as engraving —
direction becomes structure, and the marks shoal into visible ruling where the
tangents agree. Aspect 1.3:1–2:1; past 3:1 it becomes hatching. Add a per-mark
angle jitter scaled by how far the mark sits off the curve, so the form is crisp
at its spine and dissolves at its edges.

```js
const a = Math.atan2(ty, tx) + offAxis * jitter        // jitter ±20–45°
mark.setAttribute('transform', `rotate(${a * 180 / Math.PI} ${x} ${y})`)
```
⚠ Marks under ~2px lose their orientation to antialiasing and the structure
collapses back to spray.
