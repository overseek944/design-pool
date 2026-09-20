---
id: trapezoidal-visibility-envelope
category: timing
tags: [motion,timing,loop,architecture]
axes: none
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
Elements that appear, hold and leave on one shared timeline do not each need a
state machine. Give every one a window — start, end, and a shoulder width — and
evaluate it against the single clock: eased ramp up, flat through the hold,
eased ramp down, zero outside. Opacity, scale, stroke weight and label colour
all read that one scalar, so a beat becomes three numbers in a table rather
than a pair of transitions to keep in sync. Shoulders 0.3–0.5s, or 4–8% of a
normalised cycle.
```js
const env = (t, a, b, f = .4) =>
  t < a - f || t > b + f ? 0 : t < a ? ease((t - a + f) / f)
  : t > b ? 1 - ease((t - b) / f) : 1
```
⚠ Shoulders wider than the hold turn the plateau into a spike and the element
never reaches full strength — keep `b - a` above twice the shoulder.

The same envelope written in CSS is a pair of percentages per phase rather than
a formula: `0%, 12%` holds the entry state, `44%, 90%` holds the resolved one,
`96%, to` returns. A single `@keyframes` then *is* the schedule — the flat
stretches are visible in the source as repeated stops, and a reviewer can read
the dwell without running it. Give one loop several participants by keeping the
period identical and moving only the stop percentages.
```css
@keyframes arrive { 0%, 12% { clip-path: inset(0 100% 0 0) }
  44%, 90% { clip-path: inset(0) } 96%, to { clip-path: inset(0 100% 0 0) } }
```
⚠ Without a hold at the end the loop restarts the instant it resolves and the
beat never lands. Keep the final plateau at 30% of the cycle or more.

Hang a second property on the same envelope and the beat stops reading as a
fade. A small `blur()` released over the entry ramp — 1.5–3px to zero — makes
each participant resolve into focus rather than brighten, which distinguishes
arriving from merely being turned on. It costs nothing extra: the same two
percentage stops already in the keyframe carry both properties.
```css
@keyframes arrive { 0%, 18% { opacity: 0; filter: blur(2px) }
  26%, 92% { opacity: 1; filter: blur(0) } to { opacity: 0 } }
```
⚠ `filter` on a held element is a compositor layer for the whole cycle, not
just the ramp — fine for a handful of participants, not for dozens.

Write the window as the *product* of two independent ramps — one rising at the
start, one falling at the end — rather than one function with a single shoulder
width. The two shoulders then tune separately, which is what a beat that snaps
on and drifts off actually needs, and any further condition multiplies into the
same scalar: a master fade, a proximity falloff, a per-layer gate. Each term
reads alone and the product is still one number per element per frame.
```js
const up   = (t, at, d) => smoothstep((t - at) / d)
const down = (t, at, d) => 1 - smoothstep((t - at) / d)
const a = up(t, .02, .1) * down(t, .72 * dur, .3) * master
```
⚠ Every term must reach 1 somewhere or the element never hits full strength —
overlapping ramps silently cap a beat at a fraction of its intended value.

The blur release is not confined to a loop — it is the sharpest thing available
to a one-shot entrance, where a figure resolving into focus reads as being
*measured* rather than faded in. Same two stops, `both` fill so the delay holds
the blurred frame, and the range runs wider off a loop: 1.5–5px, the top of it
only on something set large enough to carry it.
```css
@keyframes settle { from { opacity: 0; filter: blur(4px); translate: 0 12px } }
```
⚠ `filter` on a large element forces a full-size offscreen buffer every frame —
fine on a figure, ruinous applied to a whole section. Land on `filter: none`,
never `blur(0)`, so the buffer is released at the end rather than kept alive.
