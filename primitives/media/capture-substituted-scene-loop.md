---
id: capture-substituted-scene-loop
category: media
tags: [media,video,3d,performance,budget,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An ambient 3D scene nobody touches does not need a renderer. If it reads no
pointer, no scroll, no theme and no data, record one orbit and ship the file:
engine, shaders and the per-frame GPU bill all leave the bundle, and
fixed-function video decode costs a fraction of a continuous draw loop on a
phone. Encode two cuts — full, and a narrow-viewport one at a third the pixels
— and cap the long edge near 1.5× the largest box it fills. Loop 8–20s;
shorter and the cycle becomes audible.

```html
<video autoplay muted loop playsinline preload="none" poster="/scene.webp">
  <source media="(max-width: 767px)" src="/scene-sm.mp4"><source src="/scene.mp4">
</video>
```
⚠ The recording freezes palette, speed and crop. Keep the project file and
treat the encode as a build artefact, or the scene can never be retimed again.
