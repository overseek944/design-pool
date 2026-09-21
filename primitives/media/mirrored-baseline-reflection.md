---
id: mirrored-baseline-reflection
category: media
tags: [media,mask,surface,depth,detail,css-only]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A cut-out subject on a surface reads as pasted on unless something below it
agrees. Duplicate it under its own baseline, flip with `scaleY(-1)`,
and mask twice: a vertical ramp on the wrapper for depth, and a *symmetric
horizontal* ramp on the flipped copy itself, because a silhouette ends in hard
left and right edges that the flip makes obvious. Two nested elements, one mask
each, so the axes tune independently without `mask-composite`. Vertical
fade gone by 60–95%, side fade 8–18% per edge.

```css
.refl { position: absolute; top: 100%; inset-inline: 0; height: 100%;
  mask-image: linear-gradient(to bottom, #000 0, transparent var(--fade, 80%)) }
.refl img { transform: scaleY(-1); --s: var(--side, 12%);
  mask-image: linear-gradient(to right, transparent 0, #000 var(--s),
              #000 calc(100% - var(--s)), transparent) }
```
⚠ It doubles the paint of whatever it mirrors — spend it on an already-decoded
image, never on live text or video. Past ~60% opacity it competes with the
subject instead of seating it.
