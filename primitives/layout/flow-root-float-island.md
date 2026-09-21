---
id: flow-root-float-island
category: layout
tags: [layout,float,flex,prose,figure,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`float` has no effect on a flex or grid item, so a text column laid out as a
flex stack cannot wrap copy around a figure at all — the image becomes a column
entry of its own and the paragraphs sit above and below it. Move the paragraphs
that share space with the figure into one `display: flow-root` block: a single
item from the outside, ordinary flow inside, where `float` means what it says.
`flow-root` is also what makes that block contain the float's height, so an
image taller than the text beside it stops hanging out of the bottom onto
whatever the column puts next. Hand back the margins those paragraphs lost on
leaving the column.

```css
.col          { display: flex; flex-direction: column; gap: 28px }
.island       { display: flow-root }          /* one item out, normal flow in */
.island > p   { margin: 0 0 28px }            /* the gap, restated */
.island figure{ float: right; width: min(46%, 340px); margin: 6px 0 20px 28px }
```
⚠ Floats ignore `gap`, so the column's rhythm has to be rebuilt by hand inside
and drifts the next time the gap changes. Below the width where the remaining
measure falls under ~30 characters the wrap becomes a squeeze — drop the figure
to full width there and let the text run underneath it instead.
