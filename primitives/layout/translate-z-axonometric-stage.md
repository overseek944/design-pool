---
id: translate-z-axonometric-stage
category: layout
tags: [3d,depth,diagram,transform,stage]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A cutaway model — floor, walls, shelving, a mover — is buildable from plain
boxes, no renderer. Rotate one `preserve-3d` container to a fixed
axonometric angle, then place each part in plan coordinates and lift it with
`translateZ`. Height is one number per element, parts occlude
correctly, and everything stays text and hover targets. rotateX 45–60° with rotate −30 to −45°
reads as a model; declare no `perspective`, or near parts balloon.

```css
.stage { transform-style: preserve-3d; transform: rotateX(52deg) rotate(-37deg) }
.stage > * { position: absolute }        /* Z is height */
.wall  { transform: translateZ(94px) }
```
⚠ Every ancestor between stage and lifted part needs `preserve-3d` — one
default `flat` collapses that branch onto the floor.
