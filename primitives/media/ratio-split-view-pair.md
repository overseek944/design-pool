---
id: ratio-split-view-pair
category: media
tags: [media,figure,aspect,grid,editorial]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One subject argued from two views — as photographed, and as the machine reads
it — becomes a gallery once a gutter separates them. Divide one `aspect-ratio`
box into equal tracks at zero gap; the outer frame owns the radius, the
hairline and the clip. Two pictures, one figure. Take the ratio from what a
*cell* needs — N tracks make each the box divided by N, so a 4:3 pair is
written `16/6`. Two or three cells; past that none holds a subject.

```css
.pair { aspect-ratio: 16/6; display: grid; gap: 0;
        grid-template-columns: repeat(2, 1fr);
        border-radius: 1.5rem; overflow: hidden }
.pair > img { inline-size: 100%; block-size: 100%; object-fit: cover }
```
⚠ One frame carries the claim; the other takes an empty `alt` or the pair is
announced twice. Under ~28rem a cell falls below its legibility floor — drop
to one frame, not two stacked.
