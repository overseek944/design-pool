---
id: hysteretic-lock-zone
category: interaction
tags: [interaction,pointer,state,correctness,threshold]
axes: none
cost: 1
seen: 3
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

The ⚠ above constrains the *flip*, not the pattern: an expensive switch can be
made cheap and then earns hysteresis too. Where crossing swaps a whole asset set
— a portrait and a landscape frame sequence, two builds of a diagram — keep both
sides constructed and cached so the crossing only selects one. The separation
then buys more than a flicker: near a square viewport a window dragged one pixel
would otherwise refetch the set at every step. Separate the thresholds 8–15%.
```js
const mode = w / h <= 1.30 ? 'portrait' : w / h >= 1.45 ? 'landscape' : current
```
⚠ Holding both doubles the memory of whatever it holds — a frame sequence at two
orientations is two full working sets. Budget for the pair, or evict the
inactive side behind a delay longer than any plausible re-crossing.
