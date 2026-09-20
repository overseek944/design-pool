---
id: blend-doubled-headline
category: light
tags: [type,blend,legibility,contrast,compositing]
axes: {energy: 2, density: 2, weight: 4, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Set the headline twice in one grid cell: an opaque copy under the artwork, an
identical copy over it carrying `mix-blend-mode`. Type crossing from flat ground
onto saturated imagery stays readable and takes colour from behind it — no
scrim, no drop shadow, no tonal ceiling on the art. `hard-light` over a
semi-transparent violet is the default; `overlay` is gentler.

```css
.head { grid-area: 1/1 }
.head--under { color: var(--blend-source) }
.head--over  { z-index: 1; mix-blend-mode: hard-light; color: rgb(0 14 255 / .5) }
```
⚠ Blend math is gamut-dependent — correct the source colour under
`@media (color-gamut: p3)` or hue drifts on wide displays. `aria-hidden` the
duplicate; check contrast at every scroll position, not just the first.
