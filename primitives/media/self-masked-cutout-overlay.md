---
id: self-masked-cutout-overlay
category: media
tags: [media,mask,color,effect,detail]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A cut-out subject on transparency cannot be graded from CSS — any wash laid over
it covers the whole box, matte included. Use the image as its own mask: the same
file on `mask-image` confines the overlay to exactly the opaque pixels, so a
`mix-blend-mode: color` tint pulls the subject into the section's hue with no
second asset and no re-export. The same silhouette carries a rim gradient, a
grain film or a duotone equally. Tint 10–25%; past that the subject reads as
printed rather than lit.

```css
.cut::after { content: ""; position: absolute; inset: 0;
  background: var(--tint); mix-blend-mode: color; opacity: .16;
  mask-image: url(subject.png); mask-size: 100% 100% }
```
⚠ Mask and image must share a box exactly — `object-fit` moves the photo inside
its frame and not the mask, and the grade slides off the subject. Ship the
`-webkit-mask-*` pair.
