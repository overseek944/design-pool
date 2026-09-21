---
id: loop-gated-on-attention
category: perf
tags: [performance,animation,intersection-observer,visibility,battery,correctness]
axes: none
cost: 2
seen: 44
requires: []
conflicts: []
completes: []
tension: []
---
An `infinite` decorative animation never stops — it keeps compositing while
scrolled past and while the tab is buried, on battery. Gate it on both facts at
once: intersecting the viewport **and** `document.visibilityState === 'visible'`.
Publish the result as one attribute on the container and let CSS pause the whole
subtree; declarative motion needs no other wiring. Arm at 0.3–0.5 of the element,
0.2–0.35 below the mobile breakpoint where a tall visual never reaches the higher
ratio.
```js
el.toggleAttribute('data-paused', !(onScreen && visible))
el.querySelectorAll('svg').forEach(s => onScreen && visible ? s.unpauseAnimations() : s.pauseAnimations())
```
```css
[data-paused] *, [data-paused] *::before { animation-play-state: paused !important }
```
⚠ SMIL ignores `animation-play-state` — it needs the `pauseAnimations()` call.
Pausing holds the current frame, so anything mid-wipe freezes visibly cropped.

A script-driven render loop is not reached by `animation-play-state` — the gate
must stop requesting frames and restart on re-entry. Reset the loop's clock on
resume, or motion driven from elapsed time jumps by however long it sat
offscreen.

Fold the motion preference into the same predicate rather than leaving it to a
separate media query, and subscribe to the query's `change` — a reader reaching
for the OS switch mid-session should stop the loop, not wait for a reload. The
same predicate is where a reader's explicit pause belongs, so one attribute
carries every reason the thing is not running.
```js
const run = () => el.dataset.running = String(onScreen && visible && !rm.matches && !userPaused)
rm.addEventListener('change', run); document.addEventListener('visibilitychange', run)
```

Geometry and page visibility miss a third case: content that is on screen and
in a visible tab but *authored* as absent — the inactive panel of a tab set, a
carousel slide out of view. Ask the accessibility state, not the layout.
```css
[role="tabpanel"][aria-hidden="true"] * { animation-play-state: paused !important }
```

Fold teardown into the same predicate rather than relying on cancellation. A
frame already queued when the view unmounts still fires, so the flag the cleanup
sets must be one of the terms — and the predicate has to be consulted again at
the *top of the callback*, not only where frames are requested.
```js
const run = () => !destroyed && !rm.matches && onScreen && !document.hidden
const frame = t => { raf = null; if (!run()) return; draw(t); raf = requestAnimationFrame(frame) }
```

A reader-facing motion switch belongs in the same predicate, but it is not
symmetrical with the OS preference: it may turn motion *off*, never back on over
a standing `reduce`. Disable the control in that state and put the reason in its
title, so it reads as already honoured rather than broken. Both sources
resolving to one attribute on the root keeps the query and the toggle on a
single path — the CSS reset is one rule list, selected two ways.
```html
<button aria-pressed="false" disabled title="Reduced motion is on in your system settings">
```
```css
@media (prefers-reduced-motion: reduce) { .page *, .page ::before {
  animation: none !important; transition: none !important } }
.page[data-reduced-motion=true] *, .page[data-reduced-motion=true] ::before { /* same */ }
```

When the loop stands in for a media element — a level meter, a waveform, a
spinner over a stream — the transport is the term, and its truth lives in the
element's events, not in the control that started it. `ended`, `pause`,
`waiting` and `seeking` all arrive with no click, so a visualiser wired to the
button keeps dancing over silence.
```js
['play','playing','pause','ended','waiting','seeking'].forEach(t =>
  audio.addEventListener(t, () => el.dataset.running = String(!audio.paused && !audio.seeking)))
```
⚠ Bind the element, not the page: several players on one surface each own their
own meter, and a shared flag stops all of them when any one ends.

`prefers-reduced-motion` is the one term in the predicate that should not stop
the loop from *drawing*. Freeze the clock instead — pass `t = 0` into the same
render — and keep the dirty flag, so the canvas holds one still composition and
redraws it on resize, on theme change and on re-entry. Folding the preference in
beside visibility and intersection leaves a decorative field blank, which is a
missing layer rather than a calmer page.
```js
const draw = t => render(rm.matches ? 0 : t / 1000)
const frame = t => { raf = null; if (!live()) return
  if (dirty || !rm.matches) { draw(t); dirty = false; loop() } }
```
⚠ Only for a loop whose frame at `t = 0` is already a complete image. A sweep or
an entrance has no meaningful first frame — those hold their *end* state instead.

Resetting the clock on resume is the crude fix for the offscreen jump, and it
throws away where a long scheduled loop had got to — a reader returning to a
20s sequence watches it start over. Accumulate instead: hold elapsed seconds
and the timestamp the current run began, add the span on every pause, and read
`elapsed + (running ? now - start : 0)`. The loop resumes in phase, `dt` stays
bounded without a clamp, and the same number drives a scrub or a still frame.
```js
const pause = t => { if (on) { acc += (t - t0) / 1000; on = false } }
const play  = t => { if (!on) { t0 = t; on = true } }
const clock = t => acc + (on ? (t - t0) / 1000 : 0)
```
⚠ Pause from every gate that stops frames — visibility, intersection and
teardown — or the clock keeps counting through a stop it did not hear about.

One term is still missing from the predicate: *finished*. An intro that resolves,
a field that reaches equilibrium, a scrub parked at its end — each keeps asking
for frames forever to repaint an image that no longer changes. Let the render
report whether anything actually moved, drop out of the loop when nothing did,
and restart only where real input arrives. An ambient surface then costs nothing
for the rest of the session rather than a composite every 16ms.
```js
const live = () => !settled && onScreen && visible && !rm.matches
const stamp = e => { mutate(e); if (!raf) raf = requestAnimationFrame(frame) }
```
⚠ Every path that changes state has to restart the loop, not only the obvious
one — resize, theme change and re-entry all arrive at a loop that has stopped.

The predicate decides whether to run, not what is left on screen. When it closes
on the *preference* term, a generative field that merely stops was never drawn
at all. Draw one frame at the current clock before cancelling, and step the
layer's opacity down to 40–60% in CSS: motionless and quieter reads better than
absent, and it costs a single frame.
```js
if (rm.matches) { cancelAnimationFrame(raf); video.pause(); if (onScreen) draw(0); return }
```

The gate has a blind side: state that changes *while* the loop is stopped. A hidden
tab never runs the frame that would have applied it, so a transition left mid-flight
is still mid-flight on return and repaints from the wrong pose. Anywhere state can
be mutated off-frame, branch on `document.hidden`: snap every eased value to its
target, render once synchronously, and return without scheduling.
```js
function poke() { dirty = true
  if (document.hidden) { angle = targetAngle; morph = shape; draw(0); dirty = false }
  else schedule() }
```
⚠ Not the same as resetting the clock on resume. That fixes elapsed-time drift;
this fixes state that was never integrated at all — and a `visibilitychange`
handler alone cannot, because by then the intermediate frames are gone.

Where the loop is a Web Animation rather than a rAF render, most of the
bookkeeping above belongs to the platform. `pause()` holds `currentTime`, so a
resume is already in phase — no accumulator, no clock reset — and there is no
teardown flag to thread, because cancelling the animation stops it. The gate
also stops being binary: `playbackRate` is continuous, so a hover, a low-power
hint or a `reduce` ramp can settle it at 0.2–0.5 instead of stopping it, and
the change lands mid-cycle with no seam.
```js
const anim = track.animate({ transform: ['none', `translateX(${-period}px)`] },
  { duration: period / speed * 1000, iterations: Infinity, easing: 'linear' })
const gate = () => onScreen && !document.hidden ? anim.play() : anim.pause()
```
⚠ A duration derived from a measured distance means every resize builds a new
animation — cancel the previous one first, or two run superimposed and the
track jitters at the difference of their rates.

A scene that plays *once* wants a higher arming ratio than a loop. A loop only
has to avoid running unseen, so a third of the element is enough; a two-second
composed sequence that never replays is spent if it starts while most of the
figure is still below the fold. Arm those at 0.6–0.7, and re-arm on the
preference change by deleting the attribute and re-observing rather than
flipping it, so the sequence plays from its first beat instead of resuming
mid-way.
```js
const io = new IntersectionObserver(([e]) => { if (e.intersectionRatio >= .65)
  el.dataset.animate = 'true' }, { threshold: [0, .65] })
```

A halted loop still owes one frame. Every reason to stop requesting frames —
offscreen, hidden tab, reduced motion — leaves a backing store that a resize
then reallocates and clears, so the surface goes blank until something happens
to restart it, which under a standing motion preference is never. Call the
render function directly from the resize handler whenever the loop is not
running; it costs one frame per resize and makes "stopped" mean still rather
than absent.
```js
const resize = () => { sizeBuffer(); if (raf === null) draw(performance.now()) }
```
⚠ The direct call has to be safe out of sequence — advance the clock from the
timestamp rather than incrementing it, or a stopped scene creeps forward one
step per resize.
