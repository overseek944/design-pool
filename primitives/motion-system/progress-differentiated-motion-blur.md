---
id: progress-differentiated-motion-blur
category: motion-system
tags: [motion,blur,camera,velocity,filter,transition]
axes: {energy: 4, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A fast camera push between two framings strobes: every frame is a sharp still at
a new scale. The web has no accumulation buffer, but a push smears radially
anyway, so an isotropic blur is a fair stand-in. Differentiate the *rendered*
progress each frame and scale the blur by that speed against the curve's peak
velocity — it stays correct whatever easing is swapped in, and falls to zero as
the move lands. Peak 2–8px; below 0.3px write `none`.

```js
const v = Math.abs(p - prevP) / dt; prevP = p
const px = MAX_BLUR * Math.min(1, v / V_PEAK)
stage.style.filter = px < .3 ? 'none' : `blur(${px.toFixed(1)}px)`
```
⚠ `filter` repaints the whole layer every frame — keep the blurred element
small and live text outside it. Drop the blur entirely under
`prefers-reduced-motion`.
