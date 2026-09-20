---
id: multi-edge-mask-fade
category: surface
tags: [surface,mask,edge,composition,bleed]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Let an oversized panel run past the layout and dissolve instead of being cropped
by a hard edge. One `linear-gradient` mask layer per side, each with its own
fade distance, so a detailed surface can bleed off two edges while staying
legible on the others. Name the stops as tokens so the rule reads as a list of
edges, not a wall of colour. Fade distances 80–560px, tuned per edge.

```css
:root { --mask-on: #000; --mask-off: transparent }
.stage {
  mask-image:
    linear-gradient(to left,   var(--mask-off) 0, var(--mask-on) var(--fade-r, 400px)),
    linear-gradient(to top,    var(--mask-off) 0, var(--mask-on) var(--fade-b, 300px));
  mask-composite: intersect;
}
```
⚠ `mask-composite` needs the `-webkit-` prefix pair to work in Safari; without `intersect` the layers union and nothing fades.

Percentage stops instead of px when the fade should scale with the element —
`8%`/`92%` on a horizontal rail keeps the same proportion of fade at every width,
where a fixed 400px eats a narrow one whole. Px for fixed-size stages,
percentages for anything fluid.
