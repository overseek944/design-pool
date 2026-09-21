---
id: standard-uniform-set
category: canvas
tags: [shader,architecture,reference]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A small reusable uniform contract covers most decorative shaders and lets one
host component drive any of them:
```glsl
uniform float uTime, uSpeed;      // animation clock + rate
uniform vec2  uResolution;        // aspect correction
uniform vec2  uMouse;             // pointer, normalised
uniform float uMouseActive;       // 0→1, eased — NOT a boolean
uniform float uGlowIntensity, uGlowRadius, uSoftness;
```

Keep the upload generic and the contract stops needing plumbing. Dispatch on
the JavaScript value — number to `uniform1f`, boolean to `uniform1i`, array by
its length — and a new uniform costs one entry in an object, not a setter, a
location lookup and a branch. Cache locations once per program.
```js
const set = (n, v) => { const l = loc[n]; if (!l) return
  if (typeof v === 'number') gl.uniform1f(l, v)
  else if (typeof v === 'boolean') gl.uniform1i(l, +v)
  else gl[v.length === 9 || v.length === 16 ? `uniformMatrix${Math.sqrt(v.length)}fv`
                                            : `uniform${v.length}fv`](l, ...(v.length > 4 ? [false, v] : [v])) }
```
⚠ A silently skipped unknown name is the failure mode — an optimised-out or
misspelt uniform returns no location and the value vanishes with no error.

Carry discrete variants as floats on that same path, not as ints. Branch on
ranges (`u_shape < .5`, `< 1.5`, else) and the mode rides the numeric setter
like everything else, survives a generic tween, and can be authored as a slider
while prototyping. Reserve `uniform1i` for things that are genuinely counts.
