---
id: slope-coupled-bob
category: motion-system
tags: [motion,keyframes,loop,wave,rotation]
axes: {energy: 2, density: 1, weight: 2, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
An object rising and falling on a keyframed loop reads as a box on a lift: it
stays level while its height changes, which nothing carried by a medium does.
Keyframe the tilt as the *slope* of that curve — steepest where the travel
crosses zero, level at the extremes — and it rides the wave instead of being
moved by one. Amplitude 6–14px, pitch 1.5–4°.

```css
@keyframes bob {
  0%,100% { translate: 0;     rotate: var(--pitch) }
  25%     { translate: 0 var(--amp);  rotate: 0deg }
  50%     { translate: 0;     rotate: calc(var(--pitch) * -1) }
  75%     { translate: 0 calc(var(--amp) * -1); rotate: 0deg } }
```
⚠ The last stop must restate `0%`, or the tilt falls back to the element's base
rotation and snaps once a cycle. Past 5° it reads as tumbling; keep the period
above 3s and branch on reduced motion.

An element already holding a static pose — a tile turned in 3D, a card rotated
off-axis — loses that pose the moment a keyframe touches `transform`, because
the shorthand replaces the whole list rather than composing with it. The common
repair is to restate the full pose in every stop, which then has to be edited in
four places whenever the angle changes. Put the pose on the individual
`rotate`/`scale` properties and let the loop own `translate` alone: pose and
motion are separate declarations that compose by spec. Pitch 6–14°.
```css
.tile { rotate: y 12deg; animation: rise 7s ease-in-out infinite }
@keyframes rise { 0%,100% { translate: 0 } 50% { translate: 0 -14px } }
```
⚠ Individual properties always apply *after* `transform`, so an element with
both gets the shorthand first — mixing the two on one element reorders the
composition and the pose lands in the wrong space.
