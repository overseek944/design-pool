---
id: stroke-restored-display-contrast
category: type
tags: [type,display,contrast,accent,accessibility,ornament]
axes: {energy: 1, density: 2, weight: 4, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A display glyph filled with a high-chroma accent fails against its ground, and
darkening it throws away the reason it was chosen. Outline it instead: a text
stroke in the ink colour carries the edge the fill cannot, so the fill keeps its
saturation and the letterform its shape. The stroke is centred on the contour
and eats inward — pair it with a light weight, never a bold. 1–2px across
4–10rem.

```css
.mark { font-size: clamp(4rem, 9vw, 10rem); font-weight: 300;   /* 250–350 */
        color: var(--accent); -webkit-text-stroke: 1px var(--ink) }
```
⚠ Not a contrast fix for running text — below roughly 3rem the stroke closes
apertures and the glyph gets harder to read, not easier.
