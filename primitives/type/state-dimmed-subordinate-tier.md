---
id: state-dimmed-subordinate-tier
category: type
tags: [type,hierarchy,state,accessibility,contrast]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
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

A monotonic ramp instead of two states turns the same dial into an *encoding*:
opacity falling row by row down a list reads as age, so the newest entry needs
no badge and the oldest needs no date to be placed. Derive it from the index
rather than authoring values, and stop the ramp well above the floor — four or
five steps between 1 and .55, never a ramp to zero.
```css
li { opacity: calc(1 - var(--i) * .11) }   /* --i from the renderer */
```
⚠ The contrast budget is set by the *last* row, not the first, so measure the
faintest step against its ground. Recency read from opacity alone is invisible
to a screen reader — the order still has to be the DOM order, with real dates.
