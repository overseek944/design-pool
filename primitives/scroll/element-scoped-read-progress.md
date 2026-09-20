---
id: element-scoped-read-progress
category: scroll
tags: [scroll,progress,correctness,observer,reading]
axes: none
cost: 2
seen: 1
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
