---
id: override-material-edge-pass
category: canvas
tags: [webgl,shader,wireframe,render-pass,narrative]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 5
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Render one set of geometry in two visual registers and cross-fade between them:
a lit pass to one target, then the same scene with `overrideMaterial` set to an
edge shader into a second, composited with a blend factor. The subject reads as
a line drawing that becomes a built object without a second model, a second
scene graph or a morph — the drawing and the thing are the same vertices. Drive
the factor from one scalar and the two registers can never drift.

```js
r.setRenderTarget(lit);  r.render(scene, cam)
scene.overrideMaterial = edge
r.setRenderTarget(ink);  r.render(scene, cam); scene.overrideMaterial = null
```
⚠ Two full passes: budget it as double draw calls and skip the edge pass
entirely once the blend factor reaches its opaque end. Sprites, points and
ground planes must be hidden for the edge pass or they render as solid blocks.
