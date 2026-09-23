---
id: clip-bound-layer-caption
category: media
tags: [media,label,clip,interaction,accessibility]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A wipe or drag reveal that names its two states with badges floating above both
layers has to fade them by hand, and they disagree with the clip at every
intermediate position. Put each label *inside* the layer it names — the revealed
layer's caption within the clipped box, the base layer's outside it — and the
clip does the work, entering and leaving exactly at the seam for free. Opposite
corners so the pair never meets at the extremes. Rest the reveal at 45–60% so
both read before anything is touched.

```css
.top      { position: absolute; inset: 0; clip-path: inset(0 calc(100% - var(--x,55%)) 0 0) }
.top .cap { position: absolute; inset-block-start: .75rem; inset-inline-start: .75rem }
.base .cap{ position: absolute; inset-block-start: .75rem; inset-inline-end: .75rem }
```
⚠ `clip-path` clips paint and hit-testing, not the accessibility tree — a caption
wiped off screen is still announced. Drive `aria-hidden` from the same value.
