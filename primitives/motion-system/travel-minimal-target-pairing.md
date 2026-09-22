---
id: travel-minimal-target-pairing
category: motion-system
tags: [morph,rearrange,geometry,marks,svg,transition]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A set of marks rearranging into a new configuration is usually paired by index,
which sends marks across each other: the move reads as a shuffle and whichever
mark the eye was following is lost. Pair by distance instead — build every
source–target pair with its squared separation, sort ascending, claim greedily.
Total travel collapses, paths mostly stop crossing, and the set reads as one
form deforming rather than as n things relocating.

```js
const pairs = from.flatMap((f, i) => to.map((t, j) => [i, j, d2(f, t)]))
                  .sort((a, b) => a[2] - b[2])
const src = [], dst = [], map = []
for (const [i, j] of pairs) if (!src[i] && !dst[j]) src[i] = dst[j] = map[i] = to[j]
```
⚠ Greedy is not optimal — it can strand the last pair on a long diagonal, and
under ~12 marks that outlier is all anyone sees. The sort is n²: pair once when
the target changes, never in the frame loop.
