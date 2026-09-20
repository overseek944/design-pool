---
id: chained-filter-duotone
category: media
tags: [media,color,filter,normalisation,texture]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Supplied photographs come from different cameras, days and light, and a row of
them reads as a scatter however well each is cropped. Collapse the set onto one
hue with a filter chain. Order is the whole trick: `grayscale()` first so
no source colour survives to fight the tint, `sepia()` to lay down one hue
everywhere, then `hue-rotate()` to steer that hue to the palette. Rotate before
sepia and every photograph rotates from a different start. Sepia 0.3–0.6 sets
tint depth; trim saturation and contrast last.

```css
.duotone { filter: grayscale(1) sepia(.4) hue-rotate(175deg)
                   saturate(.75) brightness(.94) contrast(1.02) }
```
⚠ `filter` makes the element a containing block and a stacking context —
absolutely-positioned children re-anchor to it and blending above it stops
reaching the page. Put it on the image, not the card.
