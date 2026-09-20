---
id: video-textured-mark-field
category: canvas
tags: [canvas,video,particles,texture,motion,performance]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A field of marks needs content as well as motion, and inventing content per mark
is the expensive half. Mount a muted, undisplayed video, blit one frame per tick
into a small offscreen canvas with the grade applied by `ctx.filter`, then let
every mark draw a different fixed sub-rect of it. One decode animates the whole
field, the grade costs a single downscale, and no `getImageData` stalls on a
readback. Sub-rect 12–24px, offscreen width capped at 480–720px.

```js
small.width = Math.min(v.videoWidth, 640)
sctx.filter = 'grayscale(1) brightness(1.15) contrast(1.75)'   // grade once
sctx.drawImage(v, 0, 0, small.width, small.height)
for (const p of marks)              // p.sx, p.sy fixed when the mark was seeded
  ctx.drawImage(small, p.sx, p.sy, 18, 18, p.x - r, p.y - r, 2*r, 2*r)
```
⚠ A video decodes whether or not you draw it — pause it on the same gate that
stops the loop. Autoplay can be refused outright, so the flat-fill branch is the
real default rather than an edge case.
