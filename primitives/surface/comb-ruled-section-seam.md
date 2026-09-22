---
id: comb-ruled-section-seam
category: surface
tags: [divider,section,texture,rule,repeating-gradient,seam]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 2
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

The band can be made of colour instead of pitch. Split it into n equal flat
segments, one per hue in the page's register, and the seam declares the palette
as a physical edge — there is no tick pitch to beat against the pixel grid at
fractional ratios, and it survives being thickened, where a comb only gets
louder. Band 4–8px; three to five segments, which is the register's size, not a
chosen number.
```css
.seam { display: flex; block-size: 6px }
.seam > * { flex: 1 }        /* one per register colour, in ramp order */
```
⚠ Past five segments it stops reading as a palette and starts reading as a
progress bar or a flag. Order them along the register's own ramp, dark to
light, or the band reads as a chart with a missing key.
