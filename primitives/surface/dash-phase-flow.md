---
id: dash-phase-flow
category: surface
tags: [svg,dash,motion,connector,diagram,precision]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Animating `stroke-dashoffset` on a dashed connector makes a static schematic
read as carrying something, and in a direction. The precision that makes it work
is arithmetic: the offset travelled per cycle must be an exact integer multiple
of the dash period (`dash + gap`), or the pattern snaps back at every repeat and
the line visibly stutters.

```css
.thread { stroke-dasharray: 6 10 }                  /* period 16 */
@keyframes flow { to { stroke-dashoffset: -160px } } /* 10 periods */
.thread { animation: flow 6s linear infinite }
```
⚠ Perpetual peripheral motion is a vestibular trigger and an attention sink — a
`prefers-reduced-motion` branch is required. Hold 20–40px/s; faster and the
dashes strobe rather than flow.
