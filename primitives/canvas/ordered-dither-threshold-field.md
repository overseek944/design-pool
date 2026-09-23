---
id: ordered-dither-threshold-field
category: canvas
tags: [canvas,texture,pattern,raster,two-tone,generative]
axes: {energy: 2, density: 4, weight: 3, finish: 2}
cost: 2
seen: 14
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

The field can be a supplied photograph rather than a generated value. Draw it
cover-fitted into a canvas at device pixels, read `getImageData` once, collapse
each block to luma, add the threshold and floor onto 3–8 grey levels, then write
the block back — block size 1–4 device pixels. Levels and block size stay tunable
per placement instead of being baked into a re-exported asset.
```js
const v = .299*r + .587*g + .114*b + (M4[y&3][x&3]/16 - .5) * 255/L
const q = Math.round(v / (255/(L-1))) * (255/(L-1))   // L = levels
```
⚠ A one-shot pass: it must re-run on resize, and a cross-origin image taints the
canvas unless it is served with CORS.

The field can be a *boundary* instead of a texture. Feed the threshold vertical
position plus a small noise term and the matrix turns a straight ground change
into a dithered edge that crumbles unevenly across the width. Animate the noise
slowly and the edge shimmers without ever moving. Noise weight 0.05–0.15, and
smoothstep the sum over 0.05–0.95 so both ends reach solid.
```glsl
float s = smoothstep(.05, .95, (1. - uv.y) + .1 * snoise(p * .001 + t));
```
⚠ Pause the loop while it is offscreen. An ambient edge that nobody sees still
draws every frame.

Swap the matrix for a static per-cell hash and the same comparison gives
stochastic stipple — no crosshatch, still frozen in place — and the field can
then drive two channels at once: *count* through the threshold, *tone* through
the kept cell's alpha stepped into 3–4 levels. Drift the field and cells switch
on and off where they sit, reading as signal rather than particles. Density
0.2–0.4, alpha 0.05–0.35.
```js
if (hash(c, r) < Math.min(1, 2 * D * v)) {
  ctx.globalAlpha = .05 + Math.ceil(4 * Math.min(1, v / .8)) / 4 * .3
  ctx.fillRect(c * P, r * P, S, S) }
```
⚠ Fill with the canvas element's computed `color`, re-read on theme change, and
the stipple follows the theme with no token plumbing.
