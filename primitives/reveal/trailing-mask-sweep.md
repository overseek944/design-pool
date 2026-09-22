---
id: trailing-mask-sweep
category: reveal
tags: [reveal,mask,scan,grid,sweep,technical]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 2
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
Reveal a field — a measurement grid, a texture, a dot matrix — by animating
`mask-position` across it rather than fading it in. Build the mask as a gradient
with a soft ramp so the field arrives behind a leading edge and holds, which
reads as instrumentation rather than decoration. One custom property sets the
tail length, so the same rule serves both axes by swapping the gradient angle.
Trail 80–160px; sweeps of 1.2–2.5s across a full panel.
```css
.grid { --trail: 118px;
  background-image: linear-gradient(#0275c433 1px, transparent 1px);
  background-size: 23px 23px;
  mask-image: linear-gradient(90deg, transparent 12%, #0001 28%, #000 100%) }
@keyframes sweep { from { mask-position: calc(var(--trail) * -1) 0 } to { mask-position: 100% 0 } }
```
⚠ `mask-position` is not compositor-accelerated everywhere — declare
`will-change: mask-position` and keep the swept layer to one element, not a stack.

Size the mask *larger than the box* instead of measuring a trail in pixels:
`mask-size: 100% 220–300%` makes the ramp proportional to the element, and the
whole sweep is then `mask-position: 0 100%` to `0 0` with no `calc` and nothing
to re-tune per breakpoint. The soft edge stays the same fraction of the panel on
a phone and on a wide display, where a fixed 120px trail is most of the first
and a hairline on the second.
```css
.panel { mask-image: linear-gradient(180deg, transparent 0 47%, #000 53% 100%);
  mask-size: 100% 250%; mask-repeat: no-repeat; mask-position: 0 100% }
```
⚠ The gradient's own stops now measure against the oversized mask, not the box —
a "6%" feather is 6% of 250%, so soften it by the same multiple you grew by.

Put opacity on *both* sides of the band and the sweep stops revealing and starts
passing through: a narrow window of visibility travels the element and leaves it
as it was. That is a different statement — a leading edge says *this is arriving*,
a band says *something crossed here*. Band 8–14% of the oversized mask; wider and
the two edges stop reading as one object.
```css
.band { mask-image: linear-gradient(100deg, transparent 0 42%, #000 46% 54%, transparent 58%);
        mask-size: 300% 100%; mask-repeat: no-repeat }
@keyframes pass { from { mask-position: 100% 0 } 32%, to { mask-position: 0 0 } }
```
⚠ The element is invisible outside the band, so this cannot carry content —
only a highlight layer over content that is painted anyway.

Written as a stepped `clip-path: polygon()` instead of a moving mask, the
reveal front becomes a hard corner advancing in two axes at once — a region
being mapped rather than a wipe passing over. Each keyframe is one polygon, so
the front can turn, pause and jump the way a survey does; there is no ramp to
tune. Three to six steps; fewer reads as a slideshow.
```css
@keyframes map { 0% { clip-path: polygon(0 78%,18% 78%,18% 100%,0 100%) }
  50% { clip-path: polygon(0 0,66% 0,66% 100%,0 100%) }
  82% { clip-path: polygon(0 0,100% 0,100% 100%,0 100%) } }
```
⚠ Polygons interpolate only vertex-for-vertex — every stop needs the same
point count in the same order, or the step snaps instead of growing.

The same mechanism runs endlessly rather than once if the mask repeats and the
travel is exactly one tile: a `repeating-linear-gradient` at
`mask-size: 100% <tile>`, animated from `0 0` to `0 <tile>` on `linear`. The
last frame is pixel-identical to the first, so there is no cut to hide and no
duplicated layer. One number sets the band's share of the tile, another the
period; over a texture at `mix-blend-mode: screen` it reads as light moving on a
surface rather than as a reveal. Tile 30–50% of the element, 8–20s.
```css
.glint { mix-blend-mode: screen; --tile: 44%; --band: .55;
  mask-image: repeating-linear-gradient(to bottom, transparent 0,
              #000 calc(var(--band) * 50%), transparent 100%);
  mask-size: 100% var(--tile); animation: drift 14s linear infinite }
@keyframes drift { to { mask-position: 0 var(--tile) } }
```
⚠ It never stops, so it is the first thing to withdraw under
`prefers-reduced-motion` — and by `display: none` on the layer, not
`animation: none`, which leaves a static banded mask painted over the texture.

A band cut into the revealing layer takes the field away as it passes. Put the
band on a second, *brighter* copy of the same generator stacked over the settled
one and the pass turns additive: the base never drops out, and what travels is a
highlight rather than a hole. Give that band several alpha stops rather than two
— faint leading edge, hard core, longer tail — and one pass reads as light
crossing a ruled surface instead of a rectangle sliding over it. Copy at 2–3×
the base alpha, band 10–16% of the oversized mask.
```css
.field::after { content: ""; position: absolute; inset: 0; background-size: inherit;
  background-image: /* same generator, 2-3x alpha */; opacity: 0;
  mask-image: linear-gradient(135deg, #0000 36%, #0003 41%, #0000 44%, #000c 47%,
                              #000 50%, #0004 53%, #0000 58%);
  mask-size: 300% 300%; mask-repeat: no-repeat; animation: pass 3.2s ease-in-out both }
```
⚠ The copy doubles the layer's paint for the length of the pass. Hold it at
`opacity: 0` at both ends of the keyframes so it costs nothing at rest, and keep
it off whatever is already the page's largest paint.
