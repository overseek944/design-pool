---
id: srcset-blocked-source-swap
category: media
tags: [media,images,responsive,correctness,state]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Assigning `img.src` from script does nothing while the element still carries
`srcset`: the browser re-runs its own selection over the candidate list and
lands on the same file, so the old picture stays. It fails silently, and only
at the widths and pixel ratios where a candidate beats `src` — which on markup
from a CMS or an image component is most of them. Swapping a slot's picture
imperatively means writing the whole source set, not one attribute.

```js
img.srcset = next.set                       // keep selection working
img.sizes  = next.sizes
img.src    = next.fallback; img.alt = next.alt
// no responsive set for the new file? remove both, do not leave them stale
```
⚠ Clearing `srcset` and `sizes` instead is the quick fix and costs responsive
selection for the rest of the session — the swapped file is then served at every
width. Write `alt` in the same commit, or the accessible name describes the
picture that was there before.
