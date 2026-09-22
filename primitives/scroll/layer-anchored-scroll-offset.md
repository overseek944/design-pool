---
id: layer-anchored-scroll-offset
category: scroll
tags: [scroll,parallax,custom-properties,reduced-motion,correctness,performance]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
One document-level scroll value can drive every parallax layer on a page, but
only if each layer carries the position at which it should sit unshifted.
Compute `(scroll − anchor) × rate` and a layer deep in the document opens at
rest rather than thousands of rates away from it; the rate stays a pure speed.
Measure the anchor once at layout. Rate 0.02–0.12, in whole pixels.

```css
.layer { transform: translateY(calc(
  (var(--scroll-y, 0) - var(--anchor, var(--scroll-y, 0))) * var(--rate) * -1px)) }
```
⚠ Default the anchor to the live value, as above, so a layer the script never
reached renders unshifted rather than flung. Writing `0` to the shared value
under `prefers-reduced-motion` stills every consumer at once.

Range — a layer spanning the whole document integrates its rate over the
document rather than the viewport, so the band that reads as depth there is an
order below the one above: 0.002–0.01, a few pixels of total travel across ten
thousand. At 0.02–0.12 the same layer becomes a decal sliding over the page.
Rank the bands by document position and ramp drawn weight with the same index —
nearer bands heavier *and* faster — or the differential rate reads as a
registration error instead of as depth.
```css
.band { --rate: calc(.002 + var(--i) * .0008);
        stroke-width: calc(1.6px + var(--i) * .2px) }
```
⚠ At these amplitudes the whole effect is sub-pixel, so the whole-pixel rounding
that keeps the fast band crisp erases the slow one completely. Round per layer,
by rate, not once for the page.
