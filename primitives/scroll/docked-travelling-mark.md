---
id: docked-travelling-mark
category: scroll
tags: [scroll,anchor,continuity,measurement,architecture]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One mark crossing the whole page ties unrelated sections into a journey — but
mapping it to scroll progress makes it drift past everything and land on
nothing. Give each section a zero-height marker where the mark should park,
measure those into a table, and ease toward the active section's entry. Parking
spots stay authored beside their content; reflow moves them for free.

```css
.dock { display: block; height: 0 }     /* a position, not a box */
```
```js
y += (docks[active] - y) * 0.09         /* .05–.12; re-measure on relayout */
```
⚠ Decoration: `aria-hidden`, never content. Under reduced motion snap to the
dock — but still place it, or it sits wherever the last frame left it.
