---
id: alpha-gated-cell-population
category: canvas
tags: [canvas,generative,field,image,mask,silhouette,grid]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 3
seen: 2
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
