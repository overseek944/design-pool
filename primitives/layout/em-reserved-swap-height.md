---
id: em-reserved-swap-height
category: layout
tags: [layout,layout-shift,responsive,correctness,tabs]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Content that swaps in place — a tab's copy, a rotating claim — changes line
count, and everything below it jumps. Reserve the tallest variant on the
container with `min-height` in `em`, not `px`: the reservation is then a count
of lines and survives a fluid type scale and a reader's own font size. That
count is not constant across widths — three lines in a wide column is six in a
narrow one — so restate the value per breakpoint instead of reserving the
mobile worst case everywhere.
```css
.swap > p { min-height: 4.8em }                       /* 3 lines at 1.6 */
@media (max-width: 640px) { .swap > p { min-height: 6.4em } }
@media (max-width: 480px) { .swap > p { min-height: 8em } }
```
⚠ Reserved space is dead space while the short variant shows. Past roughly two
surplus lines, cross-fade through a shared box instead of swapping in place.
