---
id: pointer-borne-rule-sight
category: interaction
tags: [interaction,pointer,overlay,hover,transform,detail]
axes: {energy: 3, density: 2, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
State the pointer as *rules*, not as a mark: hairlines longer than the region,
held at fixed angles and translated together, so position reads at the far
edge — a sight laid over the surface, not a dot chasing it. Write transforms in
one rAF from the last move, never the handler, and run the loop only between
enter and leave. Angles 0/45/90 or 0/90, 2–4 lines, 1–2px.

```css
.rule { position: absolute; inset: 0 auto auto 0; width: 220%; height: var(--hair);
  transform: translate(calc(var(--x) - 50%), calc(var(--y) - 50%)) rotate(var(--a)) }
```
⚠ `pointer-events: none`, out of the a11y tree. No touch or keyboard
equivalent — gate on `(hover: hover) and (pointer: fine)`, ship the surface
complete without it.
