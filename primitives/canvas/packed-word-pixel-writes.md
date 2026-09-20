---
id: packed-word-pixel-writes
category: canvas
tags: [canvas,performance,raster,imagedata,correctness]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Filling `ImageData` a byte at a time costs four indexed writes and four bounds
checks per pixel. Take a `Uint32Array` view over the same buffer and write one
word instead: a whole frame of a field or a dither becomes a single store per
cell, which is what lets a CPU raster hold 30fps over tens of thousands of
cells. Pack colours once, up front, never per pixel.

```js
const buf = ctx.createImageData(w, h), px = new Uint32Array(buf.data.buffer)
const abgr = h => { const n = parseInt(h.slice(1), 16)
  return (0xff000000 | (n & 255) << 16 | (n >> 8 & 255) << 8 | n >> 16) >>> 0 }
px[y * w + x] = INK; ctx.putImageData(buf, 0, 0)
```
⚠ The word order is little-endian ABGR, not RGBA — true on every shipping
browser, wrong as a general assumption. The view aliases the buffer, so
re-create both whenever the canvas is resized.
