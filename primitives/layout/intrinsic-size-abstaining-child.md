---
id: intrinsic-size-abstaining-child
category: layout
tags: [layout,correctness,type,detail]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A `width: fit-content` block is sized by its widest child, which is rarely the
child you meant. To let one element decide the block's width and have the others
merely fill it, make the others abstain: `width: 0` contributes nothing to the
parent's max-content calculation, `min-width: 100%` then stretches the box back
to the resolved width. A ragged headline can set the measure and a caption
centre inside it without ever widening it.

```css
.block   { width: fit-content; max-width: 100% }
.block h1{ max-width: 18ch }              /* 14–22ch — this child decides */
.block p { width: 0; min-width: 100% }    /* abstains, then fills */
```
⚠ An abstaining child can no longer force a scrollbar, so an unbreakable string
in it overflows silently — keep `overflow-wrap: anywhere` on it.
