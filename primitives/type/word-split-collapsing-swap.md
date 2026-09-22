---
id: word-split-collapsing-swap
category: type
tags: [type,inline,transition,measurement,accessibility,detail]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A phrase substituted in running copy cannot crossfade in place: the lengths
differ and everything after it jumps. Collapse it: split at the spaces,
clip each word to a measured pixel width, run width and opacity to zero, swap
the text, re-measure and open. Per word, not per phrase: each collapse stays
short and the real spaces sit outside the boxes, so the phrase still wraps. 250–400ms.

```css
.slot { display: inline-block; overflow: hidden; white-space: nowrap;
  transition: width .3s var(--ease), opacity .24s }
.slot > .sizer { position: absolute; visibility: hidden; white-space: nowrap }
```
⚠ `aria-hidden` the sizer twin or every word is announced twice. Under
`prefers-reduced-motion` render the bare word; a clipped span is missed by
find-in-page.
