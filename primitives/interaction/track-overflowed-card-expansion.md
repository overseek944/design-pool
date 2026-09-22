---
id: track-overflowed-card-expansion
category: interaction
tags: [interaction,layout,grid,hover,overflow,cards]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [scheduled-discrete-property-step]
tension: []
---

A grid of uniform cards that reveal more on hover either shoves every row below
them or gives the extra copy to a click. Neither is needed once the track has a
literal height: align each card to the start of its own cell and let the
hovered one's `min-height` grow past the track it sits in. It expands down into
the row beneath, the grid never reflows, and exactly one box moves — the set
keeps reading as a matrix rather than a stack that breathes. Track 100–140px,
expanded 2–2.5×.

```css
.grid { display: grid; grid-auto-rows: 110px; gap: 1rem }
.card { align-self: start; min-height: 110px; overflow: hidden;
        transition: min-height .25s ease }
.card:hover, .card:focus-within { min-height: 240px; z-index: 5 }
```
⚠ The expanded card covers its neighbours: nothing interactive may sit in the
overlap, and the final row needs somewhere to grow into. A tap has no hover, so
below `pointer: coarse` every card opens or the hidden copy is unreachable.
