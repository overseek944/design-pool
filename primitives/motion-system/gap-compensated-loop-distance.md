---
id: gap-compensated-loop-distance
category: motion-system
tags: [motion,marquee,correctness,loop,overflow]
axes: none
cost: 1
seen: 48
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

A *painted* track has the same arithmetic with no children to measure. A
`repeating-linear-gradient` at angle θ repeats every `p` along its own normal,
so the horizontal travel for exactly one period is `p / sin θ` — at 45° with a
20px pitch that is 28.28px, not 20px, and translating by the pitch jumps the
pattern back a fraction of a stripe every cycle. Oversize the layer so the tail
never enters the box.
```css
.stripes { width: 200%; background: repeating-linear-gradient(45deg,
  #ffffff08 0 10px, #ffffff14 10px 20px); animation: slide 1s linear infinite }
@keyframes slide { to { transform: translateX(-28.284px) } }   /* 20 / sin45 */
```
⚠ Write the divisor in the value, not the answer — `calc(20px / 0.7071)` — or
the number is unmaintainable the moment the angle or pitch is retuned. Diagonal
motion past a fixed frame is the loop most likely to be read as a progress bar;
keep it inside something that is plainly indeterminate.

Where the repeat is *multiplicative* rather than linear — concentric rings, a
nested frame, a tunnel — the loop distance is a ratio, not a length. Scale to
exactly the ratio between consecutive rings and ring N lands where ring N+1
began, so the restart is invisible with no crossfade and no second copy. Author
the rings from that ratio outward and the number is structural rather than
tuned; 1.15–1.35 per step, `linear` timing or the seam reappears as a pulse.
```css
:root { --step: 1.2487 }      /* r(n+1) / r(n), the same ratio the rings use */
@keyframes push { to { scale: var(--step) } }
.tunnel { animation: push 6s linear infinite }     /* 5–12s */
```
⚠ Rounding the ratio to two places shows as a jump within a minute of looping —
carry the divisions the ring geometry actually used. Nothing may sit at the
vanishing centre: it scales past the viewer and pops.

A negative delay separates two lanes the other way, and it keeps them at one
speed. Starting the second lane half a cycle in makes the pair phase-offset
rather than rate-offset — right where the lanes carry the same plates and a
duration difference would read as one of them lagging rather than as two
independent tracks. Derive the offset from the duration in the same `calc` and
retuning the speed cannot desynchronise them.
```css
.lane        { animation: run var(--dur, 40s) linear var(--delay, 0s) infinite }
.lane--back  { --delay: calc(-1 * var(--dur) / 2); animation-direction: reverse }
```
⚠ Only a negative delay starts mid-cycle; a positive one holds the first pose
for that long instead. Any offset but half a cycle needs a track that tiles, or
the two lanes park at visibly different poses whenever the animation stops.

Once the period is measured, derive the duration from it too. A fixed
`28s` runs a short track slowly and a long one fast, and every copy-count
change on resize alters the speed. Publish `period / rate` as the duration so
the strip holds one velocity whatever its content, floored so a short track
never races. 30–60px/s, floor 15–25s.
```js
track.style.setProperty('--dur', `${Math.max(20, period / 38).toFixed(2)}s`)
```
⚠ Re-derive after `document.fonts.ready` — the fallback face's period sets the
wrong speed for the whole session.
