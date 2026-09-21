---
id: momentum-gated-wheel-step
category: interaction
tags: [interaction,wheel,input,gesture,correctness]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A trackpad flick is one gesture and hundreds of events, so a step per `wheel`
event runs away. Normalise the delta by `deltaMode`, accumulate to a
threshold, emit one step, then hold off until the tail settles — small deltas, a
gap, or a reversal. Threshold 30–60px, gap 120–200ms, calm under ~6px.

```js
const d = e.deltaY * ({1:16, 2:innerHeight}[e.deltaMode] ?? 1)
if (t - last > GAP || Math.sign(d) !== dir || calm > 3) (sum = 0, armed = 1)
if (armed && Math.abs(sum += d) >= STEP) (step(dir=Math.sign(sum)), sum = armed = 0)
```
⚠ Listen non-passively or the page scrolls under the step. Arrow keys and a
visible control owe the same step.
