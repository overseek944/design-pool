---
id: inline-property-render-channel
category: perf
tags: [performance,canvas,animation,architecture,custom-properties,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Steering a long-lived render loop from elsewhere costs a store, a context, or a
prop that remounts the canvas. Put its parameters on the root element as custom
properties, read each frame from the *inline* declaration, which resolves
nothing: any script steers the field by writing one string, and the loop keeps
its identity. Reserve a sentinel for clear-and-idle, so it switches off without
teardown. Two to four scalars, never a store.

```js
const s = document.documentElement.style
if (s.getPropertyValue('--field-on').trim() === '0') { ctx.clearRect(...); return }
const k = parseFloat(s.getPropertyValue('--field-gain')) || 1
```
⚠ `getComputedStyle` here costs a style recalc every frame. The inline read's
price: a stylesheet rule on the same name is invisible to the loop.
