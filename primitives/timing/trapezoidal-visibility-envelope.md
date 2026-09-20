---
id: trapezoidal-visibility-envelope
category: timing
tags: [motion,timing,loop,architecture]
axes: none
cost: 1
seen: 3
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
