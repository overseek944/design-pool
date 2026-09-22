---
id: framed-media-pointer-drift
category: interaction
tags: [interaction,pointer,parallax,media,hover,spring,overscan]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A hover card doesn't have to tilt to feel deep. Keep the frame still and let
only the image inside it drift a few pixels with the pointer. The image moves
on a spring and settles back to centre when the pointer leaves. Overscan the
image so the drift never exposes an edge. Travel ±4–10px, overscan 1.04–1.10,
spring stiffness 120–200 with damping 20–30.

```js
const r = card.getBoundingClientRect(), a = (e.clientX - r.left) / r.width - .5
x.set(a * 14)          /* sprung; image: scale(1.06), card: overflow hidden */
```
⚠ Overscan margin (scale − 1) × size / 2 must exceed travel. Gate on
`(hover: hover) and (pointer: fine)`; under reduce, don't bind.
