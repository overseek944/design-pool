---
id: tangent-oriented-mark-field
category: surface
tags: [surface,texture,generative,ambient,detail,svg]
axes: {energy: 2, density: 4, weight: 2, finish: 5}
cost: 3
seen: 2
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

Where there is no curve to sample, a hash of the mark's own cell buys the same
escape from uniformity: choose between two shapes at an uneven split — about
75/25, so the rarer one reads as an accent rather than a checkerboard — and take
a size band of 0.6–1.2× from a second hash at a different offset. The field
becomes a set of things instead of one thing repeated, and because the hash is
positional it holds still across frames and resizes, which per-draw randomness
does not.
```glsl
float h = hash21(cell + 19.3), s = mix(0.20, 0.34, hash21(cell + 11.8));
float m = h < 0.76 ? square(p, s) : diamond(p, s * 1.18);
```
⚠ One hash fed two offsets, not one hash reused — an unshifted second call makes
shape and size agree and the field bands.
