---
id: rate-integrated-phase-clock
category: timing
tags: [motion,timing,correctness,loop]
axes: none
cost: 1
seen: 9
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

Integration is wrong when the clock is not time at all. If the position already
*is* the scrub — a scroll offset mapped to a duration — accumulating a rate off
it adds a second, lagging state that the scrub then disagrees with: the loop
keeps advancing when the reader scrolls back, so a travelling highlight runs
forward down a path the reader is reversing. Derive the phase from the scrubbed
value directly and the loop is stateless, reversible, and identical every time
that offset is visited.
```js
const head = (scrubbed * RATE + laneOffset) % 1      // not phase += dt * rate
```
⚠ This only holds while the scrubbed value is monotonic in scroll and smoothed
upstream. Derive off a raw, unsmoothed offset and the loop inherits every wheel
step as a jump.

Integrating keeps the *position* continuous; it does nothing for the
derivative. A track that halves its speed the instant a pointer arrives still
shows a visible kink, because the velocity stepped. Ramp the rate itself toward
its new target over 250–400ms on an ease-out, and the change reads as the thing
slowing rather than as a cut.
```js
const k = Math.min(1, (t - changedAt) / 300)
rate = from + (target - from) * (1 - (1 - k) ** 3)
```
A dragged track needs the same continuity on release. Sample a velocity from the
pointer deltas, decay it exponentially, and add it to the phase *instead of* the
ambient rate only while it is the larger of the two — the hand-off back to
ambient motion then happens at the moment the two are equal, so there is no
speed step at all. Decay constant 0.25–0.4s.
```js
if (Math.abs(fling) > Math.abs(rate)) { phase += fling * dt; fling *= Math.exp(-dt / .325) }
else { fling = 0; phase += rate * dt }
```
⚠ Zero the fling whenever the loop stops requesting frames, or a tab returned
to after a minute resumes a gesture the reader has forgotten making.

None of this is owed when the loop is declarative. A CSS animation already
holds its own phase, so the rate change that needs integrating in script is one
write to `playbackRate` on the animations read off the element — `currentTime`
is preserved by definition and the seam cannot exist. Ramp that number instead
of the phase, on the same ease-out over 250–450ms, and cancel the pending frame
on re-entry so a fast in-and-out does not run two ramps against each other.
Target 0.15–0.35 for a track that should slow to readable rather than stop.
```js
const as = el.getAnimations(); if (!as.length) return
cancelAnimationFrame(el._rf); const from = as[0].playbackRate
el._rf = ramp(k => as.forEach(a => a.updatePlaybackRate(from + (to - from) * k)))
```
⚠ `getAnimations()` is empty until the animation starts, so a ramp armed at
setup silently does nothing — read it inside the handler. Rate 0 is not
`paused`: the animation stays live and keeps its compositor layer.
