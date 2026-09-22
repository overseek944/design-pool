---
id: animation-clock-derived-state
category: timing
tags: [timing,animation,correctness,architecture,state,synchronisation]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A loop that is half CSS and half class — a stroke drawing while one item of a
stack lights — usually runs a timer beside the keyframes, and the two drift
apart inside a minute. Make the CSS animation the clock instead: read
`getAnimations()[0].currentTime`, divide by the step for the index, and wake at
the next boundary rather than polling every frame. Phase is derived, never
accumulated, so a throttled tab resyncs on its next read and the keyframes stay
the only place the duration is written. Cycles 2.5–6s over 3–5 steps.

```js
const phase = anim.currentTime % CYCLE
setStage(Math.floor(phase / STEP) % steps)
timer = setTimeout(sync, STEP - (phase % STEP) + 16)
```
⚠ `currentTime` reads null until the animation starts — fall back to a rAF poll
until it is a number, and clear the pending timer on teardown.
