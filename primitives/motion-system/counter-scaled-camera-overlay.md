---
id: counter-scaled-camera-overlay
category: motion-system
tags: [camera,transform,overlay,cursor,correctness]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Anything drawn *for the reader* over a zooming scene — a synthetic pointer, a
callout, a measurement — must not inherit the camera's scale, or a 4× push
turns a 16px arrow into a 64px one. Keep it inside the transformed stage so it
still speaks scene coordinates, then cancel the zoom on its own `scale`
channel, transitioned on the camera's exact duration and easing variables —
any other value and the two visibly separate mid-move. Holds over 1/0.2–1/1.5.
```css
.stage  { transform: translate(var(--cam-x), var(--cam-y)) scale(var(--cam-scale)) }
.cursor { scale: calc(1 / var(--cam-scale)); transform-origin: 0 0;
          transition: scale var(--cam-ms) var(--cam-ease) }
```
⚠ `transform-origin` must be the mark's hotspot, not its centre, or it drifts
off target as it counter-scales. Using the `scale` channel leaves `transform`
free for the overlay's own press or nudge.

`border-radius` is not a transform and the `scale` channel cannot reach it: a
corner on a box scaled 3× is drawn at 3× the authored radius, so a card pushed
into the frame arrives visibly rounder than it was designed. Divide the resting
radius by the live factor and write it as a length — the corner then holds one
apparent size through the whole push. The same division is what a `scaleX`-only
morph needs to stop its corners going elliptical.
```js
el.style.borderRadius = `${rest / scale}px`     // rest 12–24px
```
⚠ A length written per frame is a style invalidation per frame — round it to
0.1px and compare against the last string before writing. Only for a box whose
radius is small relative to its side; at pill radii the division overshoots and
the corner flattens.
