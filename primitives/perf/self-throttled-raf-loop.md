---
id: self-throttled-raf-loop
category: perf
tags: [performance,animation,canvas,battery,frame-budget,correctness]
axes: none
cost: 1
seen: 28
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

The floor is lower than 24fps for anything that is barely moving. A field whose
only animation is a slow phase drift — noise, a gradient wash, a settling
lattice — holds at 10–14fps with nothing visible lost, because there is no edge
for the eye to track between frames. At 12fps a per-cell pass costs a fifth of
what it costs at 60, which is what makes a full-bleed generative ground
affordable at all. Clamp the elapsed term too, or a tab restored after minutes
advances the phase in one jump.
```js
if (t - last >= 80) { phase += 1.8e-5 * Math.min(t - last, 100); last = t; draw() }
```

Returning early from every frame is the wrong shape below ~15fps: the callback
still runs at the display rate, and on a hidden tab rAF is not called at all,
so a loop that must keep ticking while backgrounded silently stops. Nest the
two instead — `setTimeout` owns the interval, rAF owns the paint — and give the
hidden branch its own longer timer rather than a suspended frame request. The
display rate then costs nothing between ticks, and the loop is still alive to
notice it should stop.
```js
const tick = () => { if (document.hidden) return void setTimeout(tick, 500)
  requestAnimationFrame(() => { draw(t += SPIN / FPS); setTimeout(tick, 1000 / FPS) }) }
```
⚠ Two handles now, and both must be cleared on teardown or the timer resurrects
a cancelled frame. Never chain the next `setTimeout` outside the rAF callback —
the interval then races the paint and the effective rate drifts.

Where the loop *advances* something rather than redrawing it, the delta needs a
ceiling as well as a source. A GC pause, a layout storm or a background tab
throttled to one frame a second hands the next callback a delta of hundreds of
milliseconds, and a one-shot timeline integrating it skips its whole middle in
a single step. Divide by a nominal frame and clamp to 2–4 of them: the duration
stays authorable in frames while the rate stays honest.
```js
const d = last ? Math.min((t - last) / 16.67, 3) : 1    // nominal frames, capped
last = t; p = Math.min(1, p + d / DURATION_FRAMES)
```
⚠ The clamp makes wall-clock time and integrated progress disagree after a
stall — never drive a media element's `currentTime` from a clamped accumulator.

A *discrete* sequence cannot be driven from the timestamp the way a continuous
one can — there is no value to interpolate, only an index to step. Keep the
wall clock anyway: on each frame divide the elapsed time by the interval, add
that many whole steps at once, and carry the remainder back into the reference
instead of resetting it to now. A loop that misses six frames then jumps six
frames and stays on schedule, where `last = t` would silently slow the sequence
by however long the stall lasted.
```js
const e = t - last
if (e >= interval) { i = (i + Math.floor(e / interval)) % period
                     last = t - (e % interval); paint(i) }
```
⚠ Catching up is wrong for anything a reader is watching land — a counter
ticking, a card dealing. Clamp the jump to one step there and accept the drift;
only ambient loops want the clock honoured over the frames.

Gate on what the layer is actually worth, not only on whether it is on screen.
Where something else already computes a visibility scalar — a fade driven by
scroll, a cross-faded backdrop — the loop can read that ref and skip the frame
below a threshold, which covers the case an observer misses entirely: fully
visible geometry faded to nothing. Rebase the clock on the way out, or the
accumulated time jumps by the whole idle span when it resumes. Threshold
0.01–0.05.
```js
if ((vis.current ?? 1) < 0.01) { last = now; return raf = requestAnimationFrame(step) }
```
⚠ Reading a ref, not state — a per-frame gate that re-renders defeats itself.
The rebase makes wall clock and phase disagree; anything that must stay in step
with a second timeline needs the clamp above instead.

A loop that skips frames on a compared value silently swallows every change the
comparison cannot see: text written into a label, a class toggled by a click, a
container resized. Pair the comparison with one boolean any mutation may raise
and consume it at the top of the frame — the comparison then handles the
continuous input and the flag handles everything discrete. Raising it from a
resize observer and from a media query's `change` event matters most, since
both fire exactly when the driving value is not moving.
```js
const step = t => { requestAnimationFrame(step)
  if (pose === last && !dirty) return                // idle frame, no writes
  last = pose; dirty = false; draw(t) }
new ResizeObserver(() => { dirty = true }).observe(box)
```
⚠ Clear the flag before drawing, never after — a mutation raised during the
frame is otherwise discarded without ever being rendered.

Two cadences can share one loop, and a scrolling history needs both. Draw every
frame so the marks interpolate smoothly, but advance the *data* — shift one
sample off, push one on — only once a fixed interval has elapsed. The history
then travels at the same speed on a 60Hz panel and a 120Hz one, where advancing
per frame runs it at double rate on the better display and reads as a different
design rather than as a bug.
```js
draw(level)                                      // every frame
if (t - sampled > 32) { sampled = t; hist.shift(); hist.push(level) }
```
⚠ Gate on the timestamp, not a frame counter — the counter is the thing that
differs between panels. 25–40ms per sample; slower and the history steps
visibly instead of flowing.

A loop started for an element the page does not own — a field inside a framework
subtree, a widget mounted by a script that offers no teardown hook — has nowhere
to hang the cancel the ⚠ above demands. Test `document.contains` at the top of
the frame and return *without* re-requesting: the loop dies with its element,
one branch, no unmount callback and no registry of live handles to keep.
```js
const step = t => { if (!document.contains(el)) return      // no re-request
  raf = requestAnimationFrame(step); if (t - last < 1000 / FPS) return
  last = t; draw(t) }
```
⚠ Only catches removal, not concealment — an element moved into a hidden
subtree is still contained and still costs. Pair it with the visibility gate.
