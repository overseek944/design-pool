---
id: viewport-clamped-anchored-popover
category: interaction
tags: [correctness,responsive,overlay,accessibility,hover,focus]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A popover sized against its trigger gets clipped by the window: an 18rem panel
on an edge chip overflows the document or opens a horizontal scrollbar.
Clamp it against the viewport, and align it to the trigger's near edge at
narrow widths, centring where there is room. The arrow moves separately —
it tracks the trigger, the panel tracks the viewport.

```css
.tip { max-inline-size: min(18rem, calc(100vw - 1.5rem)); inset-inline-start: 0 }
.tip::after { inset-inline-start: 1.25rem }        /* arrow keeps the trigger */
@media (width >= 80rem) { .tip { inset-inline-start: 50%; translate: -50% } }
```
⚠ Nesting the panel inside its `<button>` folds the description into the
button's accessible name. Keep it a sibling, named by `aria-describedby`.
