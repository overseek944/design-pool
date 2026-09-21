---
id: interleaved-ground-dissolve
category: surface
tags: [surface,color,pattern,section,boundary,texture]
axes: {energy: 2, density: 3, weight: 3, finish: 2}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Carry one ground into another by interleaving their pixels at a ratio that
ramps across a band — no third colour is ever painted, so the transition needs
no mixing space, survives a two-colour register, and reads as a raster artifact
rather than a blur. It is what makes a page that inverts wholesale per section
survivable. The ratio must reach a true 0 and 1 inside the band, not at its
edges: feather the last 15–25% quadratically or a line of stray cells marks the
seam. Band `clamp(5rem, 8vh, 8rem)`.

```css
.band { height: clamp(5rem, 8vh, 8rem); margin-bottom: -1px;
  background: linear-gradient(var(--from) 50%, var(--to) 50%) }
```
⚠ Give the band that hard two-stop background as its own fallback — it already
reads as both grounds meeting, so nothing flashes before the pattern paints.

The same interleave erodes a *photograph* into the page, where a ramped ratio
between two flat grounds cannot reach. Lay a fixed-density tile of the
destination colour over the image — coarse squares at `shape-rendering:
crispEdges`, randomised placement and per-cell alpha so it never reads as a
screen — and ramp it with `mask-image` instead of ramping the tile. Density then
belongs to the mask, so one tile serves every edge and both grounds. Tile
40–70px, gone by 35–45% of the run.
```css
.erode { position: absolute; inset: 0; background: var(--dither-tile) 0 0/58px;
  mask-image: linear-gradient(to top, #000 0, #0007 14%, transparent 40%) }
```
⚠ Cells are painted in the ground colour, so the tile is wrong the moment the
section under it changes tone — carry a light and a dark tile and swap on the
same token the section does.
