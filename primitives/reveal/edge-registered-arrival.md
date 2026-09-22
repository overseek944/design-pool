---
id: edge-registered-arrival
category: reveal
tags: [reveal,entrance,box-shadow,outline,keyframes,acknowledge,one-shot]
axes: {energy: 2, density: 1, weight: 1, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
Mark a region's arrival at its boundary instead of moving its content. When the
block enters view its inner edge lights as a hairline in the accent colour, then
fades back to nothing, so the page says "this frame is now live" without any
text or image travelling. Suits instrument-like pages where sliding entrances
feel theatrical. Peak alpha 0.12–0.25, peak at 10–20%
of a 0.6–1.2s one-shot, ring 1px.

```css
[data-in] { animation: edge-ack .9s ease-out both }
@keyframes edge-ack { 15% { box-shadow: inset 0 0 0 1px rgb(var(--accent) / .18) } }
```
⚠ An inset shadow paints under children with their own background — it
vanishes behind a full-bleed image. Skip under `prefers-reduced-motion`.
