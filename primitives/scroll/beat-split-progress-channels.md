---
id: beat-split-progress-channels
category: scroll
tags: [scroll,scrub,choreography,custom-properties,sequence,architecture]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 2
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
A scrubbed multi-beat scene needs no state machine and no per-element animation.
Split the scroll scalar into named channels — a start and a span each, clamped
and smoothstepped — write them all to the scene root in one pass; every consumer
is then a `calc()`. Named for the beat rather than the child, one channel drives
unrelated elements across the subtree and the schedule reads as a table. Overlap
consecutive spans 20–40% and beats read as one movement; disjoint spans read as
a queue. Spans 0.12–0.3 of the scroll.

```js
const ch = (p, at, span) => smooth(clamp01((p - at) / span))
root.style.setProperty('--merge', ch(p, .54, .16).toFixed(4))   // one per beat
```
⚠ The rule that turns the scrub off — short viewport, reduced motion, dead
script — must neutralise every consumer too, or the channels hold 0 and the
scene paints empty.

A beat that must appear *and* leave is two channels, not one keyframe. Give it
an enter and an exit, multiply them for opacity and subtract them for travel,
and the element rises into place and keeps going the same way instead of
reversing out — no sequencing, since both are pure functions of the scalar.
Overlap one beat's exit with the next beat's enter by 0–0.06 of the scroll: a
gap reads as a pause, an overlap as a handoff.
```css
opacity:   calc(var(--enter) * (1 - var(--exit)));
transform: translateY(calc((1 - var(--enter)) * 18px - var(--exit) * 18px))
```

Not every consumer is a `calc()`. Colour, shadow and border cannot be reached
from a unitless scalar, so the scrub needs a second, non-numeric channel:
quantise the same progress into a band name on a data attribute and let those
properties transition on their own clock while the numbers keep tracking the
scroll exactly. Three or four bands — more and the switches read as flicker.
```js
const band = p < .32 ? 'work' : p < .68 ? 'decision' : 'follow'
if (band !== el.dataset.phase) el.dataset.phase = band
```
```css
[data-phase="decision"] .card { box-shadow: inset 0 2px var(--accent) }
.card { transition: box-shadow .3s }
```
⚠ Write the attribute only on change — one per frame is a style invalidation
per frame. Never transition the `calc()`-driven properties themselves or the
scrub lags its own input.

Where the channels are pure windows on the driver, the stylesheet can compute
them and script writes exactly one property per frame. `clamp(0, calc((var(--p)
- start) / span), 1)` is the same expression the controller was running, and it
puts each beat's schedule in the rule that consumes it rather than in a table
the controller owns. Retuning a beat stops being a code change.
```css
.stage    { --trunk: clamp(0, calc((var(--p) - .20) / .14), 1);
            --out:   clamp(0, calc((var(--p) - .34) / .62), 1) }
.stage .t { opacity: var(--trunk) }
```
⚠ Unregistered, these are tokens: readable in `calc()` but never interpolable,
so the whole chain is only as smooth as the driver written to it. Nothing may
`transition` on them.

The write guard is stronger formatted than compared. Round to the precision the
value will be written at, then compare the *string* — `toFixed(1) + 'px'` — and
every sub-pixel jitter in the driver collapses to one token that matches the
last, so a slow scroll writes on a handful of frames instead of all of them.
Comparing the float first fails exactly where it matters: two values that differ
in the seventh decimal are one identical declaration. One cache entry per
channel, keyed by name.
```js
const w = (prop, key, v) => { if (last[key] === v) return; last[key] = v
  root.style.setProperty(prop, v) }
w('--mask-inset', 'mi', inset.toFixed(1) + 'px')
```
⚠ Precision is a decision, not a default. Round a translate to whole pixels and
a slow scrub steps; round an opacity to two places and it bands.

The channels need not be computed in script at all. Publish the one raw scalar
and let each consumer derive its own window in the stylesheet — subtract the
start, divide by the span, `clamp()` — and the schedule lives beside the rule it
drives instead of in a table the CSS cannot see. A media query can then retime a
beat for one breakpoint, which a JS channel table cannot do without learning the
breakpoints twice.
```css
.scene      { --p: 0 }                       /* script writes only this */
.scene .b2  { --on: clamp(0, calc((var(--p) - .55) / .43), 1) }
@media (max-width: 640px) { .scene .b2 { --on: clamp(0, calc(var(--p) / .7), 1) } }
```
⚠ `clamp()` on unitless numbers needs all three arguments unitless — one stray
`px` and the whole declaration is invalid and the consumer falls back to its
initial value, silently, with no console error.
