---
id: trailing-mask-sweep
category: reveal
tags: [reveal,mask,scan,grid,sweep,technical]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 2
seen: 4
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
