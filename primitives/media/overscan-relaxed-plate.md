---
id: overscan-relaxed-plate
category: media
tags: [media,image,reveal,scale,motion,observer]
axes: {energy: 2, density: 1, weight: 3, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A plate that scales *up* on arrival rests at a non-integer factor and stays
faintly soft. Invert it: stage the media overscanned inside a clipped wrapper
and relax to exactly `1`, so the settled frame is pixel-exact and no edge is
exposed mid-flight. The overscan is the whole budget and must stay small, so
the duration carries the movement instead — the frame breathing out, not a
jump. Overscan 1.03–1.10, 1.1–1.8s.

```css
.plate      { overflow: hidden }
.plate img  { transform: scale(1.06); transition: transform 1.4s var(--ease) }
.plate.in-view img { transform: none }
```
⚠ Observe the wrapper, never the image — a transformed child reports its scaled
box. A page-width plate composites at viewport size for the whole transition;
under `reduce` ship it at rest rather than faster.
