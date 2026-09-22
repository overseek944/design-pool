---
id: sequence-value-ramp
category: color
tags: [color,hierarchy,surface,sequence,contrast]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
Tint a row of peer surfaces along one lightness ramp so sequence position is
carried by ground, not by a number. Three equal panels read as interchangeable
options; the same three on a descending ramp read as a progression with a
destination. Derive every step from one mix so the ramp cannot drift.

```css
.step { --i: 0; background: color-mix(in oklab,
        var(--ink) calc(var(--i) * 8%), var(--paper)) }
```
⚠ Travel is bounded by the ink on it: 6–14% per step across 3–5 steps. Once the
darkest drops under 4.5:1 the ink must flip, and the flip shows as a seam
mid-row. Back-load the ramp when the last item is an arrival, not an end.

The rule inverts where the set has no order. Peer options, quotes, unrelated
categories — a lightness ramp asserts a progression the reader then looks for
and cannot find. Rotate a small closed set of tints at *equal* lightness
instead: hue carries variety, value carries nothing, and one ink passes on all
of them. Three to five tints, cycled by index, held within about 4% lightness of
each other so no member reads as first or last.
```css
.card { background: var(--tint-a) } .card:nth-child(3n+2) { background: var(--tint-b) }
```
⚠ Equal lightness by eye is not equal lightness — mix each tint into the same
`oklch` L or the row develops an accidental ranking in greyscale and in print.

Where the ramp carries a *quantity* rather than a position, two things change.
A member with no value must leave the ramp entirely — matched lightness, near
zero chroma — or it is read as a low reading. And the figure belongs inside the
shape: five to seven steps support ranking and never support reading a value
off them, so the ramp is a sorting aid laid over a table, which is the job it
is actually good at.
```css
.area          { fill: color-mix(in oklch, var(--hi) calc(var(--t) * 100%), var(--lo)) }
.area.no-data  { fill: oklch(from var(--lo) l .01 h) }
```

At page scale the same equal-lightness rotation keys *chapters*: each band a
plate in its own tint, every other variable — radius, padding, the card
treatment sitting on it — held identical, so the hue reads as an index rather
than as a different design. What binds them is a shared texture recipe, one
hairline hatch at a fixed angle and pitch, drawn in a deeper cut of the band's
own tint on a `pointer-events: none` layer above the wash. Hatch 1px on 6–10px.
```css
.band { background: var(--tint); position: relative }
.band::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(45deg,
    color-mix(in oklch, var(--tint), black 8%) 0 1px, #0000 1px 8px) }
```
⚠ One stroke width is not one strength: the same 1px hairline is a whisper on a
yellow band and a stripe on a blue one. Derive the hatch from each tint by mix
amount and check the bands side by side — the tell is one band where somebody
thickened the stroke to 2px to compensate.

Equal lightness lets one ink serve every band only while the bands stay pale.
Push the tints to full chroma — a band a reader would name as yellow or pink
rather than as tinted — and a single neutral ink reads as signage on all of
them. Ship an ink per tint instead, chromatic rather than black: very dark, but
with chroma held above roughly 0.05 in `oklch`, and hand-picked per hue because
no one mix direction flatters the whole set. The band then reads as ink on
coloured stock. Ink L 0.17–0.43 under paper L 0.85–0.96.
```css
.band--citrus { --tint: #f7f055; --ink: #3d2410 }   /* 12:1 */
.band--rose   { --tint: #ffb3f2; --ink: #8c0a2e }   /* 5.9:1 */
```
⚠ Hand-picked means unverified: score every pair. A chromatic ink also loses
contrast against the band's own darker shades, so borders, chart marks and
disabled text on that band need checking separately from the body copy.
