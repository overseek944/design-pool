---
id: stepped-transform-sprite
category: media
tags: [media,sprite,animation,svg,performance]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 2
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
Play a short looping illustration as a filmstrip: frames in one wide row, slid
by whole frames with `steps()`. Because the only animated
property is `transform`, it stays on the compositor — cheaper than swapping
`background-position`, and unlike a video it works inside an SVG. Start paused and let a viewport
observer release it, so idle sequences cost nothing. 8–16 frames over 0.6–2s.

```css
@keyframes strip { to { transform: translateX(-100%) } }
.sprite {
  transform-box: fill-box; will-change: transform;
  animation: strip var(--dur, 1.2s) steps(var(--frames, 12), end) infinite;
  animation-play-state: paused;
}
```
⚠ `steps(n)` must match the frame count exactly or the loop drifts; one wide strip is also one large decode, so cap the row width.

When the frames are DOM rather than one image — glyphs, spans, subtrees — stack
them in one grid cell instead of sliding a strip. Frames need no common width,
nothing decodes, and the still state is one child.
```css
.stack { display: inline-grid }  .frame { grid-area: 1/1;
  animation: show .64s step-end infinite }   /* slice = 1/n exactly */
@keyframes show { 0%, 24.99% { opacity: 1 } 25%, to { opacity: 0 } }
@media (prefers-reduced-motion: reduce) { .frame { opacity: 0; animation: none }
  .frame:first-child { opacity: 1 } }
```

`transform-box` has a second value that matters whenever a *part* of a drawing
animates: `view-box` resolves percentage `transform-origin` against the SVG's
own viewBox rather than the element's tight bounding box. A beam pivoting about
a hinge, a needle about its pin, a lid about its fold — the origin can then be
authored in the same coordinates as the artwork, and it stays put when the
shape's own extent changes mid-animation. `fill-box` is right for whole-sprite
moves; `view-box` for anything hinged.
```css
.beam { transform-box: view-box; transform-origin: 50% 29% }
```
⚠ Without either value the origin resolves against the *reference box*, which
for SVG children is the nearest viewport — usually not what the artwork implies.

Nothing requires the stepped property to be a translation. Put `steps()` on a
*rotation* and one drawn object becomes its own filmstrip: `rotateY` through
360° quantised to 8–12 steps reads as a coin, a token or a card flipping, with
no frames authored, no strip to decode and one element in the DOM. The step
count is the whole design — fewer than 8 and the object jumps, more than 14 and
it stops reading as frames and starts reading as a stuttering spin.
```css
.token { animation: flip 1.2s steps(10, end) infinite }   /* 8–12 steps, 1–1.8s */
@keyframes flip { to { transform: rotateY(360deg) } }
```
⚠ A flat shape is edge-on at 90° and 270° and disappears for that frame, so the
count must not land on them: `steps(8)` and `steps(12)` both do, `steps(10)`
does not. Pair with `shape-rendering: crispEdges` if the art is pixel-aligned.

`view-box` also makes the origin a *parameter*. Because it resolves against
coordinates every sibling shares, each member of a set can name its own pivot
in the artwork's own numbers and one `@keyframes` block then serves the whole
set — three shapes each breathing about their own centre, one rule, no
generated block per instance. Pair it with a per-member duration off the same
custom-property mechanism and the group drifts apart for free.
```css
.disc { transform-box: view-box; transform-origin: var(--ox) var(--oy);
        animation: breathe var(--dur) ease-in-out infinite alternate }
.disc-a { --ox: 852px; --oy: 308px; --dur: 11s }   /* 9–18s */
```
⚠ The origin is read in user units, so a `px` suffix here is the viewBox's
pixel, not the screen's. A value copied off a rendered measurement lands
somewhere the artwork never specified.

A script-driven strip has no `animation-direction: alternate` to reach for, and
a boomerang written with a direction flag needs a branch at both ends and a
reset on every restart. Fold the index space instead: run the counter over a
period of `2n − 2` and mirror the back half. One modulo and one comparison give
a sequence that walks out and back forever with no state beyond the counter —
and `2n − 2`, not `2n`, is what stops the two endpoints being held for two
frames each, which reads as a stutter at the turn.
```js
const period = pingpong ? 2 * n - 2 : n
const frame  = i < n ? i : period - i        // i = counter % period
```
⚠ Degenerate below three frames: at `n = 2` the period is 2 and the fold is a
plain loop, at `n = 1` it is zero and the modulo throws.
