---
id: overshoot-for-pop-elements
category: timing
tags: [motion,easing,delight]
axes: {energy: 4, density: 2, weight: 2, finish: 3}
cost: 1
seen: 5
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
