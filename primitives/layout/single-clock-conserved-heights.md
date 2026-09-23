---
id: single-clock-conserved-heights
category: layout
tags: [layout,accordion,height,animation,stack,pinned]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
When one item of a fixed-height stack opens as another closes, two independent
height transitions do not sum to a constant — mid-flight the block breathes and
everything below it drifts. Drive both from one eased `t` and write every
item's height each frame, the opener getting exactly what the closer gives up.
Hold the container's height fixed and clipped. 0.6–1s.

```js
const e = ease(t)                                  // one clock for the whole stack
from.style.height = lerp(OPEN, CLOSED, e) + 'px'
to.style.height   = OPEN + CLOSED - parseFloat(from.style.height) + 'px'
```
⚠ Keep items `flex: none`, or the browser redistributes rounding error across siblings. Under reduced motion jump to the end state.
