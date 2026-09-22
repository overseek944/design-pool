---
id: ramped-travel-shared-fade
category: motion-system
tags: [stagger, entrance, scroll, scrub, arrival, progress]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scrubbed stagger reads as a queue when each part fades separately.
Split the channels: all members share one early opacity window, so the group
appears whole, while travel runs on per-member windows whose distance grows
with index. Later members move faster and close on the leaders — the block
settles like a stack compressing. Distance +10–25% per step, offset 0.03–0.06.

```js
const t = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)))
els.forEach((el, i) => { el.style.opacity = t(p, 0, .4)
  el.style.translate = `0 ${(200 + 40 * i) * (1 - t(p, .05 * i, .6 + .05 * i))}px` })
```
⚠ Reduced motion: pin progress at 1, not 0.
