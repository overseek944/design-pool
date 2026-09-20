---
id: quantised-ground-transition
category: surface
tags: [surface,color,gradient,tokens,detail]
axes: {energy: 1, density: 2, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Two flat sections meeting edge to edge give a hard seam; a smooth ramp between
them gives a soft one belonging to neither. A third answer: a short strip of
four to six discrete bands, each a `color-mix` of the two ground tokens at an
even share, written as one hard-stop gradient. The change is declared rather
than hidden, and every band derives from the two tokens, so the strip retints
with the palette instead of drifting off it. Strip 32–56px; past about eight
steps it reads as a gradient again.

```css
.seam { height: clamp(32px, 5vh, 56px); background: linear-gradient(
  color-mix(in oklab, var(--a) 78%, var(--b)) 0 25%,
  color-mix(in oklab, var(--a) 55%, var(--b)) 25% 50%,
  color-mix(in oklab, var(--a) 32%, var(--b)) 50% 75%,
  color-mix(in oklab, var(--a) 13%, var(--b)) 75% 100%) }
```
⚠ Neither end band may equal its adjacent ground exactly, or the strip grows two
invisible edges and the visible step count silently drops by two.
