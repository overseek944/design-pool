---
id: summed-delay-terms
category: motion-system
tags: [stagger,entrance,reveal,timing,correctness,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A child animation nested inside a revealed container keeps its own clock: bars
that grow inside a fading panel finish while the panel is still invisible. Write
every delay as a sum of named terms, each owned by one layer and defaulting to
zero — section offset, container index × step, then the element's own offset —
so an inner motion inherits its ancestors' wait by construction. Step 60–150ms,
per-element offset 0–300ms.

```css
.item { animation-delay: calc(var(--section-delay, 0s)
  + var(--i, 0) * var(--step, .12s) + var(--own-delay, 0s)) }
```
⚠ Terms add up silently; cap the index (or the sum) so a deep item never waits
past a second.
