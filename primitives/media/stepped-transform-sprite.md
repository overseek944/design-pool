---
id: stepped-transform-sprite
category: media
tags: [media,sprite,animation,svg,performance]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Play a short looping illustration as a filmstrip: frames in one wide row, slid
by whole frames with `steps()`. Because the only animated
property is `transform`, it stays on the compositor — cheaper than swapping
`background-position`, and unlike a video it works inside an SVG. Start paused and let a viewport
observer release it, so idle sequences cost nothing. 8–16 frames over 0.6–2s.

```css
@keyframes strip { to { transform: translateX(-100%) } }
.sprite {
  transform-box: fill-box; will-change: transform;
  animation: strip var(--dur, 1.2s) steps(var(--frames, 12), end) infinite;
  animation-play-state: paused;
}
```
⚠ `steps(n)` must match the frame count exactly or the loop drifts; one wide strip is also one large decode, so cap the row width.

When the frames are DOM rather than one image — glyphs, spans, subtrees — stack
them in one grid cell instead of sliding a strip. Frames need no common width,
nothing decodes, and the still state is one child.
```css
.stack { display: inline-grid }  .frame { grid-area: 1/1;
  animation: show .64s step-end infinite }   /* slice = 1/n exactly */
@keyframes show { 0%, 24.99% { opacity: 1 } 25%, to { opacity: 0 } }
@media (prefers-reduced-motion: reduce) { .frame { opacity: 0; animation: none }
  .frame:first-child { opacity: 1 } }
```

`transform-box` has a second value that matters whenever a *part* of a drawing
animates: `view-box` resolves percentage `transform-origin` against the SVG's
own viewBox rather than the element's tight bounding box. A beam pivoting about
a hinge, a needle about its pin, a lid about its fold — the origin can then be
authored in the same coordinates as the artwork, and it stays put when the
shape's own extent changes mid-animation. `fill-box` is right for whole-sprite
moves; `view-box` for anything hinged.
```css
.beam { transform-box: view-box; transform-origin: 50% 29% }
```
⚠ Without either value the origin resolves against the *reference box*, which
for SVG children is the nearest viewport — usually not what the artwork implies.
