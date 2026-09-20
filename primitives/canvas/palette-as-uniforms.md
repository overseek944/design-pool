---
id: palette-as-uniforms
category: canvas
tags: [shader,color,system]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Pass the site's palette into the shader as named `vec3` uniforms rather than
hard-coding literals in GLSL. The WebGL layer then recolours with the design
system, and one token change propagates to the canvas.
```glsl
uniform vec3 uColorOrange; uniform vec3 uColorPurple; uniform vec3 uColorNavy;
```
