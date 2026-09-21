---
id: overshoot-for-pop-elements
category: timing
tags: [motion,easing,delight]
axes: {energy: 4, density: 2, weight: 2, finish: 3}
cost: 1
seen: 6
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
