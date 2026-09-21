---
id: pivot-signed-explode
category: motion-system
tags: [explode,assembly,stack,progress,figure,scrub]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A stack opening to show what it is made of must separate *about* something, or
it reads as the whole assembly sliding. Elect a pivot layer and offset every
other by its **signed** distance from that index, scaled by one progress
scalar. The stack splits both ways and the pivot holds its place, so the layer
under discussion stays put. Closed pitch 16–24px, open 80–120px — under 60 the
plates touch and the view is loose, not exploded.

```js
layers.forEach((el, i) =>
  el.style.transform = `translateY(${(i - PIVOT) * (pitch + open * p)}px)`)
```
⚠ Elect the pivot for what it means, not as the middle index. Reserve the open
height up front — the separation is transform-only, but a figure sized to the
closed stack lets the open one overlap its neighbours.
