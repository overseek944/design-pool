---
id: glyph-ramp-image-field
category: canvas
tags: [canvas,type,texture,image,ambient,generative]
axes: {energy: 2, density: 4, weight: 2, finish: 3}
cost: 4
seen: 1
requires: []
conflicts: []
completes: [canvas-behind-dom-not-instead-of-it]
tension: []
---
Encode a photograph as a field of characters: draw it into an offscreen canvas
sized one pixel per character cell, then map each pixel's luminance to an index
in a ramp of glyphs ordered sparse to dense. The browser's own resampling does
the downsample, so there is no filter to write. Ramps of 10–70 glyphs — short
reads as pattern, long as photograph.

```js
small.width = cols; small.height = rows        // one pixel per cell
sctx.drawImage(img, 0, 0, cols, rows)
const d = sctx.getImageData(0, 0, cols, rows).data, i = 4 * (r * cols + c)
const v = 1 - (.2126*d[i] + .7152*d[i+1] + .0722*d[i+2]) / 255
ctx.fillText(RAMP[(v * (RAMP.length - 1)) | 0], c * cellW, r * lineH)
```
⚠ Pass `willReadFrequently: true` to the sampling context or every
`getImageData` stalls on a GPU readback. One cell is one `fillText` — a full
viewport is 10k+ calls a frame, so skip cells under a visibility floor.
