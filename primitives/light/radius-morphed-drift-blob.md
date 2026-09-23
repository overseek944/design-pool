---
id: radius-morphed-drift-blob
category: light
tags: [ambient,blob,organic,morph,border-radius,blur,keyframes,dark]
axes: {energy: 2, density: 3, weight: 3, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A blurred lamp that only translates reads as a disc on rails. Run two
animations at once: a transform drift and an eight-value `border-radius` morph
on an unequal period, so the silhouette reshapes while it travels and no two
passes match. Reuse one morph across lamps with `reverse`. Drift 20–40s, morph
18–30s, travel ±8–22%, scale 0.9–1.3, blur 60–100px.

```css
.lamp { filter: blur(80px); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: drift 28s ease-in-out infinite, morph 22s ease-in-out infinite }
@keyframes morph { 50% { border-radius: 30% 60% 70% 40% / 50% 60% 40% 50% } }
```
⚠ Animating `border-radius` repaints the blurred layer every frame: 3–5 lamps,
paused offscreen and under reduced motion.
