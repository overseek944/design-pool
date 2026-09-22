---
id: playhead-lit-legend-rows
category: interaction
tags: [legend, chart, dataviz, sweep, highlight, sync]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
When a figure animates along its value axis, let each legend row brighten as
the sweep reaches that row's value, then ease back. The key becomes a live
readout, naming each series at the moment it matters. Ramp over
5–15% of the range each side; rest at 30–50% opacity.

```js
const d = t - row.value
row.el.style.opacity = d < -w ? .35 : d < 0 ? .35 + (d + w) / w * .65
  : d < w ? 1 : Math.max(.5, 1 - (d - w) / w * .5)
```
⚠ Rests below ~50% on a muted ink fail 4.5:1; hold the final state lit under
reduced motion.
