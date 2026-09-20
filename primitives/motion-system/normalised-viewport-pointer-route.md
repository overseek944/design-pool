---
id: normalised-viewport-pointer-route
category: motion-system
tags: [motion,pointer,demonstration,scroll,narrative]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A drawn pointer walking a product is authored once if its route is data in
0–1 viewport fractions — waypoints `{t, x, y}` multiplied by `innerWidth`/
`innerHeight` on read, so no breakpoint re-authors the path. Interpolate
by the scene's progress, then ease the rendered position toward it at 0.1–0.2
a frame so it trails its script instead of snapping between legs.
```js
const k = (p - a.t) / (b.t - a.t)
ex += ((a.x + (b.x - a.x) * k) * innerWidth - ex) * .14
```
⚠ Reserve a scene's last 10–15% for a quadratic arc onto the next route's
first point, lifted above both, or the pointer cuts through content between
scenes. Hide it under reduced motion.
