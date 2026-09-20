---
id: blended-grain-over-gradient
category: surface
tags: [surface,texture,grain,gradient,blend-mode,banding]
axes: {energy: 1, density: 3, weight: 3, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A wide gradient across a saturated panel bands on 8-bit displays and reads as a
picture of a surface rather than a surface. Stack a small tiling noise image as
the first background layer and blend it into the gradient with `soft-light`:
the grain is modulated by what is under it, lifting the dark end and holding
the light end back instead of laying one flat film over both. Give the tile an
explicit size and let the gradient cover. Tile 32–96px, noise amplitude low
enough to be unreadable at 100%.

```css
.panel { background-image: var(--grain), linear-gradient(112deg, var(--a), var(--b));
         background-size: 4rem 4rem, auto;
         background-blend-mode: soft-light, normal }
```
⚠ Blend modes compose within the box, so the gradient must be the layer
directly beneath — the page ground will not do. Inline the tile as a data URI:
a separate request lands after first paint and the banding shows until it does.

Generate the tile rather than shipping one. An inline `feTurbulence` data URI —
`fractalNoise`, `baseFrequency .6–1`, three octaves, desaturated through
`feColorMatrix` and laid at 3–6% — is a few hundred bytes of markup,
resolution-independent, and retunable without a round trip through an image
editor. Held in a token slot it also becomes theme-conditional: the same slot
resolves to `none` on a light ground, where grain that reads as film over a dark
panel reads as dirt.
```css
--texture: url("data:image/svg+xml,<svg xmlns='…'><filter id='g'><feTurbulence \
  type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/>…")
```
⚠ `stitchTiles="stitch"` or the tile seams visibly at any size. Filter
rasterisation is not free — one tiled element, never one per card.
