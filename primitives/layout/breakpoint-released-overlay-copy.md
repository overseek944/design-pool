---
id: breakpoint-released-overlay-copy
category: layout
tags: [layout,responsive,breakpoint,overlay,media,mobile]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Copy absolutely positioned over a media panel has nowhere to go once the panel
is the width of a phone: it clips, or it covers the picture it was captioning.
Release it into flow at that width — `position: relative` in the same parent, no
second markup — and the panel is sized by its own copy again. The band of
picture that survives is then the copy's top padding: one number, not a height
negotiated between two boxes. Reserve 40–60% of the collapsed panel.

```css
.copy { position: absolute; inset: auto 0 0; padding: 0 30px 28px }
@media (width <= 45rem) {
  .panel.is-open { height: auto; min-height: 560px }
  .copy { position: relative; inset: auto; padding-top: 190px }   /* reserved band */
}
```
⚠ Drop the parent to `height: auto` in the same query or the released copy
overflows it. Anything else pinned to the panel's bottom edge now sits above the
copy rather than over it.
