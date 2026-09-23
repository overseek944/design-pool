---
id: ground-multiplied-raster-tint
category: surface
tags: [surface,texture,tint,blend,image,theming,cheap]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A greyscale raster — engraving, halftone, photo — takes any
palette without re-export if it is multiplied into the box's own
`background-color`: white becomes the ground, black stays ink, midtones take
the hue. The art has no edge: its paper *is* the surface. Place
the image at the box edges and lay a radial white wash on top, so the
middle stays clean for copy. Ground at 90–97% lightness; wash solid to
20–30%, gone by 85–95%.

```css
.plate { background-color: var(--ground);
  background-image: radial-gradient(45% 140%, #fff 25%, #fff0 90%), var(--art), var(--art);
  background-position: 50%, 0, 100%; background-repeat: no-repeat;
  background-blend-mode: normal, multiply, multiply }
```
⚠ Multiply only darkens — useless on dark grounds; invert the art and use `screen` there.
