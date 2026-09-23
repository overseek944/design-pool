---
id: reader-parameterised-comparison
category: interaction
tags: [comparison,demo,state,interaction,accessibility]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A before/after figure quoted from your own example is an assertion; let the
reader choose the inputs and recompute both halves from that one selection and
it becomes a measurement of their case. Give the toggles real counts, hold both
bars on a single shared maximum — a per-panel scale argues by axis instead of
by value — and floor the fill's length so a near-zero side still reads as a
mark rather than as an empty track. Transition the width 300–600ms; the
recount, not the animation, is the point.
```css
.bar__fill { transition: width .45s cubic-bezier(.22,1,.36,1); min-width: 3px }
```
⚠ The recomputed numbers are the content — render them as text beside each bar
and toggle with real controls carrying `aria-pressed`, or the whole argument
exists only as two rectangle widths.
