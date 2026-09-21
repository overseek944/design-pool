---
id: dead-banded-resize-rebuild
category: perf
tags: [resize,canvas,mobile,correctness]
axes: none
cost: 1
seen: 5
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
