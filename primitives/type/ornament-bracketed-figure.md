---
id: ornament-bracketed-figure
category: type
tags: [ornament,stat,social-proof,svg,decoration,trust]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A bare number reads as a claim; the same number between a
mirrored pair of sprigs reads as a seal. Draw one ornament and flip it for the
other side, paint both in `currentColor` at 40–60% opacity, and set the figure
and label in muted ink so the proof ranks below the headline. Ornament
height 1.1–1.4× the text stack; at most two per row.

```css
.seal { display: inline-flex; align-items: center; gap: .25rem; color: var(--muted) }
.seal svg { block-size: 3.5rem; opacity: .5 }
.seal svg:last-child { scale: -1 1 }
```
⚠ Ornaments are `aria-hidden`. Muted ink still owes 4.5:1 for the label and
3:1 for a figure at 24px+ — a faint grey seal fails both.
