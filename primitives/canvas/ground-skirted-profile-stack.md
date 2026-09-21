---
id: ground-skirted-profile-stack
category: canvas
tags: [canvas,occlusion,depth,field,generative,line-art]
axes: {energy: 1, density: 4, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A stack of profiles sampled across a heightfield reads as a flat tangle: every
row shows through every other. Occlude by painting, not by sorting — close each
row's path to a base well below the box, fill it in the page's own ground
colour, then stroke the open path over it. Drawn back to front, each crest
erases what stands behind it. No depth buffer, no clipping, no per-segment
test. 30–60 rows, 120–240 samples each.

```js
const base = H + amp * 2                       // clear of the deepest trough
for (const row of rows) {                      // back to front
  trace(row); ctx.lineTo(row.at(-1)[0], base); ctx.lineTo(row[0][0], base)
  ctx.closePath(); ctx.fillStyle = GROUND; ctx.fill()        // the occluder
  trace(row); ctx.stroke() }                                 // then the line
```
⚠ The fill is the page ground hardcoded into a canvas, so a themed, gradient or
transparent background breaks the illusion — publish it as one token both sides
read. Keep `base` clear of the deepest trough or the skirt's own edge draws.
