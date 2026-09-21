---
id: withdrawn-motion-pause-control
category: interaction
tags: [accessibility,motion,control,state,chrome,cheap]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---

Perpetual decorative motion owes the reader a stop, and an OS preference is not
one — it is a setting elsewhere, not a mechanism on the page. Ship a visible
button that flips one flag on the root and let CSS pause the whole subtree.
Label it by the action, not the state, with `aria-pressed` carrying the state.
Then withdraw it under `prefers-reduced-motion`, where the motion is already
gone and a stop that stops nothing is a lie. Caption tier, 9–13px.

```css
.paused .drift { animation-play-state: paused }
@media (prefers-reduced-motion: reduce) { .motion-toggle { display: none } }
```
⚠ Only where that branch truly removes the motion; if `reduce` merely slows it,
the stop is still owed.
