---
id: alpha-gated-cell-population
category: canvas
tags: [canvas,generative,field,image,mask,silhouette,grid]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 3
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
A field of marks in the shape of an arbitrary form usually means hand-authored
coordinates that die at the next resize. Let a picture decide instead: decode it
once, keep only the alpha channel as one flat byte array, then generate a regular
lattice and admit a cell only where its sampled alpha clears a threshold. The
artwork is the domain, not the render — the lattice regenerates freely at any
spacing or viewport and the silhouette holds. Threshold 0.3–0.7; spacing 1.1–1.5×
the mark's own size.

```js
const a = new Uint8ClampedArray(w * h)          // alpha only — 1 byte/px, not 4
for (let i = 0, n = 0; i < px.length; i += 4, n++) a[n] = px[i + 3]
cells = lattice.filter(c => a[(c.y | 0) * w + (c.x | 0)] / 255 >= threshold)
```
⚠ A cross-origin source taints the canvas and `getImageData` throws — set
`crossOrigin` and keep the ungated lattice as the catch branch, or the field
vanishes rather than degrading.

The picture can be the page's own type. Draw the element's text into an
offscreen 2D context using its *computed* font, weight and letter-spacing, then
box-average the alpha over each cell rather than sampling a point: every cell
carries a coverage of 0–1 instead of a boolean, which is what lets a threshold
move later. Re-run on `document.fonts.ready` and on resize, coalesced through
one rAF flag, or the lattice is cut from the fallback face. Cell 3–8px, about
5% of the font size.
```js
const c = getComputedStyle(el)
ctx.font = `${c.fontStyle} ${c.fontWeight} ${c.fontSize} ${c.fontFamily}`
ctx.letterSpacing = c.letterSpacing === 'normal' ? '0px' : c.letterSpacing
```
⚠ `letterSpacing` on a 2D context silently does nothing on older engines, so the
raster comes out narrower than the element. Compare the measured width against
the element's own box and leave the text undecorated on a mismatch, rather than
laying a lattice of the wrong length over it.

Variant — no lattice: draw uniform random positions and keep each with probability
equal to its alpha, which gives a stochastic scatter whose density tracks the
picture's opacity. Take the kept point's colour from the same texel, scaled by
0.8–1.2 jitter, and a texture becomes a point field in its own colours.

Variant — vector domain. Where the form exists as polygons (outlines, regions,
geographic boundaries) skip the raster: map each lattice cell back into the
shape's own coordinates and admit it by an even-odd point-in-polygon test. No
decode, no taint, no threshold to tune. Fit the domain's aspect inside the box
and letterbox the rest, or the silhouette stretches at every ratio. Give each
admitted cell a base alpha jittered 0.3–0.45 so the field reads as printed, not
plotted.
⚠ The test is O(cells × vertices) — run it on resize only, never per frame, and
simplify the polygons first.
