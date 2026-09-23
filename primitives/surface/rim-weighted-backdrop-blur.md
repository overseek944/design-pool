---
id: rim-weighted-backdrop-blur
category: surface
tags: [surface,glass,blur,backdrop-filter,mask,rim,controls]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Thick glass is clear in the middle and smeared at the edge. Fake it without a
displacement map: a near-clear face (0.5–2px blur) plus a pseudo-element with
heavy blur and saturate, masked by an inverted radial — clear at centre, opaque
at the rim. A small control over footage then reads as a lens, not a chip.

```css
.ctl { backdrop-filter: blur(1px) saturate(1.2) }
.ctl::before { content: ""; position: absolute; inset: 0; border-radius: inherit;
  backdrop-filter: blur(8px) saturate(1.65);   /* 6–12px, 1.5–1.8 */
  mask-image: radial-gradient(100% 100% at 50% 50%, #0000 42%, #000 82%) }
/* clear stop 35–50%, opaque stop 75–90% */
```
⚠ Two backdrop readbacks per control — keep few on screen; collapse to one
opaque plate under `prefers-reduced-transparency`.
