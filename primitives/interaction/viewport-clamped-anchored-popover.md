---
id: viewport-clamped-anchored-popover
category: interaction
tags: [correctness,responsive,overlay,accessibility,hover,focus]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A popover sized against its trigger gets clipped by the window: an 18rem panel
on an edge chip overflows the document or opens a horizontal scrollbar.
Clamp it against the viewport, and align it to the trigger's near edge at
narrow widths, centring where there is room. The arrow moves separately —
it tracks the trigger, the panel tracks the viewport.

```css
.tip { max-inline-size: min(18rem, calc(100vw - 1.5rem)); inset-inline-start: 0 }
.tip::after { inset-inline-start: 1.25rem }        /* arrow keeps the trigger */
@media (width >= 80rem) { .tip { inset-inline-start: 50%; translate: -50% } }
```
⚠ Nesting the panel inside its `<button>` folds the description into the
button's accessible name. Keep it a sibling, named by `aria-describedby`.

The same clamp applies one level down — a label floating inside a drawing rather
than inside the window — and there it has to be computed in the drawing's own
units, because the element is one SVG and CSS has no view of where the label
landed in it. Place the readout on the leading side of its subject by default and
flip it within a margin of the edge: to the left near the right boundary, below
instead of above near the top. Two comparisons, no measurement.
```js
x = px > W - 112 ? px - 112 : px + 12      // flips left near the right edge
y = py < 32    ? py + 24  : py - 12        // drops below near the top
```
⚠ Flipping on the pointer's position rather than the label's measured box only
holds while the text has a known maximum length. A formatted coordinate pair
does; a translated string does not.

Clamping against a *track* rather than the window is where the coordinate
spaces bite. Measure the anchor and the track, clamp the label to
`[0, trackWidth − labelWidth]` — then add the offset between the track and the
box the label is actually positioned against, because `position: absolute`
resolves to the nearest positioned ancestor and that is rarely the element that
was measured.
```js
const l = Math.min(Math.max(0, cx - w / 2), Math.max(0, track.width - w))
tip.style.left = `${l + (track.left - tip.offsetParent.getBoundingClientRect().left)}px`
```
⚠ Measuring the label in the same frame its text is written is a forced reflow
per pointer move. Write, measure once, and hold the width while the text is
unchanged.

Below a breakpoint the better answer is to stop anchoring. Drop the trigger's
own `position: relative` and the panel has no containing block to be clamped
against — pin it as a fixed sheet inset from both edges under the chrome, where
it gets the full measure instead of a clamped fraction of a chip's width. One
property on the trigger switches the whole model.
```css
@media (width <= 45rem) {
  .trigger { position: static }
  .panel   { position: fixed; inset: 4rem 1rem auto; max-inline-size: none; width: auto }
}
```
⚠ A fixed panel no longer moves with its trigger — it must close on scroll, or
it hangs over the page pointing at a word that has left the viewport.
