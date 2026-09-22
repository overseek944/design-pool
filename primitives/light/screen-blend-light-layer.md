---
id: screen-blend-light-layer
category: light
tags: [effect,blend,compositing,dark]
axes: {energy: 3, density: 3, weight: 3, finish: 4}
cost: 3
seen: 17
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

Dropping blacks is relative to the backdrop, not absolute, which is what makes
`screen` the cheap way to land a raster mark carrying a baked black matte on a
dark page — and the reason it fails in exactly the place a mark usually sits.
The matte vanishes only where the backdrop is at or below its own value, so a
header at 90–95% opacity over near-black composites *above* the matte and the
box reappears as a faint square. Anything establishing a stacking context does
it too, `backdrop-filter` included: the mark then blends against the chrome's
own fill rather than the page. Test the mark on the chrome it will sit on, not
on the section ground.
```css
.bar  { background: rgb(from var(--bg) r g b / .92); backdrop-filter: blur(8px) }
.mark { mix-blend-mode: screen }   /* blends against .bar, not the page */
```
⚠ There is no partial fix — either the chrome goes fully opaque at the page
colour, or the mark needs a real alpha channel. A matte that is merely close is
worse than a visible one, because it only shows at some scroll positions.

Variant — `soft-light` with the layer's own fill held at pure white or pure
black. The layer then carries no hue at all: it only lifts or sinks the
luminance already under it, so one decorative field composites correctly over
any gradient, tint or photograph without being re-tuned per section. Because
the whole effect lives in one fill value, the theme flip is that value —
`fill: light-dark(#fff, #000)` — and the field lightens a light ground and
darkens a dark one from a single declaration. Opacity 0.5–0.8; below that it
stops registering, since soft-light's response near mid-grey is very flat.
⚠ Nothing in the layer can carry meaning — over a mid-tone ground it drops to
almost nothing, and `forced-colors` discards the blend entirely.

Variant — `exclusion` where a wash must tint a near-black ground without ever
veiling the copy on top of it. It inverts toward the layer's colour in
proportion to what is already under it, so true black is untouched, the ground's
own faint values drift warm, and white text is pushed *away* from the wash
rather than clouded by it — the failure mode `screen` has at any opacity high
enough to see. Run one such element the length of the document instead of one
per section, bleeding past both sides: 150–250px of blur at 30–50% opacity, and
the tint crosses section boundaries continuously rather than restarting at each.
```css
.wash { position: absolute; inset-block: 0; inset-inline: -1500px; z-index: 1;
  mix-blend-mode: exclusion; opacity: .46; filter: blur(220px); pointer-events: none }
```
⚠ A document-length blurred element is one compositor buffer taller than the
page. Cap the blur radius rather than the element, keep it off the scroll
container's own transform, and drop it entirely under
`prefers-reduced-transparency`.

Variant — `soft-light` with *type* as the layer. Set a wordmark far past display
size at the page's foot, bled beyond three edges so only a fragment of the
letterforms reads, and blend rather than fill: the mark takes its colour from
whatever wash sits behind it and becomes a tonal field instead of a second logo.
Soft-light is the one that survives a near-black ground — screen blows it out,
overlay leaves it grey. Cap height 1.5–4× the viewport's short side.
```css
.coda-mark { position: absolute; inset: auto -4% -22%; width: 108%;
  mix-blend-mode: soft-light; pointer-events: none }   /* SVG paths, not text */
```
⚠ It carries no information and must not be the only place the name appears —
`aria-hidden`, and keep it out of the tab order. Blending a mark this large over
a gradient makes its contrast unpredictable; never run copy across it.
