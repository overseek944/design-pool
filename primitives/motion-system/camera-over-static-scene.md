---
id: camera-over-static-scene
category: motion-system
tags: [motion,transform,scale,focus,diagram,narrative]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
To walk a reader through a diagram, move the viewport rather than the subject.
One wrapper takes `scale()` plus a `translate()` that re-centres the next point
of interest, returning to neutral between beats so the whole is re-established
before each push. Nothing inside moves relative to anything else, so a complex
scene stays coherent under motion that would scramble it part by part. Push
1.2–1.45×; translations under ±20%; hold 1.5–3s at each stop.
```css
@keyframes camera {
  0%,11% { transform: scale(1) translate(0) }
  15%,21% { transform: scale(1.34) translate(13%,-1%) }
  25%,28% { transform: scale(1) translate(0) }
}
```
⚠ Scaling up resamples raster content — the scene must be SVG, text or DOM to
survive a 1.34× push. Anything positioned `fixed` inside escapes the transform.
