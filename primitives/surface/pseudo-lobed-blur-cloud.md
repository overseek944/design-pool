---
id: pseudo-lobed-blur-cloud
category: surface
tags: [surface,ambient,drift,blur,pseudo-element,css-only,atmosphere]
axes: {energy: 1, density: 2, weight: 2, finish: 3}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A soft cloud from one element, no asset: a rounded pill plus two pseudo-element
lobes that inherit its fill and radius, then blurred together so the silhouette
melts into cumulus. Drift a few across the section on long linear loops with
negative delays so the sky is already populated at load. Blur 10–20px; loops
90–200s; opacity 0.4–0.75, falling with size to fake depth.

```css
.cloud { position:absolute; border-radius:9999px; background:#ffffffd9; filter:blur(14px);
  animation: drift 135s linear -40s infinite }
.cloud::before, .cloud::after { content:""; position:absolute; background:inherit; border-radius:inherit }
.cloud::before { width:55%; height:120%; top:-30%; left:15% }
@keyframes drift { to { transform: translateX(150vw) } }
```
⚠ Keep blurred layers few (3–5) and transform-only; stop them under
prefers-reduced-motion.
