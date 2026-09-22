---
id: dead-banded-resize-rebuild
category: perf
tags: [resize,canvas,mobile,correctness]
axes: none
cost: 1
seen: 9
requires: []
conflicts: []
completes: []
tension: []
---
A generative scene that re-seeds on resize restarts every time a mobile browser
collapses or restores its address bar, so ordinary scrolling silently replays
the build. Debouncing does not help — the event is real and it settles. Require
the change to clear a per-axis dead band first: a few pixels horizontally, but
60–100px vertically, wider than any browser chrome and narrower than a rotation.
Debounce 150–300ms ahead of the test so a dragged window rebuilds once.

```js
if (Math.abs(w - W) < 4 && Math.abs(h - H) < 80) return
rebuild()
```
⚠ Size the layout in `svh` or the box moves even when the scene does not. The
band is a decoration tolerance — anything hit-tested or measured must rebuild on
every real change.

The band has a floor as well as a ceiling. `ResizeObserver` reports fractional
sizes, and a handler that writes any size-affecting style back re-triggers
itself a sub-pixel at a time — slow enough to read as jank rather than as a
hang, so it survives review. Compare against the stored size and return the
*same* object when both axes are within 0.1–0.5px, so the observer's own noise
never reaches whatever renders.
```js
setBox(p => Math.abs(p.w - w) < .1 && Math.abs(p.h - h) < .1 ? p : { w, h })
```
⚠ This is the opposite tolerance from the chrome band and the two coexist:
sub-pixel to stop the feedback loop, tens of pixels to stop the address bar.

A canvas needs the guard at the assignment, not only at the rebuild. Writing
`canvas.width` reallocates and clears the backing store *even when the value is
unchanged*, so a `ResizeObserver` firing on sub-pixel noise blanks the surface
every time and the effect flickers in a way that looks like a rendering bug
rather than a resize one. Compare the rounded integers first and assign only on
a real difference.
```js
const cw = Math.round(w * dpr), ch = Math.round(h * dpr)
if (c.width !== cw || c.height !== ch) { c.width = cw; c.height = ch }
ctx.setTransform(dpr, 0, 0, dpr, 0, 0)        // the transform is cleared too
```
⚠ Re-apply the transform after any assignment that did land — it resets with
the buffer, and a scene that skips it draws at device pixels for one frame.

A dead band is measured against the last accepted value, so a slow drag
accumulates: every step falls inside the band and the parameter drifts without
one rebuild. Where the resize feeds a derived 0–1 parameter rather than a pixel
size, quantise it onto an absolute ladder instead. Work over any sweep is then
bounded by the rung count, and returning to a width gives back exactly the value
it had before — which a relative band cannot promise. 32–128 rungs.
```js
const t = Math.min(1, Math.max(0, (WIDE - w) / SPAN))
const q = Math.round(t * RUNGS) / RUNGS      // identical q ⇒ no work downstream
```
⚠ The two compose rather than compete: dead-band the raw size to absorb browser
chrome, quantise the derived parameter to bound the work. Quantising a *length*
instead is visible — the layout steps.

A resize the band *accepts* leaves a second problem the band does not touch:
every offset the reader's position was derived from has moved, so holding
`scrollY` holds a pixel that now means something else. Where the scene is
scroll-driven it already computes a semantic coordinate — which beat, how far
through it — so re-anchor from that instead: suspend the loop, let two frames
pass so the new layout has settled, remeasure, invert the coordinate back to
pixels and jump there without animation.
```js
const { i, f } = mark                                  // beat index + fraction
suspended = true
rAF(() => rAF(() => { measure()
  scrollTo({ top: tops[i] + ((tops[i + 1] ?? end) - tops[i]) * f - vh * .55, behavior: 'auto' })
  suspended = false }))
```
⚠ Suspend the driver across the two frames or it reads the old offsets against
the new viewport and writes a visible wrong pose first. One frame is not enough
— the remeasure must happen after layout, not after style.

Two frames is a guess, and where the relayout is asynchronous — a late font, an
image settling, the sticky child remeasuring — the corrective jump lands against
geometry that then moves again. Converge instead of counting: re-derive the
target offset every frame and release only once it has repeated within half a
pixel two or three times, with a hard bailout at 20–40 frames so a page that
never settles does not hold the reader. Arm the abandon first — one passive
`wheel` or `touchstart` drops the restore outright.
```js
if (Math.abs(top - last) < .5 && ++stable >= 3) return release()
last = top; if (Math.abs(scrollY - top) > .5) scrollTo({ top, behavior: 'instant' })
```
⚠ The scripted scroll fires the same handler the wheel does, so the abandon
listener must test something the correction itself cannot trip.

Where a buffer's *length* is derived from the container — one sample per N
pixels of width — a rebuild that allocates a fresh array throws the history
away, so every accepted resize blanks a display that was mid-reading. Allocate
the new length, then copy the old tail into its end, so the most recent samples
survive and stay pinned to the edge the reader is watching. Copying
`min(new, old)` entries makes the grow and shrink cases one line.
```js
const next = Array(n).fill(0), k = Math.min(n, hist.length)
for (let i = 0; i < k; i++) next[n - k + i] = hist[hist.length - k + i]
```
⚠ Aligning to the *start* instead leaves the newest samples mid-array and the
trace appears to jump backwards. Floor the length as well — a panel narrowed to
a handful of samples reads as noise rather than as a trend.
