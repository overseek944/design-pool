---
id: cover-scale-as-scalar
category: media
tags: [media,correctness,geometry,overlay,responsive,css-only]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`object-fit: cover` scales inside the element and reports nothing, so a sibling
overlay has no way to land on a feature of the scaled bitmap. Compute the same
factor instead — the larger of box width over natural width and box height over
natural height — and publish it as a custom property. The image takes its size
from that rather than from `cover`, and any overlay in the same scaled units
registers exactly at every viewport.

```css
.plate { --nw: 1600; --nh: 900;
  --k: max(calc(100vw / var(--nw)), calc(var(--box-h) / var(--nh)));
  --w: calc(var(--nw) * var(--k)); --h: calc(var(--nh) * var(--k)) }
.plate > img, .plate > .overlay { width: var(--w); height: var(--h) }
```
⚠ This replaces `cover`, it does not read it: `object-position` has to be
reproduced as an offset of your own, usually a `clamp()` so the plate cannot
pull away from an edge. Both natural dimensions must be literal numbers.
