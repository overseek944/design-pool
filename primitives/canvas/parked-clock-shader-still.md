---
id: parked-clock-shader-still
category: canvas
tags: [shader, webgl, static, texture, perf, generative, gradient]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A time-driven shader need not animate to earn its place. Set its speed to zero
and park the clock at an elected time value: it draws once, then costs nothing
per frame, and still gives a grain-and-swirl texture no gradient stack can fake.
Reuse the same program across a row of panels, and give each its own time value,
rotation or offset. One shader then yields a family of related stills instead of
one repeated image. Elected time 10³–10⁴ (early values sit near the seed and look
unmixed); vary rotation in 90–180° steps.

```js
cards.forEach((el, i) => mount(el, { speed: 0, frame: 12000 + i * 900,
  rotation: i % 2 ? 180 : 0, offsetY: .1 * i }))
```
⚠ A parked canvas still holds a live context. Browsers cap these at around 16,
so past a handful of panels, copy each canvas to an image and release the context.
