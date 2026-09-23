---
id: width-resolved-ratio-overlap
category: layout
tags: [layout,overlap,aspect-ratio,responsive,composition]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A panel pulled up over a fixed-ratio media block loses its proportion if the
overlap is a pixel value: the media shrinks with the viewport and a bite that
read as a sixth of a desktop frame eats a third of a phone-sized one.
Percentage margins resolve against the containing block's inline size on *both*
axes, and a ratio-locked box's height is that same width times its ratio — so a
percentage pull-up is the one unit holding a constant fraction of the media at
every width. Put it on a wrapper carrying the panel and anything travelling
with it, so there is one offset to reason about rather than two that have to
agree. 5–12%.

```css
.clip  { width: 100%; max-width: 1000px; aspect-ratio: 16 / 9 }
.after { margin-top: -7% }     /* -7% of the container's WIDTH, at every width */
```
⚠ The percentage needs a containing block with a resolvable width — inside a
flex or grid item sized by its content it resolves against something you did
not choose. Below the width where panel and media stop sharing a row, drop the
overlap to zero rather than scaling it: an overlap reads as *on* the media only
while nothing sits between them.
