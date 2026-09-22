---
id: calendar-anchored-projection-axis
category: layout
tags: [chart,axis,label,time,correctness,data]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A projection is plotted in elapsed units from now, so evenly spaced year labels
put every boundary in the wrong place and a dated marker lands beside the wrong
one. Derive ticks from the calendar: emit each real boundary inside the horizon
at its true offset. They space unevenly — the first gap is a remainder, the
rest whole periods. Drop any boundary nearer the origin tick than a minimum
gap, 1.5–3 periods, or the labels collide.

```js
for (let y = now.getFullYear() + 1; ; y++) {
  const m = (y - now.getFullYear()) * 12 - now.getMonth()
  if (m > HORIZON) break
  if (m >= MIN_GAP) ticks.push({ label: y, at: m })    // MIN_GAP 2–3
}
```
⚠ The uneven first gap is the honest part; normalising it restores the error.
Everything else on this axis must use the same offset arithmetic, not an index.
