---
id: quantised-ground-transition
category: surface
tags: [surface,color,gradient,tokens,detail]
axes: {energy: 1, density: 2, weight: 2, finish: 3}
cost: 1
seen: 2
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

Built as separate band elements rather than one gradient, the strip can arrive:
each band `scaleY` 0 → 1 from its bottom edge, staggered 40–60ms starting at the
band nearest the darker ground, so the transition climbs out of the lower
section instead of being painted on. 0.45–0.65s per band, a strong ease-out.
```css
.band { transform-origin: bottom; animation: grow .55s cubic-bezier(.32,.72,0,1) both }
.band { animation-delay: calc(var(--i, 0) * 50ms + var(--lead, .9s)) }  /* --i: 0 at the dark end */
```
⚠ Hold the settled bands in authored markup and gate the keyframe on
`prefers-reduced-motion: no-preference` — a strip stuck at `scaleY(0)` is a hard seam again.
