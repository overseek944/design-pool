---
id: pointer-anchored-surface-light
category: light
tags: [light,pointer,hover,gradient,custom-properties,surface]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Let a panel light where the pointer is rather than uniformly. One radial
gradient on a pseudo-element, centred on two custom properties, faded in by
`opacity` so entry never recomputes the gradient. A single delegated
`pointermove` finds the nearest lit ancestor of the event target and writes the
properties there, so a hundred panels cost one listener and one rect read.
Radius 8–16rem, peak alpha 8–20%, fade 120–200ms.

```css
.lit::after { content: ""; position: absolute; inset: 0; opacity: 0; pointer-events: none;
  background: radial-gradient(circle 13rem at var(--lx,50%) var(--ly,50%), var(--glow), transparent 72%) }
@media (hover: hover) and (pointer: fine) { .lit:hover::after { opacity: 1 } }
```
⚠ The pseudo-element paints over the panel's own children — raise them with
`position: relative; z-index: 1` or the light washes the text. Bail on
`pointerType === 'touch'`, or a tap strands the glow where the finger left it.
