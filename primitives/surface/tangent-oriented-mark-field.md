---
id: tangent-oriented-mark-field
category: surface
tags: [surface,texture,generative,ambient,detail,svg]
axes: {energy: 2, density: 4, weight: 2, finish: 5}
cost: 3
seen: 4
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

Scale the angle jitter by the *signal* driving the field rather than by distance
from a curve, and the field narrates its own strength: marks lie at their own
angles where the drive is weak and snap into alignment where it is strong, so
order appears to emerge rather than to be applied. `(1 − t)²` on the scatter and a
matching growth in mark length say it twice. Scatter 100–150° at zero signal.
```js
const a = Math.atan2(fy, fx) + (h - 0.5) * 2.6 * (1 - t) * (1 - t)
const len = LEN + GROW * t                       // short and loose → long and ruled
```
⚠ At full scatter the marks must still be long enough to read as oriented, or the
weak region degrades to the spray this technique exists to avoid.

A uniform mark reads as print; a material reads as grains. Give each mark a stable
per-position hash and spend it on three things at once — length ±40–50%, its own
darkness a shade either side of the field value, and for roughly a third of them a
smaller companion speck offset *perpendicular* to the long axis. Beside, never on
top: a collinear second mark just reads as one longer mark.
```js
const half = (LEN + GROW * t) * (0.55 + 0.9 * h2) * 0.5
if (h3 > 0.56) push(x - dy / half * off, y + dx / half * off, dx * 0.45, dy * 0.45)
```
⚠ Derive the extra hashes from the first by a multiply-and-fract, not by a second
call at the same coordinate — an unshifted hash makes length and darkness agree
and the field bands.

Variant — orient to the mark's own velocity when there is no curve to sample.
Rotate to its heading and stretch the long axis with speed, capped: slow marks
stay round, fast ones elongate, and the field shows its flow with no trails.
Stretch 1 + min(0.25–0.4, speed × k).
```js
ctx.translate(x, y); ctx.rotate(Math.atan2(vy, vx))
ctx.scale(1 + Math.min(.35, Math.hypot(vx, vy) * .004), 1); ctx.arc(0, 0, r, 0, TAU)
```
