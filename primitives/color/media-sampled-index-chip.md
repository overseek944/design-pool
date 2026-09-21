---
id: media-sampled-index-chip
category: color
tags: [color,accent,media,contrast,grid]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One brand accent repeated across a grid of unrelated photographs will fight at
least one of them. Give each repeating chip — index, tag, count — the hue of its
own item's media and pin the lightness across every member: hue carries the
pairing, lightness carries the contrast, so the set still reads as one family
and the ink on it is verified once. Sample at build time; a hue eyeballed per
card is what drifts. Chip lightness 30–42%, chroma clamped 0.04–0.10.

```css
.chip { background: oklch(36% .07 var(--media-h)); color: #fff }
```
⚠ Hue free, lightness pinned is the whole contract — let a sampled lightness
through and yellow-sourced chips fail 4.5:1 while blue-sourced ones pass.
