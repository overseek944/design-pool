---
id: reset-frame-slot-recycle
category: motion-system
tags: [motion,transition,state,swap,cycle,correctness]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

One node that leaves upward and returns from below has to cross the whole
travel in between, and a live transition animates that crossing — the visible
slide-back. Insert a reset frame: after the exit settles, write the entry
offset with the transition disabled, let the style commit, then restore it.
The slot stays a single element, so nothing is measured, stacked or duplicated.
Make the halves asymmetric: exit 260–340ms on an accelerating curve, entry
460–600ms decelerating from 1.1–1.4× the exit distance.

```js
set({ y: '-0.3em', opacity: 0, transition: 'opacity .3s ease-in, translate .3s ease-in' })
after(310, () => { swap(); set({ y: '0.4em', opacity: 0, transition: 'none' })
  requestAnimationFrame(() => requestAnimationFrame(() =>
    set({ y: '0', opacity: 1, transition: 'all .52s cubic-bezier(.16,1,.3,1)' }))) })
```
⚠ A fixed `setTimeout` to re-enable is a race — use a double rAF or a forced
reflow. Clear every pending callback on unmount and skip the cycle entirely
under `prefers-reduced-motion`.
