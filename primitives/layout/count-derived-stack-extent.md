---
id: count-derived-stack-extent
category: layout
tags: [layout,overlap,stack,calc,responsive,composition]
axes: {energy: 1, density: 4, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Absolutely-positioned children contribute no height, so an overlapped stack —
coins, avatars, receipts, filed cards — collapses its container to nothing and the
page closes over it. The extent is arithmetic, not measurement: one item plus
one step per *gap*, `n − 1`, never `n`. Publish the item size and the step as a
pair so one breakpoint override rescales the stack whole, and hold the step at a
fixed fraction of the item or a deeper stack reads denser than a shallow one at
the same width. Step 8–14% of the item.

```css
.stack   { position: relative; --unit: 16px; --step: 1.7px;
           height: calc(var(--unit) + (var(--n) - 1) * var(--step)) }
.stack>* { position: absolute; inset-inline-start: 0;
           bottom: calc(var(--i) * var(--step)) }
```
⚠ At `--n: 0` the expression goes negative — floor it with `max()`. The count
lives in two places, the height and the children, so derive both from one value
or a stack renders with a gap above it.
