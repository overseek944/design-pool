---
id: sequence-value-ramp
category: color
tags: [color,hierarchy,surface,sequence,contrast]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 3
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
