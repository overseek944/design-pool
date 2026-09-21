---
id: fraction-sized-bleed-strip
category: layout
tags: [layout,overflow,scroll,affordance,responsive,measure]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 1
seen: 4
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

Where explicit arrows carry the affordance the peek is not needed, and exact
tiling beats it: size each item at `calc((100% - (n - 1) * gap) / n)` so n items
and their gaps fill the port precisely and the rail lands flush at every page
instead of cropping a different sliver per breakpoint. Restate n per breakpoint
— one, two, three — and the gap stays one token. It is the scroll-port
equivalent of `repeat(n, 1fr)`, which a flex track cannot use.
```css
.item { flex: none; inline-size: calc((100% - var(--gap)) / 2) }
@media (width >= 64rem) { .item { inline-size: calc((100% - 2 * var(--gap)) / 3) } }
```
⚠ Tiling exactly removes the only cue that the strip scrolls, so the arrows
become load-bearing: they have to exist at every width that tiles, and reach the
keyboard before the track does.
