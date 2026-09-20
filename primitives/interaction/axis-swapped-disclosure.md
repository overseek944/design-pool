---
id: axis-swapped-disclosure
category: interaction
tags: [disclosure,responsive,layout-animation,breakpoint,accessibility]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A detail panel opens *downward* in a stacked column and *sideways* beside its
trigger once there is width for a second column — one node, one state, two
geometries. The trap is that each mode must release the other axis's clamp:
animating `max-height` while `width` is still `0` opens an invisible panel, and
the reverse leaves the panel permanently short. Swap at 1000–1300px, wherever
the trigger list stops needing the full measure. Give the inner content its own
delayed fade so the box arrives first and the text follows it.

```css
.detail { overflow: hidden; max-height: 0; transition: max-height .55s var(--ease) }
@media (min-width: 1200px) {
  .detail      { max-height: none; width: 0; transition: width .55s var(--ease) }
  .detail-open { width: min(392px, 38vw) }
}
```
⚠ Neither axis interpolates from `auto`, so the open value is a literal — cap
`max-height` generously above the tallest entry and accept the eased tail, or
use `interpolate-size: allow-keywords` where it is supported.
