---
id: bowed-screen-clip
category: surface
tags: [clip-path, svg, screen, retro, device, shape]
axes: {energy: 1, density: 2, weight: 3, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A picture tube's face bows outward on every edge. An `objectBoundingBox`
`clipPath` draws it for any box: each side a quadratic whose control point
overshoots 0–1 by 2–5%, each corner a curve 8–12% in. Reads as glass in a
housing, not a rounded card.

```html
<clipPath id="tube" clipPathUnits="objectBoundingBox"><path d="M.1 .025 Q.5 -.025 .9 .025
 Q.97 .03 .975 .12 Q1.025 .5 .975 .88 Q.97 .97 .9 .975 Q.5 1.025 .1 .975
 Q.03 .97 .025 .88 Q-.025 .5 .025 .12 Q.03 .03 .1 .025Z"/></clipPath>
```
⚠ Past about 16:9 the bow flattens on the long sides — hold 4:3–3:2.
