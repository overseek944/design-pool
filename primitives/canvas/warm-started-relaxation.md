---
id: warm-started-relaxation
category: canvas
tags: [canvas,simulation,performance,shader,solver]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An iterative solve re-run every frame — a pressure projection, a constraint
relaxation, a diffusion — starts from zero and spends its first passes
rediscovering last frame's answer. Keep that solution and scale it by 0.6–0.9
as the initial guess instead: the same quality costs 15–25 iterations where a
cold start needs 40 or more. The decay does real work — at 1.0 the field never
forgets a transient and old error drifts.

```glsl
// clear pass, once before the iteration loop — not a zero fill
gl_FragColor = uDecay * texture2D(uPrevious, vUv);   // uDecay 0.6–0.9
```
⚠ Only for a field that changes smoothly between frames. After a resize, a
re-seed or a teardown the carried state describes geometry that no longer
exists — zero it on those paths explicitly.
