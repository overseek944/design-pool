---
id: smil-driven-filter-parameter
category: surface
tags: [svg-filter,feturbulence,displacement,ambient,motion,texture,accessibility]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A surface that should read as alive rather than animated wants its *material* to
move, not its box. Animate a filter primitive's own attribute and the warp drives
itself: turbulence whose frequency breathes, sampled by a displacement map, gives
foliage, cloth or a torn paper edge a slow wander that no transform on the element
produces. No listener, no rAF, no library, and it keeps time while script is busy.
Swing the frequency 30–60% either side of base over 6–14s; displacement scale
4–14, past which the subject smears into the warp.

```html
<filter id="w"><feTurbulence baseFrequency=".008 .02" numOctaves="2" result="n">
  <animate attributeName="baseFrequency" values=".008 .02;.012 .03;.008 .02"
    dur="8s" repeatCount="indefinite"/></feTurbulence>
<feDisplacementMap in="SourceGraphic" in2="n" scale="8"/></filter>
```
⚠ Reduced-motion is unreachable from here — no media query applies to SMIL, so
branch in script and call `svg.pauseAnimations()`. Every frame re-rasterises the
whole filtered subtree: budget it on one decorative element, never a section.
