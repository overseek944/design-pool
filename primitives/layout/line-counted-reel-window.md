---
id: line-counted-reel-window
category: layout
tags: [layout,type,clipping,carousel,fluid,geometry]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A reel showing a few rows at a time has three numbers that must agree: the
window's height, the pitch it translates by, and the leading of the rows inside
it. Derive all three from one line box — `line-height × 1em`, resolved against
the reel's own font-size — and a fluid clamp on that size carries them together,
so no width half-clips a row or lands the reading position between two. Script
then writes a single integer and touches no geometry. 3–7 rows.

```css
.reel { font-size: clamp(1.75rem, 4.4vw, 3.4rem);
  --lead: 1.3; --row: calc(var(--lead) * 1em); --shown: 5;
  block-size: calc(var(--shown) * var(--row)); overflow: hidden }
.reel ul { transform: translateY(calc(((var(--shown) - 1) / 2 - var(--i,0)) * var(--row))) }
.reel li { line-height: var(--lead) }
```
⚠ `(shown − 1) / 2` is only whole for an odd count — an even one parks the
reading row half a row off centre. Rows clipped by the window are still found by
find-in-page and still read aloud.
