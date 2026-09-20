---
id: scripted-depth-projected-dom
category: layout
tags: [3d,projection,depth,transform,dom]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`preserve-3d` puts real DOM in depth but rotates the glyphs with it, so text at
an angle goes soft and its hit area shears. Project it yourself instead: hold
each item as a coordinate on a unit sphere, turn it with two trig pairs a frame,
divide by a perspective term, and write back only a flat `translate3d` and a
scale. Depth becomes a number you own and can spend — `z-index` for painter
order, opacity and blur for recession. Perspective 3–8; higher and near items
balloon past the frame.

```js
const k = 5 / (5 - z * persp)
el.style.zIndex = Math.round((z + 1) * 500)
el.style.transform =
  `translate3d(calc(-50% + ${x*k*R}px), calc(-50% + ${y*k*R}px), 0) scale(${k})`
```
⚠ One style write per node per frame — comfortable at 20–60 nodes, not at 500.
`scale()` resamples text rather than re-laying it out, so anything that must
stay crisp takes its size from the depth in `font-size` instead.
