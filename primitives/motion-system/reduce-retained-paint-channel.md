---
id: reduce-retained-paint-channel
category: motion-system
tags: [motion,reduced-motion,accessibility,hover,feedback,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A hover or proximity response is several channels at once — a lift, a shadow, a
tint — and blanket `animation: none` under `reduce` deletes all of them, so a
reader who asked for less movement gets no feedback at all. Drop only the moving
half: transform, shadow geometry and the entrance go, tint and border stay and
still track the pointer. Keep any surviving transition under 120–200ms.

```css
@media (prefers-reduced-motion: reduce) {
  .cell { transform: none; box-shadow: none; animation: none } }
```
⚠ Score the retained channel alone — a tint legible only because something also
moved is not feedback once it is the whole signal.
