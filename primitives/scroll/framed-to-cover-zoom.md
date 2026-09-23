---
id: framed-to-cover-zoom
category: scroll
tags: [scroll, pin, zoom, hero, scale, frame, media]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 3
seen: 1
requires: [sticky-as-cheap-pin]
conflicts: []
completes: []
tension: []
---
A pinned hero can open as media in a frame and scroll into it. Scale the scene
from 1 to its cover factor — the larger stage/scene ratio — over 15–25% of the
runway with smoothstep, fade the frame chrome early, then drop any shape clip
so edges land square at full bleed.

```js
const z = smooth(clamp((p - START) / SPAN)), k = Math.max(W / w, H / h)
scene.style.transform = `translate(-50%,-50%) scale(${1 + z * (k - 1)})`
frame.style.opacity = 1 - smooth(clamp((p - START) / (SPAN * .7)))
```
⚠ Scaled text resamples — divide its size by the scale. Runway 300–500svh;
reduced motion shows the end state.
