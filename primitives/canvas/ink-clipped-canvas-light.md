---
id: ink-clipped-canvas-light
category: canvas
tags: [canvas,light,composite,glyph,sweep,pointer,glow]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
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
