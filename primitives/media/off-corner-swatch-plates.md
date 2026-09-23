---
id: off-corner-swatch-plates
category: media
tags: [media,ornament,collage,offset,color,cheap]
axes: {energy: 2, density: 2, weight: 3, finish: 2}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Push one or two flat colour squares out past different corners of a small
image, as if print plates had slipped out of register. The image reads as a
placed object, not a cropped window; pseudo-elements, no markup. Plates
30–60% of the image's short side, protruding 8–20%; vary colour and corner per
instance so a series reads as prints, not a stamp.

```css
.plate { position: relative; isolation: isolate }
.plate::before, .plate::after { content: ""; position: absolute; z-index: -1;
  width: var(--size, 40%); aspect-ratio: 1 }    /* 30–60% */
.plate::before { top: -12%; right: -12%; background: var(--a) }
.plate::after  { bottom: -12%; left: -12%; background: var(--b) }
```
⚠ An `overflow: hidden` ancestor clips the plates; pad for the protrusion.
