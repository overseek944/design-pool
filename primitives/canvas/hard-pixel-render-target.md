---
id: hard-pixel-render-target
category: canvas
tags: [canvas,pixel,raster,resolution,render-target,performance]
axes: {energy: 2, density: 2, weight: 3, finish: 2}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scene drawn at display resolution has both cost and crispness follow the
window. Draw it into an offscreen buffer a few dozen units across — every
stroke and cap is then one or two pixels wide — and blit it up with
`imageSmoothingEnabled = false`. Authoring stays in world units and display size
becomes a pure upscale. Snap alpha to three levels or every rounded cap keeps a
grey fringe. Buffer 40–120 units on the long axis.

```js
o.setTransform(S, 0, 0, S, 0, 0); draw(o)    // S 2–4 subpixels per world unit
const d = o.getImageData(0, 0, off.width, off.height).data
for (let i = 3; i < d.length; i += 4) d[i] = d[i] < 64 ? 0 : d[i] < 192 ? 128 : 255
ctx.imageSmoothingEnabled = false; ctx.drawImage(off, 0, 0, cw, ch)
```
⚠ The per-frame `getImageData` stalls without `willReadFrequently: true`, which
is why the buffer stays small. The picture scales with its container, so floor
the upscale in device pixels or it goes unreadable on a phone.
