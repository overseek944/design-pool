---
id: rate-integrated-phase-clock
category: timing
tags: [motion,timing,correctness,loop]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A loop whose speed is a *variable* — tied to scroll position, a hover state, a
quality tier — cannot take its position as `elapsed × rate`. The moment the rate
changes, every second already spent is re-scaled and the motion teleports.
Integrate instead: accumulate `phase += dt × rate` and wrap it, so only the
future moves at the new speed and the seam is invisible. Clamp `dt` to
30–60ms and drop the accumulator whenever the loop is not requesting frames.
```js
const dt = Math.min((t - last) / 1000, .05); last = t
phase = (phase + dt * rateFor(progress)) % 1      // never elapsed * rate
```
⚠ Without the clamp, a tab restored after a minute advances a minute in one
frame. `%` keeps the sign, so a rate that can reverse needs `(phase + 1) % 1`.

Clamp `dt` at both ends, not only the top. A loop that seeds `last` from
`performance.now()` and then reads the `requestAnimationFrame` timestamp is
comparing two clocks that can disagree by a frame, so the first delta after
every start and resume can come out negative — the phase runs backwards for one
frame and anything easing off it visibly snaps. `Math.min(.05, Math.max(0, t -
last))` costs nothing and removes the whole class.
