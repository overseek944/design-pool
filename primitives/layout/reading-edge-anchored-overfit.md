---
id: reading-edge-anchored-overfit
category: layout
tags: [layout,fit,scale,crop,legibility,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
When a fit is clamped — a minimum legible scale, a ceiling of 1 — the subject
can end up wider than its frame, and centring then cuts *both* sides. Every
label loses its head and its tail at once: `sitemap` reads as `emap`. Anchor
the edge the content is read from and let the far side run out of frame. What
leaves is the trailing column, usually metrics or chrome, which is the half a
narrow viewport can least use; the names stay whole.

```js
const over = subjectW * z > frameW
x = over ? pad - subjectLeft * z             /* reading edge pinned, pad 16–32px */
         : (frameW - subjectW * z) / 2       /* it fits: centre */
```
⚠ The reading edge flips under `rtl` and on a right-aligned numeric column —
key it off the writing mode, never off `left`.
