---
id: aperture-registered-content-layer
category: media
tags: [media, mockup, responsive, layout, correctness]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 3
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
