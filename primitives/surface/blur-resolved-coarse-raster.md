---
id: blur-resolved-coarse-raster
category: surface
tags: [surface,canvas,texture,filter,cheap,detail]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A raster drawn far under display size — a hundred-cell field, a downscaled
still — is stretched by the engine's bilinear pass, and past roughly 10× that
pass leaves the cell lattice legible as soft squares. Finish it in CSS instead:
one blur of about the displayed cell size resolves the buffer into a continuous
wash, with no larger buffer and no interpolation code. The layer has to be
overscaled by at least the blur radius first — a blur inside a clipped box eats
its own edges and the ground shows through the border. Blur 8–20px, scale
1.05–1.15, a little saturation back for what the blur averages away.

```css
.panel { overflow: hidden; isolation: isolate }
.panel > canvas { position: absolute; inset: 0; width: 100%; height: 100%;
  transform: scale(1.08); filter: blur(14px) saturate(1.05) }
```
⚠ `filter` promotes the layer and re-rasterises it at device resolution on
every frame it changes — trivial over a 110px source, a full-bleed bill over a
large one. Nothing legible may live in the blurred layer: type and controls go
in a sibling above it, which is also what `isolation` protects.
