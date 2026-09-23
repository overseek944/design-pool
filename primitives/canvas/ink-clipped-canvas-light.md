---
id: ink-clipped-canvas-light
category: canvas
tags: [canvas,light,composite,glyph,sweep,pointer,glow]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Light a field of marks — glyphs, dots, hairlines — without lighting the ground
between them. After the marks are drawn, fill a gradient under
`source-atop`: it paints only where pixels already exist, so a travelling band
or a pointer pool brightens the ink and the gaps stay dark. Band 0.3–0.5 of the
width at peak alpha 0.4–0.7; pointer pool radius 120–240px.

```js
ctx.drawImage(marks, 0, 0, w, h)
ctx.save(); ctx.globalCompositeOperation = 'source-atop'
ctx.fillStyle = band; ctx.fillRect(0, 0, w, h); ctx.restore()
```
⚠ Redraw the marks before each light pass or the light accumulates into them.
Mouse pointers only; stop the loop off-screen and under reduced motion.

The same "ink, not ground" light needs no canvas when the marks are a CSS dot
lattice. Put the pointer pool on a pseudo-element under the content and mask it
with the lattice's own generator at the same pitch: the gradient shows only
through the dots, so the pointer colours the grid and the gaps stay paper.
Script only writes two custom properties. Pitch 6–10px, radius 200–320px.
```css
.tile::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0;
  background: radial-gradient(circle 280px at var(--x) var(--y), var(--a), var(--b) 45%, #0000);
  mask: radial-gradient(circle, #000 1px, #0000 1.2px) 0 0 / 8px 8px }
.tile[data-lit]::before { opacity: .95 }
```
⚠ Hide it under `(hover: none)` as well as reduced motion — on touch it lights
once where the finger lifted and stays there.
