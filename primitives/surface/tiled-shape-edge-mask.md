---
id: tiled-shape-edge-mask
category: surface
tags: [surface,mask,edge,ornament,texture,section]
axes: {energy: 2, density: 3, weight: 2, finish: 3}
cost: 2
seen: 4
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

Where the band is painted rather than drawn, its own alpha is the cut: a
full-bleed asset feathered along one edge needs no mask, no tile and no repeat,
and the boundary is authored in the artwork where it can be irregular in a way
a repeating tile cannot. Commit to one soft edge only — the opposite edge stays
hard and butts a flat ground, so the band has a decided side. Bleed the asset
past both ends and let `object-fit: cover` crop rather than stretch.
⚠ It pins the seam to one aspect ratio: the feathered edge lands at a different
height at every width, so any content aligned to it needs its own anchor. A
band this wide is the page's heaviest asset — it earns its place once, not at
every section boundary.

Neither masking nor a stretched band survives a boundary against *photographic*
ground: a mask cuts to whatever the band paints, and a painted band has to fake a
colour the neighbour is not. Invert it — give the incoming section a pseudo-element
carrying a curve filled with **its own** flat ground colour, and overlap it into the
neighbour. The curve is then a hole, and what shows through is the real neighbour,
textured or not. A hairline stroked along the same path reads as the edge itself.
Overlap 40–70px.
```css
#next::before { content: ""; position: absolute; top: -53px; left: 0; right: 0;
  height: 54px; background: url("data:image/svg+xml,<svg …
    preserveAspectRatio='none'><path d='M0,30 C470,15 980,44 1440,27 L1440,54 L0,54 Z'
    fill='%23101215'/></svg>") no-repeat 100% 100% }
```
⚠ A data-URI fill cannot read a custom property — every colour is a literal
duplicated from the token it mirrors, and changing a ground silently desyncs its
divider. Keep the token name in a comment beside each one, and give the arc a
different control-point pair per boundary: identical curves repeated down a page
read as a template.
