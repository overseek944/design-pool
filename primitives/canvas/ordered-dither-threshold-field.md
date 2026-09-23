---
id: ordered-dither-threshold-field
category: canvas
tags: [canvas,texture,pattern,raster,two-tone,generative]
axes: {energy: 2, density: 4, weight: 3, finish: 2}
cost: 2
seen: 10
requires: []
conflicts: []
completes: []
tension: [hash-dither-before-quantise]
---
Reduce a continuous field to exactly two colours by comparing each cell against
a fixed 8×8 threshold matrix indexed by its own coordinates. Because the matrix
is a lattice rather than noise, the result is a structured crosshatch that
holds perfectly still under animation and reads as print raster, not as grain —
the quantisation becomes the visual instead of something to hide. Cells 2–6px;
below 2px the lattice stops resolving and the field reads as flat mid-tone.

```js
const M=[0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,/* …64 entries */]
const t = (x, y) => (M[((y & 7) << 3) | (x & 7)] + .5) / 64
px[i] = density > t(x, y) ? INK : GROUND     // density 0–1
```
⚠ Two tones only — contrast is whatever the pair gives, so text over it needs
its own ground. The lattice beats against a display scale that is not an
integer multiple of the cell.

"Two tones only" is a choice, not a limit. Add the same threshold to the value
*before* flooring it onto a short palette and every band boundary breaks into
the identical lattice, so a six-step ramp posterises like a printed separation
instead of banding. A 4×4 matrix at `(m + .5) / 16` is the cheap end of the same
family — coarser crosshatch, a quarter of the table, and at 5–8px cells the
difference from 8×8 is not readable.
```js
const i = Math.floor((v + (t(x, y) - .5) / P.length) * P.length)   // P = palette
ctx.fillStyle = P[Math.min(P.length - 1, Math.max(0, i))]
```
⚠ Clamp after adding the threshold — it pushes both ends of the ramp out of range.

The beat against a fractional display scale has a fix, and it is to stop
indexing the matrix by device pixels. Quantise the fragment coordinate onto a
cell grid whose size is the CSS-pixel cell times the ratio, sample both the
field and the threshold at the cell centre, and one lattice square then covers
the same physical area at 1×, 2× and 2.75×. The pattern also stops getting finer
as the panel gets denser, which is what made it read as grain on retina.
```glsl
vec2 c = floor((gl_FragCoord.xy - .5 * u_res) / (u_px * u_ratio)) + .5;
float shade = field(c * u_px * u_ratio / u_res);   // field and threshold share c
```
⚠ Cell size is now in CSS pixels, so the 2px floor is a CSS-pixel floor — on a
3× panel that is six device pixels and the fill rate saved is real.
