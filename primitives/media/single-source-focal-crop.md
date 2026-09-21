---
id: single-source-focal-crop
category: media
tags: [media,responsive,performance,detail]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
One photograph can hold a headline at every width without a second crop. Keep
the file and change what is in frame: `object-position` moves the focal point,
and `transform: scale()` against a chosen origin decides how much of the subject
is cut. A composition whose quiet region sits left on a wide screen wants that
region pulled toward 60–70% and the frame tightened 8–15% at the narrow end. One
decode, one cache entry, no `<picture>` fork.

```css
.shot { object-fit: cover; object-position: 65% center;
        transform: scale(1.12); transform-origin: top }
@media (min-width: 40rem) { .shot { object-position: center; transform: none } }
```
⚠ Whatever the alt text names must survive the tightest frame.

Across a *set* — portraits in a row, cards in a grid — the crop is one rule and
the focal point is per item, so publish the two numbers as custom properties on
each instance and let the stylesheet stay single. Faces sit at different heights
in different photographs, and a shared `object-position` centre either decapitates
someone or strands them in the frame. Zoom 1–1.4, origin as a percentage pair.
```css
.avatar { object-fit: cover; width:100%; height:100%;
          transform: scale(var(--pz, 1)); transform-origin: var(--pf, 50% 50%) }
```
```html
<img class="avatar" style="--pz:1.25;--pf:58% 32%" alt="…">
```
⚠ Scaling inside a fixed box crops without changing layout, but the element must
clip — put `overflow: hidden` on the wrapper or the image spills over its
neighbours.
