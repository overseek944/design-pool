---
id: count-threshold-shape-shift
category: layout
tags: [layout,has,quantity-query,chrome,css-only,density]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Let a container change what it *is* once its contents pass a count, in CSS
alone. `:has(.item:nth-child(N))` is true only when an Nth child exists, so a
shell can detach a rail into a floating card — rounding its far corners, taking
elevation, dropping the divider it shared with the body — at exactly the density
where a flush edge stops reading. One threshold per rule; stack two or three for
a ladder.

```css
.shell:has(.list > :nth-child(4 of .item)) .rail {
  border-end-end-radius: var(--radius-panel); border-inline-end: none;
  box-shadow: var(--edge-raised), var(--shadow-elevated) }
```
⚠ Only `:nth-child(n of S)` counts *matching* children — plain `nth-of-type`
counts by tag, so one hidden sibling of the same element crosses the threshold
silently. The flip can fire mid-insert, so animate compositable properties only.
