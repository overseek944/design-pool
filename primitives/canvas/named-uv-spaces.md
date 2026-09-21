---
id: named-uv-spaces
category: canvas
tags: [shader,architecture,responsive,correctness,reference]
axes: none
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
One vertex shader can emit several named coordinate spaces so each fragment
effect picks the one matching its intent: a tiled pattern wants constant tile
density as the surface grows, a centred graphic wants to scale with it, a
texture wants aspect correction. Give the graphic an explicit world size and a
fit mode instead of deriving everything from resolution, and a resize then
reveals more pattern rather than stretching what is there.

```glsl
out vec2 v_objectUV;    // scales with the box — centred graphics
out vec2 v_patternUV;   // fixed density — tiles, noise fields
out vec2 v_imageUV;     // aspect-corrected — textures
uniform vec2  u_world;  // 0 on an axis = take it from the canvas
uniform float u_fit;    // 0 none · 1 contain · 2 cover
```
⚠ Pattern space carries device-pixel magnitudes; at `mediump` the low bits are
gone and `fract()` bands. Scale it by a constant (×.01–.02) leaving the vertex
stage and undo that factor in the fragment.

Rather than guess whether `mediump` is enough, ask. `getShaderPrecisionFormat`
reports the mantissa bits the driver actually gives a medium float; under about
23 it cannot hold a device-pixel magnitude, and the constant-scaling above is a
workaround for a machine that may not need it. Rewrite the declaration in the
source before compiling and the same shader ships one text at full precision
where that is free and at medium where it is not.
```js
const p = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT)
if (p && p.precision < 23) src = src.replace(/precision\s+(lowp|mediump)\s+float;/g,
                                             'precision highp float;')
```
⚠ `highp` is not guaranteed in a fragment shader on older mobile GPUs — check
`HIGH_FLOAT` reports non-zero precision before promoting, or the compile fails
with nothing rendered and no thrown error.
