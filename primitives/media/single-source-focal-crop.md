---
id: single-source-focal-crop
category: media
tags: [media,responsive,performance,detail]
axes: none
cost: 1
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
One photograph can hold a headline at every width without a second crop. Keep
the file and change what is in frame: `object-position` moves the focal point,
and `transform: scale()` against a chosen origin decides how much of the subject
is cut. A composition whose quiet region sits left on a wide screen wants that
region pulled toward 60–70% and the frame tightened 8–15% at the narrow end. One
decode, one cache entry, no `<picture>` fork.

```css
.shot { object-fit: cover; object-position: 65% center;
        transform: scale(1.12); transform-origin: top }
@media (min-width: 40rem) { .shot { object-position: center; transform: none } }
```
⚠ Whatever the alt text names must survive the tightest frame.

Across a *set* — portraits in a row, cards in a grid — the crop is one rule and
the focal point is per item, so publish the two numbers as custom properties on
each instance and let the stylesheet stay single. Faces sit at different heights
in different photographs, and a shared `object-position` centre either decapitates
someone or strands them in the frame. Zoom 1–1.4, origin as a percentage pair.
```css
.avatar { object-fit: cover; width:100%; height:100%;
          transform: scale(var(--pz, 1)); transform-origin: var(--pf, 50% 50%) }
```
```html
<img class="avatar" style="--pz:1.25;--pf:58% 32%" alt="…">
```
⚠ Scaling inside a fixed box crops without changing layout, but the element must
clip — put `overflow: hidden` on the wrapper or the image spills over its
neighbours.

The same economy runs across *sections*, not only widths. Give a second
full-bleed band the same file mirrored — `scaleX(-1)` on the layer, never on
anything holding type — and it reads as a second photograph, because the eye
scores a composition and a flipped one is a different composition. Vary one
more term with it, a wash from the opposite edge or 8–15% of scale, so the two
differ by more than handedness. One decode, one cache entry, one visual source.
```css
.band-b { background: var(--ground-shot) center / cover; transform: scaleX(-1) }
```
⚠ Only for non-representational material — grain, bokeh, gradient photography,
texture. A mirrored face, hand, letterform or known object reads as a mistake
before it reads as a variation.

Key the focal point on `orientation` rather than width where the frame is the
whole screen. A rotated phone and a short laptop window are the same *shape*
problem and different width problems, so a `min-width` split holds the subject on
one and loses it on the other. One property, two declarations, and the fallback
inside `var()` means an instance that never sets it is still centred rather than
unset.
```css
.cover { object-position: var(--focal-portrait, 50% 50%) }
@media (orientation: landscape) { .cover { object-position: var(--focal-land, 50% 50%) } }
```
⚠ Orientation flips at exactly square, so a resized desktop window can cross it
with no layout change to explain the jump — pair it with a width clause where
both matter, and keep the two focal points within ~20% of each other so the
crossing reads as a settle rather than a cut.

Below the width where the subject stops being legible, stop fitting the frame at
all. Let the element exceed its column and hang off both edges — width
`100% + 2n`, inline start `-n` — so the centre of the composition holds its
apparent size and the periphery is what gets sacrificed. Overshoot 15–40% at a
phone width, released entirely above the breakpoint.
```css
@media (width <= 620px) { .wide { width: 128%; max-width: none; margin-inline-start: -14% } }
```
⚠ The two numbers are one number; any drift and the composition sits off-centre.
Unlike `transform: scale()` this changes the element's box, so an ancestor must
carry `overflow-x: clip` or the page gains a horizontal scrollbar.

The same clip-and-scale trims an asset rather than reframing one. A supplied mark
whose file bakes in its own padding renders optically small beside type set to
the same height, and re-exporting it is often not yours to do: give the slot the
size the *ink* should be, clip it, and scale the image by the padding ratio.
Scale 1.05–1.25 covers most exported marks.
```css
.brand     { inline-size: 106px; block-size: 52px; overflow: clip }
.brand img { inline-size: 100%; block-size: auto; transform: scale(1.16) }
```
⚠ Symmetric padding only — an off-centre viewBox needs a `translate` beside the
scale. Keep the honest intrinsic `width`/`height` on the `<img>` so the slot
still reserves its space before decode.

Push the zoom past about 2× and the crop stops framing the subject and becomes
atmosphere. A detail of an existing shot magnified 2–3× goes soft from
interpolation, and under an off-centre ellipse mask that softness reads as depth
of field — a hero ground built from a file the page already ships. Pair it with
a ramp from the copy side so nothing sharp is expected of it.
```css
.ground img { transform: scale(2.4) translate(14%, -6%);
  mask-image: radial-gradient(ellipse 55% 70% at 70% 50%, #000 5%, #0000 95%) }
```
⚠ Only for grounds nobody is meant to identify — the alt text becomes empty, and
a recognisable face or label magnified soft reads as a broken asset.
