---
id: tiled-shape-edge-mask
category: surface
tags: [surface,mask,edge,ornament,texture,section]
axes: {energy: 2, density: 3, weight: 2, finish: 3}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Cut a section boundary with a shape rather than a straight line: one small tile
used as a repeating mask along the edge. Because it masks instead of painting,
whatever fills the band shows through the cut — flat colour, gradient, grain —
and scallops, pinking, torn paper or waves are all one swapped file. Declare
both mask axes in pixels and re-declare them per breakpoint so the tile keeps a
constant physical size instead of stretching. Tile 50–70px wide narrow,
100–140px wide.
```css
.edge { height: var(--tile-h,88px); background: var(--band);
  mask: url(scallop.svg) left center /
        var(--tile-w,120px) var(--tile-h,88px) repeat-x }
```
⚠ `mask-size: contain` rescales the tile to the band and the repeat stops
landing whole. Ship the `-webkit-mask` pair.

Where the boundary should read as a *signal* rather than a cut, paint it: an SVG
band stretched full-bleed with `preserveAspectRatio="none"` and every stroke on
`vector-effect: non-scaling-stroke`, which holds authored weights exact through
a stretch that would otherwise smear them. Layer a fat translucent stroke as a
body, a hairline over it, a dashed pass for texture. Band height 100–180px.
