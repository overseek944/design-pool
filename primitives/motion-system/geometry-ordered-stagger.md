---
id: geometry-ordered-stagger
category: motion-system
tags: [stagger,entrance,reveal,measurement,correctness,layout]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A stagger keyed on DOM index sweeps in source order, and source order stops
matching what the reader sees the moment a layout wraps, reverses or
auto-places — the sweep runs ragged or backwards while the markup is still
correct. Rank the targets by one measured axis and use the rank as the delay
index: true at every width, with no per-breakpoint schedule. The axis is the
direction the sweep travels. 25–90ms per step.

```js
const rank = els.map(el => [el, el.getBoundingClientRect()])
  .sort((a, b) => axis === 'y' ? a[1].top - b[1].top : a[1].left - b[1].left)
rank.forEach(([el], i) => el.style.transitionDelay = `${i * step}ms`)
```
⚠ One read pass before any write, or every measurement pays for the previous
element's layout. A `display: contents` child has no box — descend to the
elements that actually lay out. Re-rank on reflow: an order measured at one
width sweeps diagonally at another.
