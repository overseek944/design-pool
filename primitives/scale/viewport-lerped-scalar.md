---
id: viewport-lerped-scalar
category: scale
tags: [scale,responsive,custom-properties,calc,tokens,correctness]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
`clamp()` interpolates a *length* and stops there: a number, a ratio, an
opacity or a `color-mix()` percentage cannot be written that
way. Dividing one length by another yields a number, so one root token can
carry a unitless 0→1 position across a width band and each consumer lerps its
own endpoints against it. Declared once; no media query downstream. Band
400–700px.

```css
:root  { --t: clamp(0, calc((100vw - 760px) / 480px), 1) }
.shape { --in: calc(var(--peek) + (var(--edge) - var(--peek)) * var(--t)) }
.veil  { opacity: calc(.15 + .5 * var(--t)) }
```
⚠ All three `clamp()` arguments must be unitless — one stray `px` invalidates
the declaration and every consumer silently falls back to its initial value.

Swap the viewport term for a container query unit and the same token lerps
against the box it lives in, which is where a reflowing grid needs it: a card
whose column count changes has no viewport breakpoint worth keying on, but its
own width moves every time the grid does. An `aspect-ratio` interpolated across
that band lets a tile run wide while it is large and squarer once the grid
doubles up — the proportion tracks the layout with no script and no measured
write-back. Ratio endpoints 1.4–2.2 across a 180–400px band.
```css
.card    { container-type: inline-size }
.card > * { --t: clamp(0, calc((100cqw - 180px) / 220px), 1);
            aspect-ratio: calc(1.45 + .72 * var(--t)) }
```
⚠ An element cannot query its own container — `container-type` goes on the
parent and the `cqw` read on the child, or the value silently resolves against
the next container up and the ratio tracks the wrong box.

A length divided by a length is not a valid `calc()` product — the divisor has to
resolve to a number — so on real engines the quotient has to come out of
trigonometry. `atan2()` takes two lengths and returns an angle; `tan()` turns
that angle straight back into their ratio, giving a true unitless scalar that
`clamp()` on the numerator still bounds to one band. Sum two of them against
different origins and the response goes piecewise: one slope up to a knee, a
gentler one past it — which is what a decoration that must keep growing on an
ultrawide display needs without running away. Second slope 0.15–0.35 of the
first.
```css
:root { --t: tan(atan2(clamp(0px, 100vw - 760px, 480px), 480px)) }   /* 0→1, 760–1240px */
.deco { scale: calc(.8 + .2 * var(--t)
              + .5 * tan(atan2(clamp(0px, 100vw - 1440px, 1120px), 1120px))) }
```
⚠ An engine without CSS trig drops the whole declaration, so author a stepped
approximation *first* — a short ladder of media queries writing the same custom
property — and let source order pick the better one. Six or seven steps across
the band are not distinguishable from the curve.
