---
id: trapezoidal-visibility-envelope
category: timing
tags: [motion,timing,loop,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Elements that appear, hold and leave on one shared timeline do not each need a
state machine. Give every one a window — start, end, and a shoulder width — and
evaluate it against the single clock: eased ramp up, flat through the hold,
eased ramp down, zero outside. Opacity, scale, stroke weight and label colour
all read that one scalar, so a beat becomes three numbers in a table rather
than a pair of transitions to keep in sync. Shoulders 0.3–0.5s, or 4–8% of a
normalised cycle.
```js
const env = (t, a, b, f = .4) =>
  t < a - f || t > b + f ? 0 : t < a ? ease((t - a + f) / f)
  : t > b ? 1 - ease((t - b) / f) : 1
```
⚠ Shoulders wider than the hold turn the plateau into a spike and the element
never reaches full strength — keep `b - a` above twice the shoulder.
