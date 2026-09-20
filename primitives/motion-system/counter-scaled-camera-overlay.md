---
id: counter-scaled-camera-overlay
category: motion-system
tags: [camera,transform,overlay,cursor,correctness]
axes: none
cost: 1
seen: 1
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
