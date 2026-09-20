---
id: viewport-locked-single-line
category: type
tags: [type,responsive,display,unit,correctness]
axes: {energy: 1, density: 2, weight: 4, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: [balanced-headline-wrap]
---
A display line that must never break is not a wrapping problem to solve but a
sizing one: set `white-space: nowrap` and make the size a fixed fraction of the
window, so the line holds the same proportion of the viewport at every width.
The `vw` coefficient is that one string's width-to-size ratio, found once. The
clamp stops are where the guarantee ends, not where it starts.
```css
h1 { white-space: nowrap; line-height: 1.03; letter-spacing: -.02em;
     font-size: clamp(1.1rem, 5.3vw, 4.75rem) }   /* 4–6vw, floor 1–1.4rem */
```
⚠ The coefficient belongs to that exact string — an editor adding a word
overflows the window silently, and so does a longer translation. Below the floor
the line is under a readable size; check the longest variant at 320px and let it
wrap there rather than shrinking past it.
