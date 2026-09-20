---
id: relit-state-fill
category: light
tags: [light,gradient,hover,control,surface]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: [emitted-light-not-borders]
---
A gradient-filled control usually signals hover by getting brighter, which reads
as a value change. Reverse the *stop order* instead and the same fill reads as
the lamp moving — the face that was catching light now falls away, and the
bottom edge lights up. It is a physical event, not a tint, so it survives on a
saturated fill where a brightness step would blow out. Keep the hue fixed and
move only the order; 3 stops, mid stop 35–65%.

```css
.btn       { background: var(--base) linear-gradient(#4dc6ff, #00aeff 62%, #1bb6ff);
             transition: background-image .2s ease-out }
.btn:hover { background-image: linear-gradient(#007bb8, #00aeff 38%, #4dc6ff) }
```
⚠ Both gradients must be the same function with the same stop count or the
browser hard-swaps at the midpoint. Keep a solid `background-color` underneath —
the gradient is decoration, the flat colour is what contrast is measured against.
