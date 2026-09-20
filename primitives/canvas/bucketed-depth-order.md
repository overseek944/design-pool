---
id: bucketed-depth-order
category: canvas
tags: [canvas,performance,depth,particles,batching,quantise]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Painter's order on a 2D context normally means sorting every mark by depth each
frame — an allocation and n log n at exactly the count where it hurts. Quantise
depth into buckets instead, held as a head/next pair of typed arrays: one
linked-list pass, nothing allocated. Draw buckets far to near, and depth alpha
becomes one `globalAlpha` write per bucket rather than per mark. 32–64 buckets;
under ~24 the alpha steps read as bands.

```js
head.fill(-1)
for (let i = 0; i < n; i++) { const b = (z[i] - lo) * k | 0
  next[i] = head[b]; head[b] = i }
for (let b = 0; b < B; b++) { ctx.globalAlpha = floor + b / B * range
  for (let i = head[b]; i !== -1; i = next[i]) ctx.drawImage(spr, x[i], y[i]) }
```
⚠ Take `lo` and `k` from the frame's own extent, not a fixed range, or the
marks collapse into one bucket as the scene scales. Order holds between buckets
only — marks that must never overlap wrongly still need a sort.
