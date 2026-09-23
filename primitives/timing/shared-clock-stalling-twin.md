---
id: shared-clock-stalling-twin
category: timing
tags: [demo,comparison,mock,timing,rhetoric]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A claim about persistence cannot be shown by one panel. Run two identical mocks
from one prompt on one clock. The baseline's script ends after 2–4 steps and
parks in a labelled idle state — a "stalled" badge, counters frozen at zero —
while its twin keeps adding steps and ticking cost and time. The argument is the
moment they diverge, so both panels match in size and neither pauses first.

```js
const t0 = performance.now()
for (const run of [base, ours]) run.play(t0)
base.onEnd = () => base.dataset.state = 'stalled'
```
⚠ Restart both runs together or the stall drifts off the shared beat. Under
reduced motion, show both end states side by side, still.
