---
id: own-path-derived-streak
category: canvas
tags: [canvas,motion,morph,points,trail,cheap]
axes: {energy: 4, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A field crossing between two states reads as a cut unless the marks show where
they are going, and a stored history buffer is the usual price. Where the pose is
a pure function of the crossing parameter there is nothing to keep: evaluate the
same mark a short step back along the same interpolation and draw the segment
between the two results. The trail is exactly the path that mark takes, it costs
one extra interpolation, and it ends itself the moment the crossing does. Lag
0.10–0.20 of the crossing — shorter reads as a fattened dot, longer as a drawn
line the mark never followed.

```js
const p = lerp(a, b, u), q = lerp(a, b, Math.max(0, u - LAG))   // LAG ≈ .16
if (u > .03 && u < .999) segments.push(p, q)
else dots.push(p)
```
⚠ Collect segments and dots into separate batches and flush each once. Switching
between a fill and a stroke per mark costs far more than the streak itself.
