---
id: stacked-blur-radius-ramp
category: surface
tags: [surface,blur,glass,scrim,depth,legibility]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Masking one `backdrop-filter` plate fades the *result*, not the radius: the
blur stays uniform and runs out, leaving an edge. To ramp the radius,
stack plates whose blur doubles while their gradient windows advance by half a
window — two neighbours cover every band, so no step shows. Earns its cost
where chrome floats over moving content and a flat scrim reads as a bar. Six
to eight layers, base 6–24px.

```css
.l1 { backdrop-filter: blur(.5px); mask-image: linear-gradient(#0000 0%, #000 12.5% 25%, #0000 37.5%) }
.l7 { backdrop-filter: blur(32px); mask-image: linear-gradient(#0000 75%, #000 87.5%) }
```
⚠ Every layer is its own backdrop root: eight plates, eight readbacks a frame.
Never animate the radius; collapse to one under `prefers-reduced-transparency`.
