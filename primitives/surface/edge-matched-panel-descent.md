---
id: edge-matched-panel-descent
category: surface
tags: [backdrop,artwork,seam,full-bleed,continuity,overscroll,ground]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Full-bleed artwork sections read as separate pictures because each ends at its
own edge. Match the joins: author every panel so its top row carries the colour
the panel above ended on, and give each section that sample as its
`background-color`. Distinct scenes then read as one descent, the plain sections
between them as clearings rather than breaks, and overscroll never exposes a
foreign ground. Hold 4–10% of each panel flat at top and bottom.

```css
.panel { background: var(--edge) center / cover no-repeat }
.sky   { --edge: #a8cdf5; background-image: url(sky.avif) }
.field { --edge: #a8cdf5; background-image: url(field.avif) }  /* same value */
```
⚠ `cover` crops differently at every aspect ratio, so a join with detail near
the edge tears at some viewport width — the flat band is what makes the seam
width-independent. Token the pair; a re-export otherwise reopens the line.
