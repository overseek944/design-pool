---
id: radial-penalty-region-hold
category: canvas
tags: [canvas,field,particles,generative,containment,force]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A wall gives a drifting field a shape, and a visible edge where marks bounce.
Measure each mark's distance in ellipse radii, so one threshold fits any aspect,
and past it push the mark centreward with force growing as the overshoot squared.
Marks then lean back at the rim and the field reads
as a pooled mass with no outline. Threshold 0.75–0.9.

```js
const k = Math.hypot(dx / rx, dy / ry)
if (k > T) { const f = (k - T) ** 2 * GAIN / Math.hypot(dx, dy); vx -= dx * f; vy -= dy * f }
```
⚠ Damp velocity every frame, or penalty and drift pump energy and marks orbit
the rim.
