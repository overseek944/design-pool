---
id: state-dimmed-subordinate-tier
category: type
tags: [type,hierarchy,state,accessibility,contrast]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Where several panels of a stepper are on screen at once and one is live, dim
only the supporting tier. Every heading holds full strength, so the set still
scans as parallel choices and the reader can decide to skip ahead; fading whole
panels leaves two of three unreadable and turns a comparison into a slideshow.
Subordinate rest state .55–.7, active 1.

```css
.step p        { opacity: .6; transition: opacity .3s }
.step[aria-current] p { opacity: 1 }
```
⚠ The dimmed copy is still content, so the floor is contrast, not taste: .6 of
near-black on white lands near 4.55:1 — already at the AA line. Start from a
mid-grey and the same figure fails.
