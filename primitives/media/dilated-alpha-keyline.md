---
id: dilated-alpha-keyline
category: media
tags: [media,icon,logo,filter,contrast,legibility,detail,css-only]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A raster mark has no `stroke` to reach for, so a pale logo dropped on a pale
ground loses its silhouette and there is nothing to outline. Chain four
zero-blur `drop-shadow()`s at one pixel on each axis: filter functions feed each
other, so the second casts from the union of the mark and the first, and the
four together dilate the alpha into a continuous ring — curves and diagonals
included, not a plus. Offset 0.5–2px; the ring is square rather than round, so
past that add the two diagonals or half a pixel of blur.

```css
.mark { filter: drop-shadow(1px 0 0 var(--ink)) drop-shadow(-1px 0 0 var(--ink))
                drop-shadow(0 1px 0 var(--ink)) drop-shadow(0 -1px 0 var(--ink)) }
```
⚠ Four passes, each an offscreen composite — fine on a 16–32px mark, expensive
animated or full-bleed. The ring paints outside the content box and is cut by
any clipping ancestor.

Chain a soft shadow onto the same filter *after* the ring and it casts from the
dilated silhouette rather than the raw alpha, so the keyline reads as a
physical edge the shadow falls away from. Order is the mechanism: a blurred
pass placed before the dilation feeds blurred alpha into all four offsets and
the ring goes woolly. Blur 8–14px, 3–5px down, alpha .12–.18.
```css
filter: drop-shadow(1px 0 0 var(--ink)) /* …the other three… */
        drop-shadow(0 4px 10px #00000024)
```
⚠ A fifth pass is a fifth offscreen composite. On anything large put the cast
shadow on a wrapper instead, so animating the mark re-renders the ring only.
