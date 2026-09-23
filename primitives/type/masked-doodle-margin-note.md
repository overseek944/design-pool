---
id: masked-doodle-margin-note
category: type
tags: [type,annotation,handwritten,mask,callout,informal]
axes: {energy: 2, density: 2, weight: 2, finish: 2}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
One hand-drawn note on an otherwise engineered surface points harder than any
badge. Draw the arrow once as a raster or SVG and use it as a `mask`, so
`background-color` tints it to the accent in any theme; pair it with one or two
words in a script face rotated −2 to −5°, the arrow at 8–15°. Reserve
padding on the element it points at so it never overlaps content.

```css
.doodle { width: 84px; aspect-ratio: 1; background: var(--accent);   /* 64–96px */
  mask: url(arrow.svg) center / contain no-repeat; rotate: 12deg }
.note { font-family: var(--script); rotate: -3deg; transform-origin: 0 }
```
⚠ One per view; repeated, it is decoration. Below ~640px drop the arrow
and flow the note inline.
