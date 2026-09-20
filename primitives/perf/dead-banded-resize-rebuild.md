---
id: dead-banded-resize-rebuild
category: perf
tags: [resize,canvas,mobile,correctness]
axes: none
cost: 1
seen: 2
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
