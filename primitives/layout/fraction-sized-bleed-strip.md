---
id: fraction-sized-bleed-strip
category: layout
tags: [layout,overflow,scroll,affordance,responsive,measure]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A horizontal strip inside a measured column ends flush at that column's edge and
reads as a finished row. Pull the port out to the viewport with a negative inline
margin and equal inline padding: items still start on the column, the strip runs
off the edge. Size them as a viewport fraction, not a fixed width — at
`min(78–86vw, cap)` a slice of the next is cropped at every width, so the crop is
the affordance. Revert both to zero where the column gains its own gutter.

```css
.port  { overflow-x: auto; overscroll-behavior-inline: contain;
         margin-inline: calc(-1 * var(--g)); padding-inline: var(--g) }
.track { display: flex; width: max-content; gap: var(--gap) }
.item  { flex: none; inline-size: min(82vw, 680px) }
```
⚠ A fixed item width tiles the port exactly at some viewport and the peek — the
only cue the strip scrolls — vanishes silently at that one size.
