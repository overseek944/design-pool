---
id: connector-relayed-step-focus
category: motion-system
tags: [motion,sequence,connector,autoplay,stroke,state]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A self-advancing step list that jumps its highlight says "next" but not "from where". Run a two-phase clock instead: *dwell* lights one step, *travel* draws the connector to the next while the source stays lit, and only the stroke's arrival hands focus on. Exactly one of {step, wire} is ever the lit thing. Dwell 2.5–4s, travel 0.6–1.2s, idle steps at 0.15–0.35 opacity.

```js
const tick = () => phase === 'dwell'
  ? (phase = 'travel', drawWire(i), setTimeout(tick, TRAVEL))
  : (phase = 'dwell', i = (i + 1) % n, light(i), setTimeout(tick, DWELL))
```
⚠ Start on first intersection, not on load. Under reduced motion light every step at once and skip travel entirely.
