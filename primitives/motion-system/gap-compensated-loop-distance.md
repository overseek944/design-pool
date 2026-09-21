---
id: gap-compensated-loop-distance
category: motion-system
tags: [motion,marquee,correctness,loop,overflow]
axes: none
cost: 1
seen: 14
requires: []
conflicts: []
completes: []
tension: []
---
A duplicated track loops seamlessly only when it travels exactly one repeat.
`translateX(-50%)` is that distance only if the halves tile edge to edge — but
a flex `gap` puts a separator *between* the halves as well as inside them, so
the track runs one gap longer than twice its content and 50% lands short by
half a gap. The seam shows as a stutter once per cycle. Subtract it, or drop
`gap` and carry spacing as trailing margin so no separator exists to miscount.
```css
.track { display: flex; gap: var(--g, 14px); width: max-content;
  animation: run 52s linear infinite }            /* 30–90s */
@keyframes run { to { transform: translateX(calc(-50% - var(--g) / 2)) } }
```
⚠ The error is small and periodic, so it reads as jank rather than as a bug —
outline the two halves in contrasting colours before trusting the eye.

Where the track is artwork rather than text, measure it in the artwork's own
units and the miscount cannot happen. Publish one unit as `viewport / drawing
width`, then express the plate, the gap and the travel as multiples of it: the
keyframe translates exactly plate + gap by construction, and the whole strip
keeps its internal proportions at every viewport instead of being re-tuned per
breakpoint.
```css
.track { --u: calc(228vw / 628); --plate: calc(var(--u) * 500.77);
         --gap: calc(var(--u) * 25.36); gap: var(--gap) }
@keyframes run { to { transform: translate3d(calc(-1 * (var(--plate) + var(--gap))), 0, 0) } }
```
⚠ The multiplier is the source drawing's geometry — re-export the asset and
every number is wrong. Keep them next to a comment naming the drawing width.

Where the track is built in script, the period does not have to be reasoned
about at all — measure it. Repeat the content N times, then read the offset of
the *first child of the second copy* minus the first child of the first: that
distance is one repeat by construction, whatever the gap, whatever each item's
width. Wrap a phase by it with a modulo and no seam can exist. Re-measure on a
`ResizeObserver` and on every image `load`, which is when the number changes.
```js
const period = vertical ? kids[n].offsetTop  - kids[0].offsetTop
                        : kids[n].offsetLeft - kids[0].offsetLeft
track.style.transform = `translateX(${-gap - ((phase % period) + period) % period}px)`
```
⚠ Reading an offset before the webfont resolves measures the fallback's
advance widths. Double-modulo, or a negative phase wraps to a negative offset.

How many copies is the other measured question, and two is right only when the
content is already wider than its container. Below that the track runs out and
a gap opens at the trailing edge once per cycle. Derive the count from the same
two widths the period came from — `ceil(container / content)` to fill it, plus
two so the seam stays offscreen while one copy translates out — and re-derive it
in the `ResizeObserver` that already runs.
```js
const n = content > 0 ? Math.max(3, Math.ceil(container / content) + 2) : 1
```
⚠ Only the first copy is real content; mark the rest `aria-hidden`. The count
rises as the content shortens, so a one-word track on a wide viewport clones far
more than a full sentence does — cap it if each copy is expensive.
