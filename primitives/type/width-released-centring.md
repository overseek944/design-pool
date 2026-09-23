---
id: width-released-centring
category: type
tags: [type,alignment,responsive,measure,readability]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A centred intro works while it sets in two or three lines around an obvious
axis. At phone width the same copy runs four to six lines, ragged on both
edges, floating over start-aligned content. Centre only above a width, then
hand the block back to the start edge and drop the auto margins that centred
its measure. Release at 560–720px, where the heading passes three lines.

```css
.intro { text-align: center; margin-inline: auto }
.intro > * { margin-inline: auto }
@media (width <= 620px) { .intro, .intro > * { text-align: start; margin-inline: 0 } }
```
⚠ Use `start`, not `left`, so right-to-left pages flip with it.
