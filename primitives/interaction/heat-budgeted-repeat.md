---
id: heat-budgeted-repeat
category: interaction
tags: [interaction,press,hold,repeat,throttle,meter,hysteresis,game]
axes: {energy: 4, density: 2, weight: 3, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Held auto-repeat needs a visible ceiling. Each repeat adds a fixed cost to a
0–1 heat value that cools continuously; at 1 the action locks
out, and it unlocks only once heat falls below a lower mark, so lockout is a
felt pause, not a stutter. Meter it; warn past ~0.6. Cost 0.06–0.12 per shot, repeat 90–150ms, cool
0.2–0.4/s, release 0.3–0.45.

```js
heat = Math.max(0, heat - COOL * dt); if (locked && heat <= RELEASE) locked = false
if (!locked) { heat = Math.min(1, heat + COST); if (heat >= 1) locked = true, stopRepeat() }
```
⚠ Clear the repeat on `mouseup` and `blur`; cool only while heat > 0.
