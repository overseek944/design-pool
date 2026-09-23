---
id: axis-normalised-radar-comparison
category: layout
tags: [chart,comparison,data,svg,legend,hairline]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Five to nine metrics in unrelated units can share one figure when each spoke is
rescaled on its own — min–max or against a stated ceiling — so every entrant
becomes a closed shape and profiles compare at a glance. Draw the argued series
in ink at 1.5–2× stroke over a neutral 10–20% fill; others take hues at 1px and
6–12% fill. Two-line spoke labels: metric name, then a muted descriptor.

```js
const r = (v, lo, hi) => R * (v - lo) / (hi - lo);  // per spoke
```
⚠ Normalised radii and area overstate small gaps and hide absolute scale.
Say so under the figure, and pair it with a per-metric view carrying raw values
for anyone who needs the numbers or cannot read colour.
