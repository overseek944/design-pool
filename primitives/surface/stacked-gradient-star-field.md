---
id: stacked-gradient-star-field
category: surface
tags: [surface,texture,ambient,depth,performance]
axes: {energy: 2, density: 3, weight: 1, finish: 4}
cost: 1
seen: 2
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
