---
id: self-throttled-raf-loop
category: perf
tags: [performance,animation,canvas,battery,frame-budget,correctness]
axes: none
cost: 1
seen: 11
requires: []
conflicts: []
completes: []
tension: []
---
`requestAnimationFrame` offers the display's rate; it is not a contract to use
it. A pass that costs 8–20ms — a per-cell field, a particle sweep, a re-sampled
image — is better run at a fixed 24–30fps: keep requesting every frame, compare
the timestamp, and return without drawing until the interval has elapsed. On a
120Hz panel that is four-fifths of the work returned. Ambient texture reads as
deliberate at 30; anything tracking a pointer or a scroll offset needs the full
rate.

```js
let last = 0, handle
const step = t => { if (t - last >= 1000 / FPS) { draw(t); last = t }
  handle = requestAnimationFrame(step) }
```
⚠ Cancel the handle on teardown or a second loop stacks on the first. Drive
motion from the timestamp, never a frame counter, or the speed changes with the
cap.

The rate is not one number either. A loop tracking an input needs the full rate
*while the input moves* and almost nothing once it settles: compare this frame's
driving value to the last, and after 1–2s of no change fall to every fourth
frame, returning to full the moment it differs. A scrubbed scene left parked
then costs a quarter of a still image.

The same divisor belongs on auxiliary render targets, which are usually the
expensive half and rarely need the main rate. Turn automatic shadow refresh off
and drive it yourself — every 2nd frame while something moves, every 30th–60th
while the scene is only being looked at.
```js
r.shadowMap.autoUpdate = false
r.shadowMap.needsUpdate = moving ? frame % 2 === 0 : frame % 60 === 0
```
⚠ Anything that moves between refreshes drags a stale shadow. Force one update
on the frame a transition ends.

Compare with a tolerance of about a millisecond, not exactly. A 30fps cap tested
`>= 33.3` against a 60Hz clock rejects the frame that lands at 33.2 and takes
the next one at 49.9 — the loop runs at 20fps, not 30. `elapsed < interval - 1`
keeps the intended rate on a panel whose period does not divide it.

Let the rate include zero. A target of `0` makes the interval infinite, so the
loop never draws of its own accord and the same render function is invoked
directly by whatever actually changed — a scroll offset, a resize, a pointer
move. One hook then serves both an ambient canvas and a purely reactive one
with no second code path and no `if (animated)` branch at the call site.
```js
const step = t => { raf = requestAnimationFrame(step)
  if (t - last < 1000 / fps) return; last = t; draw(t) }   // fps 0 → never
if (fps > 0) raf = requestAnimationFrame(step)
```
⚠ Still request the first frame unconditionally, or a static canvas never
paints at all.

The reactive case above has a second half. `scroll`, `pointermove` and `resize`
fire faster than the display refreshes, so invoking the render directly from the
listener runs it several times per frame and every run past the last is thrown
away. Latch instead: the listener only requests a frame if one is not already
pending, and the callback clears the latch before it draws. A burst of forty
scroll events then costs one render.
```js
let pending = 0
const run = () => { pending = 0; draw() }
addEventListener('scroll', () => { pending ||= requestAnimationFrame(run) },
  { passive: true })
```
⚠ `passive: true` on scroll and touch listeners, or the browser must wait to
see whether the handler cancels the gesture. Cancel any pending frame on
teardown.

Where the *source* is already quantised the cap is not a tuning choice — it is
the source's own rate. Baked frames at 24fps, a stepped counter, a feed sampled
once a second: drawing between two source samples produces a frame identical to
the last. Compare the derived index rather than the timestamp and the throttle
needs no tolerance and no second number.
```js
const i = Math.floor(elapsed * SRC_FPS)
if (i !== lastIndex) { draw(i); lastIndex = i }
raf = requestAnimationFrame(step)
```
⚠ This forfeits interpolation between samples — right for a field or a counter,
wrong for anything whose motion the eye tracks across the frame.

For a `<video>` the browser states the source rate itself:
`requestVideoFrameCallback` fires once per *presented* frame, so a 24fps clip on
a 120Hz panel needs no rate to be guessed and no index to be derived. Keep the
rAF path — it is not universal — and treat a throw from either the request or
the cancel as a permanent downgrade rather than retrying it every frame. The
callback does not chain itself; re-request inside it exactly as with rAF.
```js
const step = t => { draw(t)
  handle = rvfc ? v.requestVideoFrameCallback(step) : requestAnimationFrame(step) }
try { handle = v.requestVideoFrameCallback(step) } catch { rvfc = false; step(0) }
```
⚠ It stops firing entirely when the element has no frames to present — paused,
ended, or a decoder the OS suspended — and reports nothing. A loop with no other
clock needs a stall check over it.
