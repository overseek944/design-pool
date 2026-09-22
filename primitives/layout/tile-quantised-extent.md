---
id: tile-quantised-extent
category: layout
tags: [layout,pattern,correctness,repeat,css-math]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A repeating decoration — perforations, a ruler, ticks — filling an arbitrary
height ends on a sliced tile. CSS `round(down, …)` snaps the extent to a whole multiple of the
tile before painting, so the pattern always closes on a complete unit; add a
fixed tail when the last unit needs a finished end. Tile 1–4rem; tail is a
fraction of one tile.

```css
.strip { --tile: 3rem; --tail: calc(var(--tile) * .64);
  height: max(0px, calc(round(down, 100% - var(--start) - var(--tail), var(--tile)) + var(--tail)));
  background: repeat-y top / 100% var(--tile) var(--hole) }
```
⚠ `round()` is recent — without support the declaration drops; keep a plain `height: 100%` before it.
