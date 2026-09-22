---
id: diurnal-phase-section-grounds
category: color
tags: [color,gradient,ground,section,narrative,tokens,ambient]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Give a sequence of full-height sections grounds drawn from successive phases of
one lighting cycle — pre-dawn, morning, noon, afternoon, dusk — so reading down
the page plays as time passing. Token each phase as a top/mid/low triplet and
build every ground from its phase's triplet, so the arc stays editable as data.
Four to six phases; the darkest phases belong at the ends as bookends.

```css
:root { --dawn-top:#0b1a2f; --dawn-mid:#2f4a6f; --dawn-low:#f4c38a; /* …per phase */ }
.phase-dawn { background: linear-gradient(180deg, var(--dawn-top), var(--dawn-mid) 55%, var(--dawn-low)) }
```
⚠ Text colour must flip with the phase: pale mid-day grounds need dark ink, dusk
needs light. Check 4.5:1 at the gradient's lightest point under the copy.
