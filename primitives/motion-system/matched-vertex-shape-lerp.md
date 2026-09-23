---
id: matched-vertex-shape-lerp
category: motion-system
tags: [svg,morph,polygon,hover,data,shape,interpolation]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Two shapes with equal vertex counts morph by lerping each point pair and
writing `points` per frame. Drive fill, stroke and dash from the same
eased progress, so the dash can shrink to solid on arrival and the move reads as
provisional becoming committed. Retarget from the
current progress so a mid-flight reversal never jumps. 600–1000ms ease-in-out

```js
const e = ease(p)
poly.setAttribute('points', A.map(([x, y], i) =>
  `${x + (B[i][0] - x) * e},${y + (B[i][1] - y) * e}`).join(' '))
poly.style.strokeDasharray = e > .97 ? 'none' : `${4 * (1 - e)} ${3 * (1 - e)}`
```
⚠ Vertex order must correspond, or the outline twists through itself. Under
reduced motion, jump to the end state.
