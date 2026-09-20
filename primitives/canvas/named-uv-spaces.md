---
id: named-uv-spaces
category: canvas
tags: [shader,architecture,responsive,correctness,reference]
axes: none
cost: 3
seen: 1
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
