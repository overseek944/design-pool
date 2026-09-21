---
id: frameless-alpha-artwork
category: media
tags: [media,illustration,assets,transparency,composition]
axes: {energy: 1, density: 2, weight: 2, finish: 3}
cost: 2
seen: 3
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

When the pipeline cannot be committed — a vendor render, a stock frame, an
opaque-only CDN — a radial mask buys the same frameless read from an asset that
has no alpha at all, and none of the byte cost. The catch is that a mask fades
*alpha*, not luminance: the asset's baked ground has to match the page's within
a step or two of lightness, or the fade ends in a visible grey ellipse instead
of in nothing. Size the opaque core so the subject's extremities clear it —
core 30–40%, clear by 95–100%.
```css
.render { mask-image: radial-gradient(ellipse 78% 82% at center,
                                      #000 34%, transparent 98%) }
```
⚠ Audit on the darkest and lightest section the asset can land in. A ground
match that holds on one band is a halo on the next, and the mask cannot correct
it — only a re-export can.
