---
id: state-named-delay-field
category: timing
tags: [timing,loading,state,stagger,motion,grid,detail,accessibility]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An indeterminate spinner says work is happening; it cannot say which work. Keep
one small cell grid and swap only the *delay field* — a pure function from cell
coordinate to delay. Distance from centre pulses outward, `col + row` sweeps
diagonally, an authored perimeter order travels the ring. Shape, size and
colour never change, so the modes read as one instrument, not three spinners.
Negative delays re-phase a mode change mid-cycle instead of restarting it.

```js
const RING = [0,1,2,5,8,7,6,3]                        // perimeter order
const field = { think:   (c,r) => (c + r) / 4 * P,    // P: 1.4–2s
                inspect: (c,r) => -RING.indexOf(c + 3*r) / 8 * P }
cell.style.setProperty('--delay', `${field[mode](c, r)}ms`)
```
⚠ Three or four fields on a 3×3 grid is the ceiling; past that they all read as
the same shimmer. The state has to reach the label too, or nothing announces it.
