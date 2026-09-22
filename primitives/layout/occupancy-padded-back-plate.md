---
id: occupancy-padded-back-plate
category: layout
tags: [layout,layering,overlap,depth,mock,plate]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Two layers of one scene — a wide plate behind, a card in front — collide: the
plate's own rows run under the card and the overlap reads as a mistake rather
than as depth. Reserve the card's footprint in the plate's *padding*, as a
percentage of the plate, so the plate lays out only in the space it keeps.
Nothing is measured, the reservation tracks a fluid card, and mirroring the
scene is swapping which side takes the padding. Reserve 26–34%.

```css
.plate      { position: absolute; inset: 34px 28px 34px 24%;
              padding: 22px 26px 22px 30% }
.plate.flip { inset: 34px 24% 34px 28px; padding: 22px 27% 22px 26px }
```
⚠ The fraction is of the plate, not of the card, so it stops clearing once the
card goes full width. Drop the plate at that breakpoint rather than retuning it.
