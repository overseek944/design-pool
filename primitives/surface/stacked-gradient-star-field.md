---
id: stacked-gradient-star-field
category: surface
tags: [surface,texture,ambient,depth,performance]
axes: {energy: 2, density: 3, weight: 1, finish: 4}
cost: 1
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
A regular lattice reads as ruled ground; an *irregular* point field reads as
depth. Stack six to ten tiny radial-gradients at hand-picked fractional
positions in one `background-image`, each its own size and alpha, then tile the
whole set. Two layers at different tile sizes, opacities and drift speeds give
parallax. No DOM nodes, no image request.

```css
.field { position: absolute; inset: -25%;
  background-image: radial-gradient(1.4px 1.4px at 12% 18%, #fffc, #0000),
                    radial-gradient(1px   1px   at 46% 91%, #ffffff8c, #0000);
  background-size: 340px 300px;          /* 300–560px per layer */
  animation: twinkle 7s ease-in-out infinite, drift 48s ease-in-out infinite alternate }
```
⚠ Oversize by the drift distance (`inset: -25%`) or a translated layer exposes
its own edge. Vary the tile size per layer — equal sizes make the repeat legible.

Where the points must land on *exact* positions — marks that align to a
diagram, a scatter composed by hand — author them as `<rect>`s inside one
`viewBox` instead and let the SVG crop rather than stretch:
`preserveAspectRatio="xMidYMid slice"` fills any container at any aspect ratio
without turning square points into rectangles, which a percentage background
position cannot avoid. `shape-rendering: crispEdges` keeps them hard squares at
every scale.
```html
<svg viewBox="0 0 1440 1440" preserveAspectRatio="xMidYMid slice"
     shape-rendering="crispEdges" aria-hidden="true" class="field">
  <rect x="1150.1" y="455.1" width="2" height="2" fill="#ffffff1f"/>
</svg>
```
⚠ `slice` crops from the centre, so points near the viewBox edges are the first
to leave. Compose the field so nothing load-bearing sits in the outer 15%.

The same `slice` crop carries line art, not only points, once the strokes are
pinned. Scale the viewBox art past the frame — 110–135% per axis with a
`min-width` floor so a narrow viewport does not crop it to nothing — and give
every stroke `vector-effect: non-scaling-stroke`, or the oversize multiplies
hairlines into visible rules. A schematic ground then holds one weight from
390px to a wide display.
```css
.ground { inline-size: 132vw; min-inline-size: 1120px; block-size: 118vh }
.ground [stroke] { vector-effect: non-scaling-stroke }
```
⚠ `vector-effect` does not inherit: set as an attribute on a `<g>` it computes
to `none` on every child and the whole correction silently does nothing. Reach
it with a descendant selector, per element.

Where the ground is a *schematic* rather than a texture — ruled lines, traces
that leave the ruling at right angles, nodes at the junctions — paint every mark
in `currentColor` and build the depth out of per-element `opacity` alone, in
three or four tiers (roughly .24 / .32 / .40 / .60, hairlines .5–.8px). One
`color` declaration on the `<svg>` then retints the whole field, and one
`opacity` on the parent scales the hierarchy proportionally, so the same artwork
serves a hero at .5 and a footer at .15 without a second export.
```html
<svg class="ground" style="color: var(--brand)" aria-hidden="true">
  <line stroke="currentColor" stroke-width=".5" opacity=".32"/>
  <circle fill="currentColor" r="3" opacity=".6"/></svg>
```
⚠ Baking the alpha into `stroke` as `rgba()` looks identical and kills both
controls. Tiers under ~.2 disappear entirely on a dim display — verify the
lowest one still resolves before it is load-bearing.

`slice` crops from the anchor, and the anchor is a choice: `xMaxYMid` pins the
art to the trailing edge, `xMinYMid` to the leading one. Compose the field's
mass against the edge it is anchored to and the crop eats only the sparse side —
the "nothing load-bearing in the outer 15%" rule above then applies to one edge
instead of four, so the dense corner survives every aspect ratio intact.
```html
<svg viewBox="0 0 1120 680" preserveAspectRatio="xMaxYMid slice" width="100%">
```
⚠ An off-centre anchor moves the art relative to the copy beside it as the box
narrows — check the crop against the text column, not only against the frame.
