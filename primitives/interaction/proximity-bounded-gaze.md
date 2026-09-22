---
id: proximity-bounded-gaze
category: interaction
tags: [interaction, pointer, character, spring, attention]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Eyes that follow the pointer everywhere stop meaning anything. Normalise the
pointer's offset from the face over a short radius, clamp it, and past a larger
radius send the gaze back to rest: attention only when approached. Keep
horizontal travel wider than vertical, and put the eyes on a stiffer spring than
the body so they lead it.
```js
const nx = clamp(dx / 150–220, -1, 1), ny = clamp(dy / 150–220, -1, 1)
gaze = Math.hypot(dx, dy) > 350–450 ? REST : { x: nx * 8–12, y: ny * 5–8 }
```
⚠ Gate on `(hover: hover) and (pointer: fine)`, drop it under `reduce`, and reset
on `pointerleave` and `blur` or the gaze strands mid-offset.
