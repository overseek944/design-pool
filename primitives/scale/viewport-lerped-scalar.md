---
id: viewport-lerped-scalar
category: scale
tags: [scale,responsive,custom-properties,calc,tokens,correctness]
axes: none
cost: 1
seen: 3
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
