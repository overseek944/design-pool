---
id: mask-channel-scrim-regions
category: surface
tags: [scrim,imagery,mask,contrast,accessibility]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scrim written as stacked background gradients compounds wherever two layers
meet, so an edge ramp crossing a keep-out doubles the tint exactly where it was
already correct. Put the shape in the mask channel instead: one flat tint, one
mask layer per region. Mask layers composite with `add`, which unions and
clamps, so each region is authored on its own terms and none darkens another —
and the tint stays a single token, independent of where it lands. Tint .45–.65
alpha, each region feathered over 8–20% of its own run.

```css
.scrim { position: absolute; inset: 0; background: rgb(15 23 42 / .6);
  mask: linear-gradient(#000 7%, #0000 26% 91%, #000 100%),
        radial-gradient(54% 100% at 68% 36%, #0000 64%, #000 88%) }
```
⚠ Every region must clear 4.5:1 on its own — a keep-out creeping under the
headline removes the contrast the scrim exists for. `add` is the initial value,
so no `mask-composite` and no prefix pair; naming any other mode needs both.
