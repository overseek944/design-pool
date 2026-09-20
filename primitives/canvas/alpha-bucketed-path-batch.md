---
id: alpha-bucketed-path-batch
category: canvas
tags: [canvas,svg,performance,generative,texture,batching]
axes: {energy: 2, density: 4, weight: 1, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Thousands of individually-faded SVG marks means thousands of nodes and a write
to each every frame. Quantise each mark's alpha onto a short ladder instead,
concatenate a bucket's subpaths into one `d`, and ship one `<path>` per bucket
at a fixed opacity. Frame cost is then N writes, not N × marks. 4–6 buckets;
below four the banding reads as bands.

```js
const B = [.22, .4, .65, .9, 1], d = B.map(() => '')
for (const m of marks) { const a = alphaOf(m); if (a < .1) continue
  d[Math.min(B.length - 1, a * B.length | 0)] += subpath(m) }
d.forEach((s, i) => paths[i].setAttribute('d', s))
```
⚠ Round coordinates to ~1 decimal first; full floats dominate the string cost.
Quantised alpha cannot cross-fade, so a mark changing bucket pops — keep marks
too small to read singly.
