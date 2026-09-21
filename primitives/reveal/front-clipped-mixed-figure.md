---
id: front-clipped-mixed-figure
category: reveal
tags: [reveal,svg,clip-path,diagram,motion,detail]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A figure that is not all strokes — connectors carrying node discs, arrowheads,
labels — cannot be drawn on with `stroke-dashoffset`: only the strokes own a
dash to move, so everything else is fully present at the first frame. Clip the
whole group with a rect that grows along the reveal axis instead, and each part
arrives as the front passes over it, in true spatial order. One clip per member
gives each its own front. Transition the width so a coarse write reads as
travel. Overhang the rect 4–8px on the perpendicular axis.

```html
<g clip-path="url(#c1)"><path d="…"/><circle cx="0" cy="8" r="3.5"/></g>
<clipPath id="c1"><rect x="-5" y="-5" class="front"/></clipPath>
```
```css
.front { width: max(0px, calc(var(--reveal, -5px) + 5px));
         height: calc(100% + 10px); transition: width .45s ease-out }
```
⚠ `clipPath` ids are document-global — generate one per instance or a second
copy of the component clips to the first's front. A CSS length on the rect is
user units, so the overlay must be `viewBox`-less for `--reveal` to mean page
pixels.
