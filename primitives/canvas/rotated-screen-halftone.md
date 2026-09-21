---
id: rotated-screen-halftone
category: canvas
tags: [canvas,texture,field,print,raster,generative]
axes: {energy: 2, density: 4, weight: 3, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An axis-aligned dot grid beats against the pixel lattice and reads as a screen
door. Print solved it by turning the screen: walk a lattice rotated 45°,
sample the continuous field at each dot's true position, and size the dot from
that value. Nothing is quantised to pixels, so there is no moiré and no
retina-dependent pitch, and the marks accumulate into one path for a single
fill. Pitch 4–12px, gamma 0.7–1.0, radius 0.55–0.65 of pitch at full value.

```js
const ext = Math.ceil(cells * 0.7071) + 1        // rotated lattice must cover the box
for (let j = -ext; j <= ext; j++) for (let i = -ext; i <= ext; i++) {
  const x = cx + (i * cos - j * sin) * pitch, y = cy + (i * sin + j * cos) * pitch
  const r = field(x, y) ** GAMMA * pitch * 0.62  // sample at the dot, not the cell
  if (r > 0.05) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, 6.283) } }
```
⚠ Iterating lattice indices covers a square only when extended by √2 — a bare
`cells` loop leaves two empty corners. Cull off-box dots before sampling or the
extension costs 2× the field evaluations for nothing.
