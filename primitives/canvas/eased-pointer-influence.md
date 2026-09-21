---
id: eased-pointer-influence
category: canvas
tags: [shader,interaction,feel]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
Never feed raw pointer state to a shader. Keep a `uMouseActive` float lerped
toward 0/1 and a smoothed `uMouse` — influence then fades in and out instead of
snapping, and the effect survives the pointer leaving the window.

Seed the smoothed pair on the *first* event, not at setup. A sentinel start —
origin, or far off-screen — lerps across the whole viewport the first time the
pointer moves, so the effect announces itself by flying in from a corner. One
boolean, set once, snaps smoothed to raw on the first sample.
```js
if (!seeded) { seeded = true; sx = e.clientX; sy = e.clientY }
```

"Leaving the window" is not one event. `pointerleave` misses a tab switch, an
alt-tab, a drag that ends outside the document and a pointer that exits through
the top edge — each leaves the active flag raised and the effect frozen at the
last sample. Clear it from the whole set, and take the canvas rect from a cache
refreshed on scroll and resize rather than measuring inside the move handler,
which forces layout at pointer rate.
```js
for (const [t, ev] of [[window,'blur'],[document,'mouseleave'],[document,'visibilitychange']])
  t.addEventListener(ev, () => { active = false })
window.addEventListener('mouseout', e => { if (!e.relatedTarget) active = false })
```
⚠ `document.visibilitychange` fires on the way back too — test `document.hidden`
rather than clearing unconditionally, or returning to the tab with the pointer
still over the canvas leaves the effect dead until the next move.
