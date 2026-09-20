---
id: element-scoped-read-progress
category: scroll
tags: [scroll,progress,correctness,observer,reading]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Reading progress belongs to the article, not the document. Measured against the
tracked element's own box, headers and footers stop counting as distance the
reader must cover and the bar fills at the last line. Two failures come
free: content shorter than the viewport divides by a negative, and late images
change the height after first paint. Draw the rail short — 40–60vh at 2–3px —
so it reads as a gauge, not a page border.
```js
const b = el.getBoundingClientRect(), run = b.height - innerHeight
const f = run > 0 ? Math.min(1, Math.max(0, -b.top / run)) : 0
new ResizeObserver(update).observe(el)
```
⚠ Without the `run > 0` branch a short page pins the indicator at zero forever.

Measure against the viewport's *midline* rather than its top when the rail
tracks which step is being read instead of how much is left. Progress is then
`(innerHeight / 2 - top) / height`, which needs no `run > 0` guard because the
divisor is the element's own height and can never go negative — the short-page
failure disappears with the formula. A step commits as it reaches the middle of
the screen, which is where the reader is looking.
```js
const b = el.getBoundingClientRect()
const f = clamp01((innerHeight * .5 - b.top) / b.height)
```
⚠ The rail keeps reporting once its section leaves; drop it to 0.3–0.4 opacity
when the tracked box is entirely above or below the viewport, or a full bar
hangs beside unrelated content.
