---
id: drained-field-clear-window
category: surface
tags: [surface,mask,backdrop-filter,focus,attention,de-emphasis]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 3
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
Direct attention by de-emphasising everything else: a full-bleed overlay whose
`backdrop-filter` drains colour and sharpness, with a soft-edged hole punched in
its own mask so one region stays untouched. Desaturation reads as "not now" far
more reliably than blur alone and costs no legibility inside the window. Move the
hole and attention moves with it — the content underneath is never altered.
Blur 1.5–4px, hole radius 60–120px, feather over 2–5% of the stop pair.
```css
.wash { position: absolute; inset: 0; backdrop-filter: grayscale(1) saturate(0) blur(3px);
  mask-image: linear-gradient(#000 0 0), radial-gradient(circle var(--r,76px) at var(--x) var(--y), #000 61%, transparent 63%);
  mask-composite: exclude }
```
⚠ Ship the `-webkit-mask-*` pair or Safari fills the hole. A backdrop filter over
a large area is real compositor cost — one such layer per view, not per card.

Invert the polarity and the window stops hiding and starts revealing: mask a
*second* rendering of the same subject to the hole instead of punching a hole in
a wash. Registered on the original at the same size, it reads as a lens — the
thing is still there, shown another way — where the drained version reads as an
instruction about where to look. What sits under the lens can be anything the
subject can also be: a wireframe, a heat map, an uncorrected exposure. Radius
6–14rem, feather over the last 25–35% of the circle.
```css
.lens { position: absolute; inset: 0; pointer-events: none;
  mask-image: radial-gradient(circle var(--r,10rem) at var(--x) var(--y), #000 0 72%, transparent) }
```
⚠ Both layers must share one coordinate space or the lens shows a subject offset
from itself. Gate on `(hover: hover) and (pointer: fine)` — a window that only
exists where a pointer is has no touch equivalent worth shipping.

The window need not follow a pointer, and the second rendering need not be a
filtered one. Snap it to named regions of the subject — one control per region,
the plate animating between their rects — and the mechanism survives touch and
the keyboard, because the selection is a button rather than a position. Then let
the two renderings differ in *ground* instead: pale artwork over the page tint is
nearly absent, the same artwork over an inverted plate is high-contrast, so
moving the plate moves legibility with no mask and no filter. Travel 0.35–0.6s.
```css
.plate { position: absolute; inset-inline: 0; background: var(--ink);
  top: var(--region-y); height: var(--region-h); transition: top .45s, height .45s }
```
⚠ The regions are the control's states — name them in the button, not only in
the picture. Hold the artwork's box fixed or plate and drawing desynchronise on resize.

Where the subject scrolls, the lens cannot be a mask over a duplicate — the
second rendering has to travel too, and in the same frame of reference. Give the
aperture `overflow: hidden` and its child the whole stage's dimensions offset by
the negative of the aperture's own inset: the child is then in stage
coordinates while the parent clips, and one shared translate drives both copies.
The aperture may move and resize freely; nothing inside it has to know.
```css
.window { position: absolute; left: var(--win-x); top: var(--win-y);
  width: var(--win-w); height: var(--win-h); overflow: hidden }
.window > .inner { position: absolute; width: var(--stage-w); height: var(--stage-h);
  left: calc(-1 * var(--win-x)); top: calc(-1 * var(--win-y));
  transform: translateY(var(--scroll-y)) }
```
⚠ Both copies must be driven from one value in one write — split across two
frame callbacks, the inside lags the outside and the lens reads as sliding on
the subject.

Pointer-driven, the lens wants a plateau rather than a cone: fully opaque out to
35–45% of the radius, then a three- or four-stop ramp to zero at 200–280px, so
the second rendering reads as a solid patch with a soft rim instead of a vignette.
Write the mask as a CSS radial gradient on custom properties — rasterising it to
a data URL on every pointer move encodes an image per frame.
