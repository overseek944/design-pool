---
id: screen-blend-light-layer
category: light
tags: [effect,blend,compositing,dark]
axes: {energy: 3, density: 3, weight: 3, finish: 4}
cost: 3
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
`mix-blend-mode: screen` on an overlay makes it add light and drop its own blacks
— glows, grain, and beams composite onto dark grounds with no matte box. Wrap the
group in `isolation: isolate` so the blend can't reach the page background.
```css
.beam { mix-blend-mode: screen } .group { isolation: isolate }
```

Variant — `overlay` instead of `screen` for film grain: it lightens highlights
and darkens shadows, so the tile reads as texture across the whole tonal range
rather than washing dark areas out. Tile 128–256px at 0.5–0.9 opacity.

Variant — `multiply` is the light-ground counterpart: it keeps darks and drops
whites, so a supplied logo carrying a baked white box composites onto a tinted
section with no matte and no re-cut asset. It also darkens every colour in the
mark against anything but pure white, so check the brand colours at the tint
you are actually using, and never reach for it on a dark ground — there the
whole mark disappears.

Variant — `color-dodge` where the ground is near-black and `screen` disappears
into it. Dodge divides by the inverse, so it lifts the ground's own faint values
hard while leaving true black untouched: a turbulence film reads as luminous
grain on a dark surface instead of a grey veil. Keep it at 10–20% opacity — it
clips to white fast and will blow out any highlight already in the layer.
