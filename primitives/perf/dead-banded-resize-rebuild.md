---
id: dead-banded-resize-rebuild
category: perf
tags: [resize,canvas,mobile,correctness]
axes: none
cost: 1
seen: 1
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
