---
id: screen-blend-light-layer
category: light
tags: [effect,blend,compositing,dark]
axes: {energy: 3, density: 3, weight: 3, finish: 4}
cost: 3
seen: 9
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

Variant — mask the blended layer so it never reaches the section's edges:
a radial ellipse falling to transparent by 85–90% keeps a wide texture from
ending on a visible rectangle, which is what usually gives these layers away.
At 5–10% opacity a photographic or procedural plate stops reading as an image
and starts reading as light already on the surface, which is the point — much
above that and it is a picture behind the copy.
```css
.plate { position: absolute; inset: 0; opacity: .07; mix-blend-mode: screen;
  background: url(plate.webp) center / cover no-repeat;
  mask-image: radial-gradient(ellipse 75% 50% at center, #000 30%, transparent 88%) }
```

Variant — `difference` where the layer must work over both a mark and its
inverse. It subtracts rather than adds, so a white band swept across a
two-tone logo flips black glyphs to white and white ground to black in one
declaration, with no knowledge of which pixels are which and no second asset
for a dark theme. Drive it by `background-position` on an oversized gradient
band rather than a transform, so nothing is promoted while it rests. Band 15–25%
of a 300% background width; sweep 0.4–0.6s.
```css
.mark::after { content:''; position:absolute; inset:25%;
  background: linear-gradient(112deg, #fff0 40%, #fff 40% 60%, #fff0 60%)
    no-repeat 130% 0 / 300% 100%; mix-blend-mode: difference }
.mark:hover::after { animation: sweep .48s cubic-bezier(.3,0,.2,1) }
```
⚠ Difference against a mid-grey returns mid-grey — it does nothing on a mark
that is not high-contrast, and it inverts any colour in one.
