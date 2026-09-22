---
id: split-rate-signal-follower
category: timing
tags: [timing,motion,signal,smoothing,feedback,realtime]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A live level — audio amplitude, scroll effort, request rate — smoothed by one
constant is wrong both ways: fast enough to catch the onset and it jitters at
rest; slow enough to settle and it misses the attack. Use two constants against
the same target, chosen by which way the value is moving. Rising 0.35–0.6 reads
as instant; falling 0.08–0.2 lets a peak linger long enough to be read. The
asymmetry is what makes a meter feel like it is measuring rather than animating.

```js
const k = target > level ? 0.5 : 0.16       // attack, release
level += (target - level) * k
```
⚠ Release is a claim about the past — too slow and the display reports the
loudest recent moment, not the current one. Drive shape from the followed
value, never a numeric readout.
