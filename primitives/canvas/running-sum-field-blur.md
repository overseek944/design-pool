---
id: running-sum-field-blur
category: canvas
tags: [canvas,blur,field,performance,buffer,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scalar field that feeds a decision — a dot threshold, a mark size, a palette
index — usually wants softening before that decision, and CSS `filter` cannot
reach it: the buffer is not pixels yet. Blur it in place with a sliding window
that adds the entering sample and subtracts the leaving one, horizontally then
vertically. Two linear passes, and the cost is independent of radius, so a wide
blur is free where a naive kernel is quadratic. Radius 1–4 cells; clamp the
index at both ends to extend the edge sample.

```js
for (let x = 0; x < w; x++) { out[x] = sum / n
  sum += src[Math.min(w - 1, x + r + 1)] - src[Math.max(0, x - r)] }
```
⚠ Two box passes are a triangle, not a gaussian — a third if the falloff must
look optical. Allocate both scratch buffers once, on resize.
