---
id: blended-grain-over-gradient
category: surface
tags: [surface,texture,grain,gradient,blend-mode,banding]
axes: {energy: 1, density: 3, weight: 3, finish: 4}
cost: 1
seen: 21
requires: []
conflicts: []
completes: []
tension: []
---
A wide gradient across a saturated panel bands on 8-bit displays and reads as a
picture of a surface rather than a surface. Stack a small tiling noise image as
the first background layer and blend it into the gradient with `soft-light`:
the grain is modulated by what is under it, lifting the dark end and holding
the light end back instead of laying one flat film over both. Give the tile an
explicit size and let the gradient cover. Tile 32–96px, noise amplitude low
enough to be unreadable at 100%.

```css
.panel { background-image: var(--grain), linear-gradient(112deg, var(--a), var(--b));
         background-size: 4rem 4rem, auto;
         background-blend-mode: soft-light, normal }
```
⚠ Blend modes compose within the box, so the gradient must be the layer
directly beneath — the page ground will not do. Inline the tile as a data URI:
a separate request lands after first paint and the banding shows until it does.

Generate the tile rather than shipping one. An inline `feTurbulence` data URI —
`fractalNoise`, `baseFrequency .6–1`, three octaves, desaturated through
`feColorMatrix` and laid at 3–6% — is a few hundred bytes of markup,
resolution-independent, and retunable without a round trip through an image
editor. Held in a token slot it also becomes theme-conditional: the same slot
resolves to `none` on a light ground, where grain that reads as film over a dark
panel reads as dirt.
```css
--texture: url("data:image/svg+xml,<svg xmlns='…'><filter id='g'><feTurbulence \
  type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/>…")
```
⚠ `stitchTiles="stitch"` or the tile seams visibly at any size. Filter
rasterisation is not free — one tiled element, never one per card.

Generate the tile rather than requesting it: an inline `feTurbulence` in an
SVG data URI costs no round trip and keeps `baseFrequency`, `seed` and octave
count readable in the declaration. `fractalNoise` at 0.6–0.9 is paper tooth;
`turbulence` at the same frequency is a cloudier wash. Over a flat opaque
stock, blend `multiply` instead of `soft-light` — the grain then reads as ink
taken up unevenly rather than as a film laid over the panel.
```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'
  width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise'
  baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160'
  filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
background-blend-mode: multiply
```
⚠ Desaturate inside the filter with `feColorMatrix type="saturate" values="0"`
or the turbulence arrives in colour and tints the stock.

Where the grain belongs to the *page* rather than to one panel, the
background-layer form cannot reach: it only ever composites inside its own box.
One fixed element at `inset: 0` with `mix-blend-mode` blends against everything
painted beneath it instead — sections, imagery, cards — for a single
viewport-sized paint that never repeats per component and never scrolls out of
register. `multiply` at 2–4% on light stock, `soft-light` at 3–6% on dark.
```css
.grain { position: fixed; inset: 0; z-index: 0; pointer-events: none;
         opacity: .025; mix-blend-mode: multiply; background: var(--tile) 0 0/150px }
```
⚠ It is a blend layer over the whole document: anything that must stay exact —
a logo, a chart's series colours, a photograph — has to sit above it, and
`aria-hidden` is mandatory. Mask the plane in below the fold if a full-bleed
hero should stay clean.

Opacity is the wrong control for how hard the grain bites. Raising it lifts the
whole layer's mean and greys the surface; `filter: contrast(140–180%)` on the
grain element instead pushes turbulence mid-greys out toward both ends, leaving
the mean alone and raising only the variance — so the tooth sharpens without the
stock going flat. Expose the blend and the strength as a pair of custom
properties on the component and one tile serves every surface at its own
setting.
```css
.surface { --grain-blend: soft-light; --grain-strength: .5 }
.surface::before { mix-blend-mode: var(--grain-blend); opacity: var(--grain-strength);
  filter: contrast(165%); background: var(--tile) 0 0/84px }
```
⚠ `filter` on the pseudo-element rasterises it as its own layer, which is the
one thing the background-layer form avoided — keep it off anything that repeats
per card.

The blend mode is a property of the ground, not of the grain. `overlay` and
`soft-light` lift a dark field, which is what makes the texture read at all; the
same layer over a light ground lightens it further and shows as a grey film.
Flip to `multiply` in the light theme and cut the opacity to roughly half — a
pale ground reveals far more of the same noise — and one grain layer serves both
themes from one asset.
```css
.grain             { mix-blend-mode: overlay;  opacity: .035 }
:root.light .grain { mix-blend-mode: multiply; opacity: .02 }
```
⚠ Tune it against the palest surface in the theme rather than the page ground —
a white card sitting under a full-bleed grain is where the film shows first.

Over a photograph both the blend mode and the amount change. The picture already
carries its own sensor grain, so the layer's job is to seat the plate in the
page's noise floor rather than lay a film over a flat surface: `overlay`, which
pushes highlights up and shadows down around the midpoint, at 25–45% — an order
above the few per cent a flat panel takes. Scope it to the frame alongside the
scrim, not to the section, or the amount that reads as emulsion over the image
reads as dirt over the type.
```css
.frame > .grain { position: absolute; inset: 0; pointer-events: none;
  background: var(--noise) 0 0/256px; mix-blend-mode: overlay; opacity: .38 }
```
⚠ Overlay drives both ends away from mid-grey, so copy burnt into the picture
loses contrast exactly where the grain bites hardest. Measure the caption
against the graded, grained frame — never against the source file.

Dropping the blend turns the same tile into a *document* treatment rather than a
panel one. A fixed, full-viewport pseudo-element at plain low opacity needs no
layer beneath it, so it crosses every section and both polarities with one rule
and no per-panel wiring. It also lies over type, which sets the ceiling: 2–4% on
a dark ground, and less on a light one, where the film lands on body copy that
has no contrast to spare.
```css
body::before { content: ""; position: fixed; inset: 0; pointer-events: none;
               opacity: var(--grain-a); background-image: var(--texture) }
```
⚠ Stack it below overlays, not above them. At the top of the stacking register
it grains modals, focus rings and whatever text a dialog is trying to make
legible — the one place the veil costs more than it gives.

A grain layer that never moves is a texture; one that slides is a moving
texture, and neither reads as film. Jog it instead — animate `transform` on the
grain element with `steps()`, so the tile re-seats in discrete jumps a few
per cent wide and the noise appears to be re-exposed rather than to travel.
Oversize the layer past its container on every side or each jump exposes an
edge. 8–12 steps over 6–10s, offsets 1–3%.
```css
.grain::before { position: absolute; inset: -50%;     /* > the largest offset */
  animation: jog 8s steps(10, end) infinite }
@keyframes jog { 0%, to { transform: translate(0) } 30% { transform: translate(1%, -1%) }
                 70% { transform: translate(3%, 1%) } }
```
⚠ It animates a compositor layer the size of the container plus 200%, which on
a full-bleed section is the most expensive form of a cheap effect. Honour
`prefers-reduced-motion` by dropping to `animation: none`, not by hiding the
grain — the texture is not the motion.
