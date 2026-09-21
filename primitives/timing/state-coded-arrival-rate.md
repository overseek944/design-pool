---
id: state-coded-arrival-rate
category: timing
tags: [timing,live-data,state,stream,rhythm]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A live stream that changes mode usually recolours its rows and nothing else, so
the change reads as a property of one row, not of the panel.
Put the mode in the interval too: arrivals 1.3–1.6× closer together in the
escalated state and the surface feels busier before a single row is read. Under
1.2× nobody perceives the difference; over 2× the calm state reads as stalled.

```js
schedule(tick, mode === 'hot' ? 620 : 850)     // ms — ratio ≈1.35
```
⚠ Rate is legible only against a baseline already watched, so someone arriving
mid-state gets nothing from it: it must be redundant with a label naming the
mode. Hold the fast end above ~400ms, or rows leave before they can be read and
the panel reads as broken rather than urgent.
