---
id: gap-compensated-loop-distance
category: motion-system
tags: [motion,marquee,correctness,loop,overflow]
axes: none
cost: 1
seen: 26
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

The count above assumes the track should run at all. Measure first: sum the
children's widths plus `columnGap` × (n − 1) read from the computed style and
compare against the port's `clientWidth` with 1–2px of tolerance. Where it fits,
ship no loop — centre the row, drop the `aria-hidden` copy, release the
single-line width and remove the edge mask, which is otherwise promising motion
that never arrives. One class carries all four. Re-measure on the
`ResizeObserver` already running, on every image `load` and `error`, and on
`document.fonts.ready`.
```js
const ws = [...track.children].map(c => c.getBoundingClientRect().width)
if (ws.some(x => x === 0)) return            // nothing has loaded — do not decide yet
const gap = parseFloat(getComputedStyle(track).columnGap) || 0
run(ws.reduce((a, b) => a + b, 0) + gap * (ws.length - 1) > port.clientWidth + 1)
```
⚠ The zero-width bail is the whole guard: an image with no intrinsic size
measures 0, the sum lands under the container, and the track is decided *static*
at precisely the moment it has no content to measure.

Marking the copies `aria-hidden` is half the fix. It removes them from the
accessibility tree and leaves every link and button inside them in the tab
order — a focusable node under `aria-hidden` is the one ARIA rule the platform
actively flags, and a keyboard reader landing there is on content sliding out
from under them. `inert` covers focus, hit-testing and the tree in one
property. Managing `tabindex` by hand instead only works if the original value
is stashed first, since a count re-derived on resize can promote a copy back to
real content.
```js
for (const c of copies) c.inert = true          // not aria-hidden alone
```
⚠ `inert` on an ancestor of the focused element drops focus to the body. Apply
it when the copy is built, not from the `ResizeObserver` — that fires mid-read.

Two lanes running opposite ways cost one declaration, not a second keyframe set
— and it is the duplicate that makes it free. `animation-direction: reverse`
plays the same track backward, and because every multiple of one repeat is the
same composition, the reversed lane needs no corrected start pose: paused at
time zero it displays the `to` frame, which is indistinguishable from the `from`
frame on a track that tiles. Stagger the lanes' durations 10–25% apart as well,
or the pair reads as one hinged object rather than as two.
```css
.lane--back { animation-direction: reverse; animation-duration: 36s }   /* vs 30s */
```
⚠ Only on a seamless duplicated track. A reel that does not tile — a list
translated by a measured pitch — parks at its end pose under the same
declaration, so reversing it needs the static transform authored to match.
