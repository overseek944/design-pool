---
id: overshoot-for-pop-elements
category: timing
tags: [motion,easing,delight]
axes: {energy: 4, density: 2, weight: 2, finish: 3}
cost: 1
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
`back.out(n)` on small elements that should feel physical — badges, counters,
icons, pills. Tune `n` to size: `1.4–1.6` for large or text-bearing elements,
`2.0–2.8` for small graphic ones. Never on anything holding body copy; the
overshoot makes text unreadable mid-flight.
```js
{ duration: .45, ease: "back.out(2.2)" }
```

Where the move is a keyframe sequence rather than a tween there is no ease to
name and the overshoot is stops: approach, a stop past the target, a smaller one
back the other way, then rest. That buys what `back.out` cannot — an
*asymmetric* rebound, a large overrun answered by a correction a fraction of its
size, which reads as mass arresting itself rather than as a spring. Overrun
20–30% of the travel, counter 3–8% of it, whole settle under a fifth of the
period.
```css
@keyframes seat { 0%,40% { translate: 0 } 50%,57% { translate: 27% 83% }
                  67% { translate: -1% -3% } 70%,to { translate: 0 } }
```
⚠ The pair of equal stops either side of the overrun is what reads as contact —
a single stop passes through the extreme and the arrival disappears.

The keyframe form and a back-easing shorthand do not stack — they compound. The
shorthand's timing function is re-applied to *every* segment, so a curve whose
output passes 1 overshoots each authored stop as well as the target: stops at
50/70/85% under `cubic-bezier(.34,1.56,.64,1)` reach about 1.5× the declared
extreme and ring an extra time. Author the bounce in one place. Stops carry it,
and the shorthand stays `linear` or `ease-out`; or one `back.out` carries it and
the keyframes stay a plain two-stop move.
⚠ The compounded peak is invisible in the stylesheet — it is in neither the
stops nor the curve. Sample the computed value mid-flight rather than reading
the numbers.

On a scroll-driven timeline the pair of stops is not needed: progress is the
reader's scroll position, not a clock, so a *single* overshoot stop can be
scrubbed to and held, and the arrival survives being crossed slowly. One stop
past the target at 65–80% of the range, overrunning 8–15% of the travel, then
rest. The shorthand has to stay `linear` — any easing there re-maps scroll
progress and the scrub stops tracking the hand.
```css
@keyframes land { 0%  { opacity: 0; translate: 0 26px }
                  72% { opacity: 1; translate: 0 -3px }
                  to  { opacity: 1; translate: 0 } }
.part { animation: land linear both; animation-timeline: --stage }
```
⚠ Scrubbed backwards the overshoot plays in reverse, so it reads as the element
being pulled out rather than bouncing — keep the overrun small enough that the
reverse is not a second event.

In a compound transition the overshoot is scoped to the geometric properties and
nothing else. `box-shadow`, `background-color` and `border-color` travelling
past their endpoints either clamp — so the curve's whole point is invisible —
or read as a flash at the extreme, and a shadow that rings alongside the element
detaches from it. Give those a monotone ease at roughly half the transform's
duration: the colour lands while the geometry is still arriving, which reads as
an instant response followed by a move.
```css
.control { transition: transform .46s cubic-bezier(.18,1.38,.32,1),
                       box-shadow .26s ease, background-color .26s ease }
```
⚠ Ratio, not absolutes — take the non-geometric channel to 0.5–0.65 of the
transform's duration. Matched durations put the settle and the colour's arrival
on the same frame and the whole thing reads as one flat move again.
