---
id: backdrop-blur-tier-system
category: surface
tags: [surface,depth,glass]
axes: {energy: 1, density: 3, weight: 3, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Treat backdrop blur as a depth scale, not a decoration: `sm` for inline chips,
`md` for cards and nav, `xl` for full overlays. Consistent blur radius per
elevation tier is what makes layered translucency read as a spatial system.
⚠ always pair with a semi-opaque background — blur alone fails contrast.
