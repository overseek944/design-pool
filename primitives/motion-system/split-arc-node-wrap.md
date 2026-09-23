---
id: split-arc-node-wrap
category: motion-system
tags: [motion,loop,timeline,conic,ring,mask,arrival,connector]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A pulse reaching a node on a line reads as passing through unless the node answers. Split the arrival: two conic arcs on one masked ring, both starting at the entry side, one rotating over the top and one under, converging on the exit side and fading as the pulse leaves. Put both on the pulse's period and delay each node by period × i / N, so the wrap fires exactly at arrival. Sweep 8–12% of the period, tail 60–100°.

```css
.arc { position: absolute; inset: -6px; border-radius: 50%; animation: 8s linear infinite;
  mask: radial-gradient(circle, #0000 56%, #000 60% 96%, #0000) }
.arc.top { background: conic-gradient(var(--c) 0deg, #0000 1deg 260deg, var(--c) 360deg); animation-name: wrap-top }
@keyframes wrap-top { 0% { opacity: 0; rotate: 270deg } 1% { opacity: 1 } 9% { opacity: 1; rotate: 450deg } 12%, to { opacity: 0 } }
```
⚠ Decorative — hide both arcs under reduced motion rather than freezing them mid-sweep.
