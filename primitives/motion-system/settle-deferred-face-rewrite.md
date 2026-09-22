---
id: settle-deferred-face-rewrite
category: motion-system
tags: [motion,3d,preserve-3d,swap,stagger,cycle,logos,transition]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A rank of slots showing more values than it has room for can turn rather than
fade: two backface-hidden faces per slot. Accumulate the angle —
`rotateX(180deg × n)`, never toggled between two values — so every turn goes the
same way and none rewinds. Rewrite the hidden face from a *settle* timer, not
from the tick that advances the turn: any earlier and some slot is still
rotating while its content changes. Turn 0.5–0.65s, delay 60–90ms × index,
settle 1.2–1.5× the last slot's finish, period 4–6s.

```js
const face = up % 2 ? next : cur     // `up` lags `turn` by the settle timer
<div style={{ transform: `rotateX(${180 * turn}deg)`,
  transitionDelay: `${70 * i}ms` }}>
```
⚠ Give each slot its own strand — `items.filter((_, j) => j % n === i)` — or
neighbours show the same value. Under reduced motion drop the transition; the
values still change.
