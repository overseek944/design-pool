---
id: aperture-registered-content-layer
category: media
tags: [media, mockup, responsive, layout, correctness]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---

Live content shown inside supplied frame artwork registers to an aperture the
*image* defines, not to the frame's box. Measure the opening once and
spend it as four asymmetric percentages; it then holds at every size.
Make the frame an inline-size container so the interior radius is `cqw` and
tracks the artwork's corner. Openings are rarely symmetric: 2–3% on the
short axis, 5–7% on the long.

```css
.frame  { container-type: inline-size; position: relative }
.screen { position: absolute; inset: 2.5% 5.85% 2.5% 5.75%;
          border-radius: 6.5cqw; overflow: hidden }
```
⚠ Percentages resolve against the frame's own box, so the artwork must fill it
exactly: a row of transparent margin in the export throws the registration off
at every size.

When the base is a screenshot rather than frame artwork, percentages are the
wrong unit to register in: the coordinates you have are the capture's own
pixels, and converting each to a fraction of the box is arithmetic that must
be redone whenever the crop changes. Publish a unit instead — `--px:
calc(100cqw / <captureWidth>)` — and place every live region at `calc(N *
var(--px))` read straight off the source. Overlay only what has to stay sharp
or move; the rest of the chrome stays a photograph, which is cheaper than
rebuilding it and correct by definition.
```css
.shell { container-type: inline-size; aspect-ratio: 1922 / 1320 }
.pane  { position: absolute; inset-block-start: calc(54 * var(--px));
         inset-inline-start: calc(1436 * var(--px)); inline-size: calc(486 * var(--px)) }
```
⚠ The capture must carry its true pixel `width`/`height` and fill the shell
exactly, or every coordinate is off by the same unmeasured margin. Anything the
overlay says the photograph also says — repaint the base, never contradict it.

Both units above assume the base *fits* its box. A base under `object-fit: cover`
or `background-size: cover` is cropped instead, and the crop changes at every
width — so percentages and a `--px` unit alike drift off the artwork the moment
the aspect ratio moves. Match the crop rather than measuring it: author the
overlay as an SVG at the source's own pixel coordinates with
`preserveAspectRatio="xMidYMid slice"`, which is the identical crop maths. Traced
lines, hotspots and callouts then stay welded to the picture at every viewport
with nothing to recompute.
```html
<svg viewBox="0 0 5056 3392" preserveAspectRatio="xMidYMid slice"
     class="overlay" aria-hidden="true"><line x1="1204" y1="880" …/></svg>
```
⚠ `slice` matches `cover` and `meet` matches `contain` — base and overlay must
name the same one, and the SVG's alignment keyword has to match `object-position`
too, or the registration is off by the whole crop offset.

An SVG overlay needs no unit at all: give it a `viewBox` equal to the raster's
intrinsic pixel dimensions and stretch both to the same box. Every annotation is
then authored in the source image's own coordinates — the numbers that come out
of whatever drew it — and there is no percentage, no published unit and no
conversion step to redo when the art is re-exported at another size. The two
layers scale together because they share one user space.
```html
<img src="plate.svg" width="900" height="900">
<svg viewBox="0 0 900 900" style="position:absolute; inset:0"> … </svg>
```
⚠ Both layers must use the same fit. A raster with `object-fit: cover` and an
overlay with the default `preserveAspectRatio` drift apart the moment the box
stops matching the intrinsic ratio.

The interior radius needs no container query either: a two-value percentage
radius — `6.5% / 3.1%` — resolves each axis against that axis of the box, so an
aperture inset in percentages and rounded in percentages tracks the artwork's
corner through every width with nothing declared on the parent. It is the only
form that works where the frame cannot be a container, and it composes with a
transform where `cqw` does not.
```css
.screen { position: absolute; inset: 13.35% 21.49% 10.08% 21.48%;
          border-radius: 6.5% / 3.1%; overflow: hidden }
```
⚠ The two figures are not interchangeable — a single percentage is read against
the *width* for both axes, so it re-rounds into an obvious ellipse on anything
that is not square. Measure both from the artwork.

An aperture cut from one image can only sit *behind* the content, so every
highlight the hardware throws across the screen's own edge is lost. Export the
frame as two plates instead — everything behind the opening, and the near lip
that overlaps it — and sandwich the live layer between them on z-index. The
bezel's inner specular edge, a rounded corner and any foreground part then paint
over real DOM with no alpha cut-out to register and no soft matte at the
boundary. The near plate must be `pointer-events: none` over the interactive
region.
```css
.rig { display: grid; place-items: stretch }
.rig > * { grid-area: 1/1 }
.back { z-index: 0 } .screen { z-index: 1 } .near { z-index: 2; pointer-events: none }
```
⚠ Both plates must share one intrinsic size and one fit or the seam separates at
some width — ship them as a single export split in half, never as two crops.
Dark themes usually want the metal dimmed rather than re-exported: a brightness
filter on both plates at once keeps them matched.
