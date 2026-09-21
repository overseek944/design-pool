---
id: anomaly-solved-ellipse-traversal
category: motion-system
tags: [motion,geometry,solver,loop,path,precision]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A mark sent round an ellipse by stepping its angle moves fastest where the
curve is widest — the opposite of how anything orbiting behaves — so it reads
as a cursor on a track. Advance a *mean* angle instead and solve the
ellipse's own equation for the drawn one; four Newton passes converge. The mark
hurries through the near pass and drifts through the far one, and the period
stays exact, so several at different eccentricities never drift apart.
Eccentricity 0.15–0.35; past 0.5 the far arc stalls.

```js
const M = (rate * t + phase) % TAU
let E = M
for (let i = 0; i < 4; i++) E -= (E - e*Math.sin(E) - M) / (1 - e*Math.cos(E))
const x = a*(Math.cos(E) - e), y = a*Math.sqrt(1 - e*e)*Math.sin(E)
```
⚠ Wrap `M` before the solve, or each lap needs more passes and precision
eventually goes. At e = 0 it is a circle — branch out.
