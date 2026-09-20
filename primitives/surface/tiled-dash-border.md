---
id: tiled-dash-border
category: surface
tags: [surface,border,dash,precision,texture]
axes: {energy: 1, density: 2, weight: 1, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`border-style: dashed` offers no control — dash length is derived from border
width, differs between engines, and the pattern almost never lands cleanly at a
corner. A small tile in `border-image` with the `round` keyword replaces it:
the tile is rescaled so a whole number fits each edge, giving identical dash
phase on all four sides at any length. Keep the `dashed` declaration underneath
as the fallback.

```css
.panel { border: 1px dashed var(--rule);
         border-image: var(--dash-tile) 2 round }
```
⚠ Tiles of 8–16px with a 1–2px slice; a larger slice inflates the border box
and shifts the layout. An image cannot inherit `currentColor`, so ship one tile
per theme and swap the token.
