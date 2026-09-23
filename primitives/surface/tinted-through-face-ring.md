---
id: tinted-through-face-ring
category: surface
tags: [surface,gradient,border,button,pill,hover,css-only]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A gradient ring needs no mask: pad a gradient wrapper 2–5px and give the inner
face near-black at 65–90% alpha, not opaque. The ring reads at full strength
while the face takes a faint cast of the same gradient, lit from its own edge.
Hover drops face alpha 15–25 points — the fill warms, nothing moves.

```css
.ring { background: linear-gradient(90deg, var(--a), var(--b), var(--c)); padding: 3px; border-radius: 999px }
.ring > a { background: rgb(0 0 0 / .85); border-radius: inherit; transition: background-color .15s }
.ring > a:hover { background: rgb(0 0 0 / .65) }
```
⚠ Measure label contrast against the face at its lightest state, not black.
