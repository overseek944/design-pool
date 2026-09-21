---
id: fixed-point-measure-solve
category: layout
tags: [layout,measure,resize,fonts,reflow,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A measured value written back into the layout it came from has no single answer:
reserving the tallest panel changes the space those panels are sized in, which
changes which is tallest. Run it as a solve — measure, write, re-run, stop when
the value moves under a pixel — with a hard cap on passes, so a non-converging
case ends slightly wrong rather than hanging. 3–5 passes, epsilon 0.5–1px.

```js
for (let i = 0, last = -1; i < 4; i++) {
  layout(); const h = measure()
  if (Math.abs(h - last) < 1) break
  root.style.setProperty('--reserve', (last = h) + 'px') }
```
⚠ Each pass forces a synchronous reflow — keep it out of the scroll handler, and
re-run only on resize, font load and orientation change.
