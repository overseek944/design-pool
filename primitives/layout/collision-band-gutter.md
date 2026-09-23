---
id: collision-band-gutter
category: layout
tags: [layout,container-query,annotation,responsive,correctness]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Margin notes need room beside the reading column, but only in a band of widths:
narrower and there is none to give, wider and the page's own slack already
supplies it. Reserve the gutter as `min()` of two opposing linear terms over the
container's inline size, clamped at both ends — it opens as the container passes
the lower edge and closes again as it passes the upper. The measure is sized
first and never shrinks to make space. Band 900–1400px, peak gutter 200–340px.
```css
.doc { container: doc / inline-size }
.doc > * { --aside: clamp(0px, min(1392px - 100cqi, 100cqi - 964px), 336px);
           padding-inline: 52px calc(52px + var(--aside)) }
```
⚠ Below the band the notes need a second home — inline, or an anchored overlay.
`cqi` with no container ancestor resolves to `0`, which reads as the closed
state rather than as an error.
