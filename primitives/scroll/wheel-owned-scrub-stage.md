---
id: wheel-owned-scrub-stage
category: scroll
tags: [scrub,wheel,stage,progress,transport,pointer,pin]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A timeline whose length has nothing to do with viewport heights should not be
expressed as a spacer to scroll past. Take the document's scroll away outright,
lock a stage to the viewport, and integrate one clamped 0–1 scalar from wheel
deltas and pointer drag instead. Retiming a beat is then a constant, not a
height. Gain 5e-4–1.5e-3 per `deltaY` unit and 1–2e-3 per dragged pixel; save
the previous `overflow` and restore it on teardown.

```js
stage.addEventListener('wheel', e => { e.preventDefault()
  p = Math.min(1, Math.max(0, p + e.deltaY * GAIN)) }, { passive: false })
```
⚠ `deltaY` units differ per device — a trackpad sends pixels, a wheel sends
notches. Nothing on the stage is reachable by keyboard, find-in-page or a
fragment link, so a narrow viewport and `reduce` both need a real document.
