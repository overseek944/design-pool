---
id: connector-relayed-step-focus
category: motion-system
tags: [motion,sequence,connector,autoplay,stroke,state]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
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

Variant — one-shot build: when the list is a funnel, not a carousel, advance
cumulatively and stop. Each tick lights the next step and leaves every previous
one lit, and the interval clears at n. The finished state then shows the whole
process. The effect runs once, guarded by a ref so re-entering the viewport does
not replay it. Tick 0.8–1.6s, trigger at 25–40% visibility.
```js
if (hit && !ran.current) { ran.current = true; let i = 0; setStep(0)
  const id = setInterval(() => ++i >= n ? (clearInterval(id), setStep(n)) : setStep(i), TICK) }
```
