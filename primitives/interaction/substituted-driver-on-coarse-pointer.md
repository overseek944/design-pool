---
id: substituted-driver-on-coarse-pointer
category: interaction
tags: [pointer,touch,fallback,ambient,correctness,architecture]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Every pointer-reactive decoration is inert on a touchscreen: the reader sees a
static lattice and never learns it answers to anything. Do not branch the
renderer and do not hide the layer — write a synthetic pose into the same
variable the real pointer writes, so one code path serves both and the effect
demonstrates itself. Sweep the field's own bounds with two sines per axis at
incommensurate frequencies; the path covers the area without a period the eye can
catch. Rate 0.008–0.02 rad/frame, minor term 0.2–0.3 of the major.

```js
const t = ++tick * rate
pose = { x: cx + Math.sin(t) * rx * .9 + Math.sin(t * 2.3 + 1.1) * rx * .25,
         y: cy + Math.cos(t * .8) * ry * .9 + Math.cos(t * 1.7 + .7) * ry * .25 }
```
⚠ This is motion nobody asked for: gate it on `prefers-reduced-motion` and on
whatever already stops the loop offscreen, or it composites forever on a battery.
