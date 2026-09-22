---
id: aspect-switched-diagram-axis
category: canvas
tags: [canvas,diagram,responsive,layout,aspect,pipeline]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A left-to-right process drawn in a canvas shrinks to illegible chips when its
host goes tall. Let the drawing read its own ratio and turn the stage axis
vertical below a threshold, rather than trusting a viewport breakpoint the
canvas cannot see. Satellites take compact positions from the same flag.
Threshold w/h 1.0–1.3; stages 10–14% of the short side.

```js
const compact = w / h < 1.15
const pts = stops.map(s => compact ? { x: w * .5, y: h * s } : { x: w * s, y: h * .5 })
```
⚠ DOM captions over the canvas must switch on the same ratio, or they label
stages that moved.
