---
id: ground-relative-depth-amount
category: surface
tags: [surface,color,depth,elevation,theme,tokens,color-mix]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Ship the depth *step* as a percentage, not the resulting colour. Each ground —
page canvas, card surface — derives its own raised and recessed neighbours by
mixing itself toward white or black by a shared amount, so a component nested on
either ground reads `-inset-1` and gets the step correct for where it actually
sits. Theming edits four numbers instead of a dozen swatches, and the numbers are
wildly asymmetric: a near-white ground needs a large push to read as raised and a
small one to read as recessed, and a dark ground the reverse.

```css
:root { --lift-1: 50%; --sink-1: 4% }          /* light: 40–60% / 3–8%  */
.dark { --lift-1: 3%;  --sink-1: 16% }         /* dark:  2–8%  / 12–30% */
--surface-1: color-mix(in oklch, var(--surface), white var(--lift-1));
```
⚠ Mixing toward pure white or black drains chroma, so a tinted ground goes
neutral as the amount grows. Re-check body contrast on every derived step.
