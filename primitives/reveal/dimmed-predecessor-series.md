---
id: dimmed-predecessor-series
category: reveal
tags: [reveal,chart,comparison,state,svg,data]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
When a plotted result is revised, do not swap the curve. Drop the old series to
a faint trace on the same axes and draw the new one over it: the change becomes
what the figure shows. Fade old to 12–25% over 300–500ms, start the new draw
150–250ms in; the old run's annotations dim with it.

```js
old.forEach(p => p.animate([{opacity: 1}, {opacity: .16}], {duration: 420, fill: 'forwards'}))
next.forEach(p => p.animate([{strokeDashoffset: 100, opacity: 0}, {strokeDashoffset: 0, opacity: 1}],
  {duration: 1400, delay: 180, fill: 'forwards'}))
```
⚠ Differ the series by hue and label, not opacity alone, or the faded trace
reads as a gridline.
