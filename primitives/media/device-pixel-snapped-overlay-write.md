---
id: device-pixel-snapped-overlay-write
category: media
tags: [canvas,overlay,precision,dpr,scrub,registration,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A DOM layer over a raster — a canvas frame sequence, a cover-fitted plate — is
positioned in CSS pixels while the raster paints in device pixels. At a
fractional ratio their edges fall either side of one physical pixel and the seam
crawls as the value scrubs. Round every length script writes to the device-pixel
grid, at the same capped ratio the backing store was sized with. Cap 1.5–2.5.

```js
const dpr = Math.min(devicePixelRatio || 1, 2)
const px  = v => Math.round(v * dpr) / dpr + 'px'
box.style.setProperty('--win-left', px(x))
```
⚠ Snap offset and size together — rounding only the offset moves the far edge
instead of holding it. Re-snap on a ratio change.
