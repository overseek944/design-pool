---
id: index-windowed-field-update
category: perf
tags: [performance,pointer,field,grid,correctness,batching]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A field of elements driven from the pointer does not need visiting. At a regular
pitch the cursor's radius maps onto a range of row and column indices, so a
frame touches the cells inside it rather than all of them — the cost becomes the
disturbance's area, not the field's. Keep the index set written last frame and
diff it: exactly the cells that left get cleared, none stranded mid-pose. Window
2R/pitch per axis; worth it past 3–4 cells of radius.

```js
const now = new Set(), c0 = Math.max(0, (cx - R) / P | 0)   // c1, r0, r1 alike
for (const i of cellsIn(r0, r1, c0, c1)) if (dist(i) < R) { pose(i); now.add(i) }
for (const i of prev) if (!now.has(i)) reset(i); prev = now
```
⚠ The window is a square and the falloff a circle, so test real distance inside
the loop or the box corners take poses they should not have. Teardown walks
`prev`, never the field.
