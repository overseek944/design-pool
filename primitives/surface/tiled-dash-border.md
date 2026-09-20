---
id: tiled-dash-border
category: surface
tags: [surface,border,dash,precision,texture]
axes: {energy: 1, density: 2, weight: 1, finish: 4}
cost: 2
seen: 2
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

Four `repeating-linear-gradient`s on `background-origin: border-box` instead of
one image — a whole edge per layer, sized `100% var(--w)` or `var(--w) 100%` and
placed at each side. It costs the background slot rather than a tile, but the
colour is a custom property so one rule serves every theme, dash and gap tune
independently, and the pattern *can move*: shift `background-position` by
exactly one period and the dashes march. Period 6–10px, dash 3–5px of it.
```css
.panel { --p: 8px; --w: 1px; border: var(--w) solid #0000;
  --e: repeating-linear-gradient(90deg, var(--c) 0 4px, #0000 4px var(--p));
  background: var(--e) 0 0/100% var(--w) no-repeat,
              var(--e) 0 100%/100% var(--w) no-repeat;
  background-origin: border-box; animation: march .7s linear infinite }
@keyframes march { to { background-position: var(--p) 0, calc(var(--p) * -1) 100% } }
```
⚠ Opposite edges must travel in opposite directions or the loop reads as the
whole box sliding. Marching is a live-process cue and reads as one — never on
static chrome, and stopped, not slowed, under reduced motion.
