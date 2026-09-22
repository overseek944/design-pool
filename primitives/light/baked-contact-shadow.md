---
id: baked-contact-shadow
category: light
tags: [3d, shadow, webgl, grounding, render-target, perf]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Grounds an object with no shadow-casting light. Render the scene from below
with an orthographic camera into a 256–1024² target, writing only depth-faded
ink; blur it with two to four separable passes; lay it on a floor plane whose
alpha is smoothstepped to zero at the edges. Opacity 0.15–0.4. Re-bake only
when the pose changes — key it on animation frame, not render loop.

```js
if (key !== bakedKey) { bakedKey = key; shadows.bake(scene) }
```
```glsl
vec2 e = smoothstep(0., uEdge, vUv) * smoothstep(0., uEdge, 1. - vUv);  // uEdge .3–.5
gl_FragColor = vec4(s.rgb, s.a * uOpacity * e.x * e.y);
```
⚠ Each bake is an extra scene pass plus blur; baking per frame doubles cost.
