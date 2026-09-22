---
id: stage-angle-countered-slide
category: interaction
tags: [interaction,hover,transform,3d,depth,custom-property,reduced-motion]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Inside a stage rotated in its own plane, a child told to slide left leaves at the
stage's angle and reads as lifting away rather than as being drawn out.
Counter-rotate the offset: hold the screen distance as one token and resolve the
local pair through `cos()`/`sin()` of the stage angle. As a property pair it
welds every co-registered child — sheet, glow ring, label — to one move, and
zeroing the two is the whole reduced-motion branch. Distance 12–32px, stage
angles 15–40°.

```css
.stage { transform-style: preserve-3d; transform: rotateX(36deg) rotate(var(--a)) }
.card:hover { --dx: calc(var(--d) * cos(var(--a)));       /* --a: -22deg */
              --dy: calc(var(--d) * sin(var(--a)) * -1) } /* --d: 24px    */
.card > * { translate: var(--dx, 0) var(--dy, 0) }
```
⚠ Offset the children, never the element owning `:hover` — moving the hit target
out from under the pointer makes the state chatter at its edge. Only a horizontal
result escapes the tilt.
