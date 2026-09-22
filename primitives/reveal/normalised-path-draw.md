---
id: normalised-path-draw
category: reveal
tags: [svg,stroke,reveal,draw,geometry,correctness]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 26
requires: []
conflicts: []
completes: []
tension: []
---
A draw-on stroke normally needs the path's measured length, which breaks the
moment the geometry is edited or the viewBox changes. Declare `pathLength="1"`
and the dash system becomes unitless: dasharray 1, dashoffset 1 → 0 is always
exactly one full draw. Paths of wildly different lengths then complete together
instead of at speeds proportional to their size. Draws of 0.4–1.2s read as
deliberate; under 0.25s it is a flicker.
```html
<circle pathLength="1" style="stroke-dasharray:1; stroke-dashoffset:1;
  animation: draw .8s cubic-bezier(.4,0,.2,1) forwards" />
```
⚠ Equal timing is a choice, not always the right one — a long connector drawing
as fast as a short one reads as unphysical. Rings need `transform: rotate(-90deg)`
with a 50% origin to start at twelve o'clock.

Author the *drawn* state as the resting rule and let only the pending state be
applied by script. `dasharray: 1; dashoffset: 0` in the base means a diagram
whose JS never ran, or whose observer never fired, is simply finished; the
undrawn frame exists solely under an attribute that nothing but the animator
sets. The usual arrangement — `dashoffset: 1` in the base, cleared on reveal —
fails to a blank drawing.
```css
.path { stroke-dasharray: 1; stroke-dashoffset: 0; transition: stroke-dashoffset 1.1s }
[data-draw=pending] .path { stroke-dashoffset: 1 }
```
⚠ Script must add `pending` before the paint that shows the figure, or the
drawing flashes complete and redraws itself.

Normalise to 100 rather than 1 and the same attribute buys the opposite trade.
A dash written in those units is a *percentage of its own path*, so converting a
fixed on-screen length into it keeps a travelling pulse the same visible size on
a 5000-unit grid line and a 400-unit strut, and taking duration from the real
measured length gives every pulse one speed instead of one duration. Pulses
4–38% of the path; gap wider than 100 so the pattern cannot wrap a second dash
back onto the start as the first leaves.
```js
const dash = Math.min(38, pulsePx / len * 100)
el.style.strokeDasharray = `${dash} 200`
el.animate([{ strokeDashoffset: dash }, { strokeDashoffset: -100 }],
  { duration: len / speed * 1000, easing: 'linear', fill: 'none' })
```
⚠ Under `fill: 'none'` the element renders at its *inline* value for one frame
after finishing — park `strokeDashoffset` at the animation's end value first or
every pulse ends in a flash.

Normalising the geometry and equalising the *timing* are separate decisions, and
the first does not force the second. Keep `pathLength` so one stylesheet rule
covers every path, then carry duration as an inline custom property per element:
a long connector takes 0.6s and a short stub 0.4s, chosen by eye rather than
measured, and the unphysical equal-speed reading goes without reintroducing a
measurement pass or a rule per path. Durations within about 2:1 of each other —
wider and the fast ones read as a different event.
```html
<path class="draw" pathLength="100" style="--dur:.55s" d="…"/>
```
```css
.draw { stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw var(--dur) ease both }
```
⚠ Declare a fallback in the `var()`. A path that ships without the inline style
gets an invalid `animation` shorthand, which drops `both` too — so it holds its
undrawn frame permanently rather than merely losing its timing.

Let the offset run past zero and the same one block gives a loop with no reset
frame: `+L` hidden, `0` complete, `−L` hidden again, so the mark writes itself
in from the head and is erased from the tail rather than blinking out. Hold the
drawn state as a pair of equal stops across the middle 50–70% of the cycle —
the drawing is the point, the travel is punctuation.
```css
@keyframes draw { 0%,12% { stroke-dashoffset: 100 }
                  28%,88% { stroke-dashoffset: 0 } to { stroke-dashoffset: -100 } }
```
⚠ Needs `stroke-dasharray` at the full normalised length, not `L L` — a gap
shorter than the path lets a second dash wrap in behind the first as it leaves.

The drawn path need not be the thing seen. Give it a stroke wide enough to
cover the artwork, use it as a `mask` rather than as ink, and the dash sweep
uncovers whatever is underneath — script lettering, a filled mark, a grained
fill — along a spine the artist chose instead of along a straight wipe. One
centreline replaces a hand-cut mask sequence, and the reveal follows the
gesture of the form, which is what makes handwriting read as written.
```html
<mask id="m"><path pathLength="1" stroke="#fff" stroke-width="118" fill="none"
  stroke-linecap="round" style="stroke-dasharray:1;stroke-dashoffset:1" d="…"/></mask>
<g mask="url(#m)"><!-- the artwork --></g>
```
⚠ Stroke width is a covering guarantee: anything the centreline passes further
from than half that width is never revealed. `round` caps on both ends, or the
first and last strokes arrive with a square bite out of them.
