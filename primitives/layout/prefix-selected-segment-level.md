---
id: prefix-selected-segment-level
category: layout
tags: [css-only,state,accessibility,data,detail,cheap]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A discrete level — three of ten segments lit — usually costs a class per
segment and N writes per change. Make the count a selector: `:nth-child(-n+k)`
lights a prefix, so one rule under a container attribute moves the whole
read-out on a single attribute write. Segments 5–12, 4–8px wide, gap half the
width; the unlit remainder states the scale. Put the value in the container's
`aria-label` — counted spans tell a screen reader nothing.

```css
.level i                   { background: var(--empty) }
.level i:nth-child(-n+3)   { background: var(--on) }
[data-level=high] .level i { background: var(--on) }
```
⚠ Specificity decides, not order: a state rule can only light *more*, so a
lower level restates the unlit colour on the segments it gives back.
