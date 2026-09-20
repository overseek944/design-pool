---
id: feature-scaled-sim-grid
category: canvas
tags: [canvas,simulation,performance,resolution,texture]
axes: none
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Size a field simulation's grid by the smallest feature worth seeing, not by the
element it fills: 60–120 cells on the long axis, 2–6k total, written straight to
`ImageData` and stretched to display size by CSS. The browser's smoothing
supplies the interpolation you would otherwise write, and advection, injection
and decay across a few thousand cells cost microseconds where the same maths at
device resolution costs the frame. Resolution is a parameter of the effect, not
of the viewport.

```js
const W = 84, H = 34                 // grid cells, not pixels
cv.width = W; cv.height = H          // CSS alone sets the rendered size
const img = ctx.createImageData(W, H)
// …step the field into img.data, then:
ctx.putImageData(img, 0, 0)
```
⚠ Pointer coordinates need mapping through the element rect into grid space —
the backing store is no longer device pixels. `image-rendering: pixelated` makes
the same buffer a declared mosaic instead; pick a reading rather than inheriting
one.

Fix the apparent pixel *size* rather than the cell count when the buffer is
meant to read as a mosaic. A fixed `W × H` grid stretches to whatever box it
lands in, so the same effect has fine grain on a phone and coarse grain on a
desktop and distorts at any aspect but the authored one. Derive the count from
the box instead — `ceil(cssWidth / P)` for a chosen `P` of 3–6 CSS px — and
re-derive it in a `ResizeObserver`. The grain is then a constant physical size
at every viewport, which is the only way the mosaic reads as a deliberate
resolution rather than as an artifact of the layout.
```js
const P = 4, w = Math.max(1, Math.ceil(rect.width / P))
cv.width = w; cv.height = Math.max(1, Math.ceil(rect.height / P))
```
⚠ Cell count now changes on resize, so the buffer and any typed-array view over
it must be re-created, not reused.
