---
id: alternating-mirror-tile
category: media
tags: [media,texture,tiling,canvas,backdrop,seam]
axes: {energy: 1, density: 3, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A photograph repeated across a band wider than itself cuts at every join: its
left edge was never drawn to meet its right. Flip every other copy and each
seam meets its own mirror, matching exactly — any source tiles without being
authored to, and one asset buys a backdrop that would otherwise be a panorama.
Step = drawn width + 4–8px, the overlap hiding the resampling line.

```js
for (let i = 0, x = -w * .35; x < W; i++, x += w + GAP) { ctx.save()
  if (i & 1) { ctx.translate(x + w / 2, 0); ctx.scale(-1, 1); ctx.drawImage(img, -w / 2, y, w, h) }
  else ctx.drawImage(img, x, y, w, h); ctx.restore() }
```
⚠ The mirror is visible on anything the eye reads as oriented — faces, text,
a skyline. Keep it for texture and structure, and start the run at a negative
offset so the first seam is off-canvas. CSS has no mirrored `background-repeat`;
this needs a canvas or repeated elements.
