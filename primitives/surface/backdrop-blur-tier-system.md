---
id: backdrop-blur-tier-system
category: surface
tags: [surface,depth,glass]
axes: {energy: 1, density: 3, weight: 3, finish: 4}
cost: 3
seen: 9
requires: []
conflicts: []
completes: []
tension: []
---
Treat backdrop blur as a depth scale, not a decoration: `sm` for inline chips,
`md` for cards and nav, `xl` for full overlays. Consistent blur radius per
elevation tier is what makes layered translucency read as a spatial system.
⚠ always pair with a semi-opaque background — blur alone fails contrast.

Variant — put `saturate(1.4–1.8)` before the blur. Blur averages neighbouring
pixels and drains colour with it; the saturate pass restores what the blur ate,
which is the difference between glass and frosted plastic. Useful radii run
4–32px across the tiers.

Tiers can trade places rather than stack. A bar that is a full-width `sm` plate
at rest and an inset `xl` capsule once scrolled should move the glass between
the two layers — outer to transparent as the inner plate takes it up — so only
one element is compositing a backdrop filter at any moment.

On a dark ground add `brightness(1.05–1.12)` after the saturate. Blur over dark
content averages toward the ground and the plate sinks into it; the brightness
pass lifts it back to reading as a layer above, which is the one thing the blur
was meant to say. Above ~1.15 the text behind the glass starts to ghost through.
