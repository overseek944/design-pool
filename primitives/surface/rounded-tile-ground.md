---
id: rounded-tile-ground
category: surface
tags: [ground, grid, tile, gradient, panel, structure, backdrop]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A soft gradient panel reads as a flat wash. Partition it into a grid of large
rounded tiles — 240–400px cells, 2–6px gutters, radius 12–24px — each a white
wash at 2–6% alpha with a hairline of the ground's darkest hue at 2–4%. The
gradient runs unbroken beneath but gains a quiet architectural grain.

```css
.panel { background: linear-gradient(135deg, var(--a), var(--b)); position: relative }
.panel > .tiles { position: absolute; inset: 0; display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 4px; pointer-events: none }
.tiles > i { border-radius: 16px; background: rgb(255 255 255 / .04);
  border: 1px solid rgb(6 27 76 / .03) }
```
⚠ Decorative nodes — mark the layer `aria-hidden`, or use one tiled SVG.
