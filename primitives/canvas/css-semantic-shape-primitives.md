---
id: css-semantic-shape-primitives
category: canvas
tags: [canvas,shader,webgl,architecture,gradient,fallback]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A ground authored in a design tool is a stack of boxes, ellipses and gradients
at fractional positions and CSS-degree angles. Give the fragment shader those
exact semantics — a box test, an ellipse inscribed in it, a gradient on the CSS
angle convention — and the composition transfers as a table of numbers, not as
an interpretation, composited source-over in the authored order. The payoff is a
twin that really is the same picture: the fallback is those same numbers in
elements, so neither drifts when retuned. 3–6 layers.

```glsl
float box(vec2 p, vec2 at, vec2 sz) { vec2 q = step(at,p)*step(p,at+sz); return q.x*q.y; }
float ell(vec2 p, vec2 at, vec2 sz) { vec2 d=(p-at-sz*.5)/(sz*.5); return step(dot(d,d),1.); }
vec2 axis(float deg) { float a = radians(deg) - 1.5707963;     // CSS 0deg is up
                       return vec2(cos(a), sin(a)) * u_size; } // box px, not NDC
```
⚠ Fold the box's pixel size into the gradient axis, never into the sample
coordinate, or angles rotate as the viewport changes shape.
