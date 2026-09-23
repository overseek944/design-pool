---
id: extended-mark-gesture-ground
category: surface
tags: [surface, svg, identity, ambient, stroke, draw-on, restraint]
axes: {energy: 1, density: 1, weight: 1, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Lift the one gesture inside a mark — a pulse, a signature curve, a fold — and
run its flat lead-in and lead-out to both edges, so a single hairline spans the
section behind a statement line. It carries identity without a logo and gives an
otherwise empty band a horizon. 2–6% alpha, drawn once on entry over 1.5–2.5s.

```html
<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0 20H36l3-6 3 24 3-37 3 19H100" pathLength="1" stroke-dasharray="1"
        stroke-dashoffset="1" vector-effect="non-scaling-stroke"/></svg>
```
⚠ Stretched without `non-scaling-stroke`, the peaks thin and thicken with the
viewport's ratio. Past ~8% alpha it competes with the headline's contrast.
