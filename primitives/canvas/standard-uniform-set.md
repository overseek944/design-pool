---
id: standard-uniform-set
category: canvas
tags: [shader,architecture,reference]
axes: none
cost: 2
seen: 1
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
