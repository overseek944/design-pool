---
id: revert-split-on-resize
category: perf
tags: [type,motion,correctness]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Split text hard-codes line breaks at split time. On resize or webfont load the
breaks are wrong until reverted and re-split. Always keep the instance and call
`.revert()` before recomputing.

Current split utilities own the cycle behind a flag — `autoSplit: true` reverts
and re-splits on resize and on webfont resolution — so a hand-wired listener is
now a second implementation to keep in step rather than a safeguard. The tweens
are not included: anything built once at setup holds references to nodes the
next split detaches, so build them in the callback the utility hands back.
```js
new SplitText(el, { type: 'lines', autoSplit: true,
  onSplit: s => gsap.from(s.lines, { opacity: 0, stagger: .03 }) })
```
⚠ `onSplit` fires on every resize — return the animation so the utility kills
the previous one, or a slow drag stacks dozens of overlapping tweens.
