---
id: frameless-alpha-artwork
category: media
tags: [media,illustration,assets,transparency,composition]
axes: {energy: 1, density: 2, weight: 2, finish: 3}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Artwork exported on transparency with a feathered edge does not need a frame and
reads better without one: no card, no radius, no mask. Placement does the
framing, the soft boundary dissolves into the page ground, and the asset can
cross a section seam or overhang a panel corner with no second treatment. It
commits the pipeline — every export on alpha, no baked ground anywhere. Feather
2–6% of the short side.

```css
.art { background: none; border: 0; border-radius: 0; overflow: visible }
```
⚠ A baked ground is invisible on the colour it was baked for and grows a
rectangle the moment a section tints or the theme flips — audit on a mid-tone,
not on white. Alpha defeats every opaque-format saving: budget 2–4× the
equivalent JPEG.
