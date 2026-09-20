---
id: snap-scroll-as-dismiss-gesture
category: interaction
tags: [gesture,dialog,scroll,accessibility,sheet]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Build a drag-to-dismiss sheet out of a scroll container rather than pointer
events: a full-viewport snap spacer above the panel, `scroll-snap-type: y
mandatory`, `overscroll-behavior: none`, scrollbars hidden. The platform then
supplies momentum, rubber-banding and fling velocity for free, and the gesture
is correct on touch, trackpad and wheel without a single listener. Dismiss when
scroll position settles back on the spacer.

```css
.sheet { height: 100dvh; overflow-y: scroll; scroll-snap-type: y mandatory;
         overscroll-behavior: none; scrollbar-width: none }
.sheet > .spacer { height: 100dvh; scroll-snap-align: start }
.sheet > .panel  { scroll-snap-align: end }
```
⚠ A hidden scrollport is not an announced affordance — ship an explicit close
control and an Escape handler, and keep focus trapped inside the panel.
