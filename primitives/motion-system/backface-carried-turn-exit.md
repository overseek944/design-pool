---
id: backface-carried-turn-exit
category: motion-system
tags: [motion,transition,3d,exit,scene]
axes: {energy: 3, density: 1, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scene that dissolves on exit ends nowhere. Turn it: rotate the stage a
half-turn about its vertical axis under perspective, leaving
`backface-visibility` at its default so past edge-on the sheet's reverse
keeps showing — mirrored, blurring, fading as the turn completes. The gesture
finishes its arc instead of stopping at the 90° void. Perspective 1200–2000px,
0.7–1.1s on a strong in-out curve, ending on 2–4px of blur.

```css
@keyframes turn {
  from { transform: perspective(1700px) rotateY(0) }
  to   { opacity: 0; transform: perspective(1700px) rotateY(-180deg);
         filter: blur(3px) } }
```
⚠ A half-turn is a vestibular trigger: the reduced-motion branch is a plain
fade, not a shorter turn. Spend the opacity before edge-on or the reverse
reads as mirrored text.
