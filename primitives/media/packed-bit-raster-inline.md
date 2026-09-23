---
id: packed-bit-raster-inline
category: media
tags: [media,raster,bitmap,pixel,canvas,recolor,asset,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: [integer-scaled-pixel-raster]
tension: []
---
A 1-bit illustration need not be an image file. Pack it one bit per pixel,
compress with raw deflate, ship it as a base64 string, and inflate it with the
native `DecompressionStream` — then paint set bits onto a canvas in whatever
colour the current theme resolves and hand back a data URL. One asset serves
every ground and cell size is a draw-time parameter. Plates to ~400×300;
cells 1–6px.

```js
const s = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))
bits = new Uint8Array(await new Response(s).arrayBuffer())
if (bits[i >> 3] & (128 >> (i & 7))) ctx.fillRect(x * cell, y * cell, cell, cell)
```
⚠ It is not an `<img>` — give the host an accessible name or `aria-hidden`.
