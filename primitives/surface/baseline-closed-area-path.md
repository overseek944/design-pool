---
id: baseline-closed-area-path
category: surface
tags: [svg,chart,sparkline,data,precision]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A sparkline's tinted area and its stroke must never disagree by a pixel, so
derive one from the other rather than authoring both. Keep a single list of
points; the stroke is that list, the fill is the same list with two baseline
corners appended and closed.
```js
const pts = '0,46 22,49 40,43 58,40 88,36 120,46 240,10 295,2'
const area = `M${pts.split(' ').join(' L')} L295,54 L0,54 Z`
// <polyline points={pts} fill=none/> under <path d={area} fill=url(#g)/>
```
⚠ The baseline is the viewBox floor, not zero on the data scale — a series that
goes negative fills upward unless you clamp it. Draw the fill first so the
stroke is never softened by the gradient over it.

Close the same point list against a reference line instead of the floor — a
provisioned ceiling, a budget, a target — and the fill becomes the headroom:
the gap between what was reserved and what was used, drawn as one area. Dash
the reference, tint the gap at .04–.10 alpha, and keep the series stroke solid.
```js
const gap = [...pts, `${xEnd},${yRef}`, `${xStart},${yRef}`].join(' ')
// <line y1={yRef} y2={yRef} stroke-dasharray="4 3"/> <polygon points={gap}/>
```
⚠ Valid only while the series stays under the reference; a crossing folds the
polygon over itself — clip it to the reference side.
