---
id: resting-default-expanding-row
category: interaction
tags: [interaction,state,hover,accessibility,layout]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A row of panels that expand only on hover says nothing at rest — the reader must
find the interaction before the row has content. Give one member the expanded
state as its resting default and let the row hand it over: while any sibling is
hovered, the default collapses. Exactly one panel is open at every moment, no
script holds the state, and naming `:focus-visible` in the same selector list
gives the keyboard an identical path. Grow 2.5–3 against 1, handed over
across 0.8–1.2s so the row redistributes rather than switches.

```css
.card.is-open, .card:focus-visible { flex-grow: 2.7 }
@media (hover: hover) { .card:hover { flex-grow: 2.7 }
  .row:hover .card.is-open:not(:hover) { flex-grow: 1 } }
```
⚠ The handover rule must stay inside `hover: hover`, or a touch tap leaves the
default collapsed with nothing open. Below the breakpoint, stack and open all.
