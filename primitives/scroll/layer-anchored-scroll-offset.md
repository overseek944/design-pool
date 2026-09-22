---
id: layer-anchored-scroll-offset
category: scroll
tags: [scroll,parallax,custom-properties,reduced-motion,correctness,performance]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One document-level scroll value can drive every parallax layer on a page, but
only if each layer carries the position at which it should sit unshifted.
Compute `(scroll − anchor) × rate` and a layer deep in the document opens at
rest rather than thousands of rates away from it; the rate stays a pure speed.
Measure the anchor once at layout. Rate 0.02–0.12, in whole pixels.

```css
.layer { transform: translateY(calc(
  (var(--scroll-y, 0) - var(--anchor, var(--scroll-y, 0))) * var(--rate) * -1px)) }
```
⚠ Default the anchor to the live value, as above, so a layer the script never
reached renders unshifted rather than flung. Writing `0` to the shared value
under `prefers-reduced-motion` stills every consumer at once.
