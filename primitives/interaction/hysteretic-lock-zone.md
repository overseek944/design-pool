---
id: hysteretic-lock-zone
category: interaction
tags: [interaction,pointer,state,correctness,threshold]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Any boolean derived from a continuous input — pointer inside a zone, scroll
past a mark, velocity over a floor — chatters while the input sits on the
threshold, and the flicker reads far louder than the state it reports. Give
entering and leaving different thresholds, widening the zone once it is active
so leaving costs more than entering did. A 10–20% separation kills the chatter
before the exit starts feeling sticky.

```js
const r = locked ? 0.46 : 0.40      // wider while held
locked = (dx / (w * r)) ** 2 + (dy / (h * r)) ** 2 < 1
```
⚠ Only for state cheap to flip. Never for anything that moves focus or fires
an event: a widened exit outlives the gesture that caused it.
