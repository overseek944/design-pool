---
id: state-coded-arrival-rate
category: timing
tags: [timing,live-data,state,stream,rhythm]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 1
seen: 2
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

The same lever carries a *measurement* rather than a mode, and doing so answers
the caveat above. Where two figures sit side by side, give each the same looping
texture — a hatch scrolling under a bar — and set its period from the value
being compared, inversely. Both tempos are on screen at once, so nothing has to
be remembered against a remembered baseline: the faster bar is visibly faster
before a label is read. Ratio 3–6×; under 3× it reads as sloppy sync, over 6×
the quick one strobes. Translate the tile by exactly its own `background-size`
and oversize the layer by that amount, or the wrap exposes an edge.
```css
.bar::after { background-size: 40px 40px; width: calc(100% + 40px);
  background-image: repeating-linear-gradient(135deg, #0000 0 14px, var(--hatch) 14px 28px);
  animation: slide var(--period) linear infinite }   /* 1.5s slow · .3s fast */
@keyframes slide { to { transform: translateX(-40px) } }
```
⚠ A comparison made in tempo is absent from a screenshot and absent under
`prefers-reduced-motion` — it can only ever be the felt half. The figures have
to state the ratio in text regardless, or the reduced branch loses the argument
rather than its decoration.
