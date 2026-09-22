---
id: glyph-ramp-image-field
category: canvas
tags: [canvas,type,texture,image,ambient,generative]
axes: {energy: 2, density: 4, weight: 2, finish: 3}
cost: 4
seen: 5
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

The ramp is only the luminance channel. Keep the sample's colour too and each
cell becomes two marks: fill the cell rect with the sample dimmed to 40–60%,
then draw the glyph over it in the same hue scaled back up so its luminance
ratio to the block matches the source. The field reads as a colour image across
the room and as characters up close, where a monochrome ramp only ever reads as
one. Raise luminance to a power of 1.4–1.8 before indexing, or a dark source
spends most of its cells on a single glyph.
```js
const v = ((.299*r + .587*g + .114*b) / 255) ** 1.6
ctx.fillStyle = `rgb(${r*D} ${g*D} ${b*D})`; ctx.fillRect(x, y, cw, ch)   // D .4–.6
ctx.fillStyle = `rgb(${r} ${g} ${b})`; ctx.fillText(RAMP[v * (RAMP.length-1) | 0], …)
```
⚠ Two draws per cell doubles the call count the entry already warns about — this
is the variant that needs the visibility floor, not the flat one.

A character cell is about 1.5× taller than wide, so the sample grid is
`rows = h / (cellW * ratio)`, never `h / cellW` — get it wrong and the image is
squashed vertically, which no amount of ramp tuning fixes. Canvas has no
`object-fit` either, so a source whose aspect differs from the grid's stretches:
compute a cover crop in the source's own pixels and pass it as `drawImage`'s
first four arguments. Swap the image for a `<video>` and the whole field
animates for one downscale per frame.
```js
const a = w / h, va = vw / vh                       // target aspect vs source
const sw = va > a ? vh * a : vw, sh = va > a ? vh : vw / a
sctx.drawImage(video, (vw-sw)/2, (vh-sh)/2, sw, sh, 0, 0, cols, rows)
```
⚠ Measure the ratio from the face actually shipped — 1.45–1.55 covers most
monos, and a different one moves it enough to see.

Swap the glyph for a filled circle and the ramp becomes continuous — radius
carries luminance directly, so tone is smooth rather than quantised to however
many characters the ramp holds. It also collapses the call count warned about
above: every dot shares one `fillStyle`, so the field is one path and a handful
of `fill()`s instead of 10k+ `fillText`s. Cells 3–10px, radius ceiling 0.5–0.7
of the cell so the darkest areas still close to solid.
```js
ctx.fillStyle = ink; ctx.beginPath()
for (const d of dots) { ctx.moveTo(d.x + d.r, d.y); ctx.arc(d.x, d.y, d.r, 0, 6.283)
  if (++n >= 5e4) { ctx.fill(); ctx.beginPath(); n = 0 } }
ctx.fill()
```
⚠ `moveTo` before every `arc` or each dot is joined to the last by a chord
straight across the image. Raise luminance to a power of 0.8–1.8 here too — dot
*area* grows as the square of the radius, so a linear map reads far too dark.
