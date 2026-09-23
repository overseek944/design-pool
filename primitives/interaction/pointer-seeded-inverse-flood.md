---
id: pointer-seeded-inverse-flood
category: interaction
tags: [interaction,hover,button,clip,pointer,invert]
axes: {energy: 3, density: 1, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An outlined control can flood to its inverse from wherever the pointer entered.
Stack a colour-swapped face in the same grid cell, clip it to a zero circle at
`var(--x) var(--y)` — written on pointer entry as percentages of the box — and
grow it to 150–200% on hover. Being a real face, the label inverts
exactly at the edge, no blend mode. 0.3–0.5s.

```css
.face, .flood { grid-area: 1 / 1 }
.flood { clip-path: circle(0% at var(--x, 100%) var(--y, 100%));
  transition: clip-path .45s ease-in-out }
.btn:hover .flood { clip-path: circle(160% at var(--x) var(--y)) }
```
⚠ `aria-hidden` the flood. Keyboard focus has no entry point: give
`:focus-visible` its own state; drop the transition under `reduce`.
