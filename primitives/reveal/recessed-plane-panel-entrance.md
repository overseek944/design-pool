---
id: recessed-plane-panel-entrance
category: reveal
tags: [reveal,entrance,3d,perspective,media,motion]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A wide panel — an app frame, a large figure — can arrive from behind the page
plane rather than rising up it: pushed back on Z, tilted a few degrees on X,
both settling to zero. Scale the camera to the panel — a close perspective bends
a 1000px plane into a trapezoid; use 3–5× its width. Z −120 to −300px, tilt
6–14deg, rise 20–40px, 0.8–1.4s expo-out.

```css
.panel { opacity: 0; animation: settle 1.1s cubic-bezier(.16,1,.3,1) forwards;
  transform: perspective(4000px) rotateX(10deg) translateY(30px) translateZ(-200px) }
@keyframes settle { to { opacity: 1; transform: perspective(4000px) rotateX(0) translateZ(0) } }
```
⚠ Text in the panel is soft until the tilt lands. Reduced motion: opacity only.

Scaled down to a text line, drop the Z push and keep the hinge: each line
tilts back −15 to −25deg on X from 30–50px below, settling over 0.8–1.1s on a
decelerating curve, triggered as its own top crosses 80–90% of the viewport.
The line reads as swinging up off the page rather than sliding. Give the
parent a perspective of 600–1200px or the tilt flattens to a squash.
⚠ Tilted type is unreadable mid-motion — keep it off body copy longer than
two lines.
