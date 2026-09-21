---
id: baseline-square-bar-terminal
category: surface
tags: [chart,radius,hairline,detail,correctness]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A bar rounded at both ends stops touching its axis: the radius at the baseline
lifts the mark into a floating capsule and shortens the read by its own radius,
at the one end where the length has to start from zero. Round the data end only
and square the two corners on the baseline, so the bar stays seated on the
scale it is measured against. Radius 20–50% of the bar's thickness; past that
the terminal reads as a cap rather than an end.

```css
.bar           { border-radius: var(--r) var(--r) 0 0 }   /* --r: .2–.5 × width */
.bar[data-neg] { border-radius: 0 0 var(--r) var(--r) }
```
⚠ The engine clamps a radius past half the bar's length, so a short bar becomes
a lozenge — clamp to `min(var(--r), 50%)` yourself, or draw the terminal as a
path.
