---
id: comb-ruled-section-seam
category: surface
tags: [divider,section,texture,rule,repeating-gradient,seam]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: [interleaved-ground-dissolve, join-straddling-blur-band]
---
Where two full-bleed grounds meet, a hairline rule is lost in the tonal jump
and a dissolve denies there is a join at all. Draw the seam as a comb instead —
a shallow band of vertical ticks at a fixed pitch, in the ink of the section it
belongs to — and the boundary is declared rather than hidden: a field of marks
stays legible at an alpha no single line survives, and the pitch states a
horizontal unit the page otherwise never shows. Give each side its own band and
the comb changes ink exactly on the line. Band 28–48px, pitch 10–14px, tick
1px at alpha 0.08–0.20.

```css
.seam { block-size: 36px; --pitch: 12px;
  background: repeating-linear-gradient(90deg,
    var(--ink) 0 1px, #0000 1px var(--pitch)) }
```
⚠ Decorative only — `aria-hidden`, and never the sole boundary between two
interactive regions. At fractional device pixel ratios the pitch beats against
the pixel grid into wide bands; check 1.25× and 1.5×.
