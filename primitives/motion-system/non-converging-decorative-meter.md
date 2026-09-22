---
id: non-converging-decorative-meter
category: motion-system
tags: [motion,mock,meter,progress,accessibility]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 9
requires: []
conflicts: []
completes: []
tension: []
---
A meter animated inside a product mock gets read as data. Fill it to 100% and
the reader goes looking for the finished thing; leave it frozen and the
screenshot reads as dead. Oscillate it inside a mid band instead — 35–80% is
visibly alive and never near enough to either end to claim a state.

```css
.meter { animation: drift 4s ease-in-out infinite alternate }   /* 3–6s */
@keyframes drift { from { inline-size: 40% } to { inline-size: 75% } }
```
⚠ Without `alternate` the first and last frames must be identical or the bar
snaps back at every wrap. It reports nothing: keep it `aria-hidden`, never
`role="progressbar"`, and stop it under `prefers-reduced-motion`.

Where the meter *is* the argument — a scored assessment, a confidence, a
qualitative level the scene exists to show — the rule inverts and the number
becomes the problem instead. A screen reader announcing "62" says nothing the
reader can act on. Use `role="meter"` with the value present for shape and an
`aria-valuetext` carrying the word the visual is actually communicating, so both
audiences get the same claim at the same resolution.
```html
<span role="meter" aria-valuemin="0" aria-valuemax="100"
      aria-valuenow="62" aria-valuetext="partial">
```
⚠ `aria-valuetext` replaces the number outright, so it has to be the whole
message — a bare "62 percent" band label leaves the reader worse off than the
default. A level that is genuinely unknown is not a zero: withhold the meter
rather than render an empty one.

Where the surface is a still frame rather than a live one, oscillation is wrong
for the opposite reason: it makes the only moving thing in a screenshot the
thing that reports nothing. Run the fill once to a partial width and stop.
`both` holds the end state, and a deliberate 20–35% says *underway* where 100%
says *done* and a loop says *decorative*. Durations 6–10s — slow enough that it
is never the subject.
```css
.meter i { animation: fill 8s linear both }      /* to { inline-size: 27% } */
```
⚠ Its reduced-motion form is that end width declared statically, not the
animation removed: `animation: none` on a bar whose width lives only in the
keyframes leaves it empty, which reads as a failed load.

An unbounded readout inside a mock — a call timer, a counter, a live duration —
cannot oscillate its way out of the problem: it only climbs, and left running it
reaches a value that contradicts the scene. Seed a plausible figure in the
markup so the still frame, the print and the first paint all read correctly,
then let script increment only while the mock is in view and never under
`reduce`. Visible at 0.2–0.4 of the element, and stop climbing after 60–90s.
```js
io = new IntersectionObserver(([e]) => e.isIntersecting && start(), { threshold: .3 })
```
⚠ The seeded value is the one most readers see — choose it as carefully as the
screenshot, not as a zero.

A one-shot indeterminate bar that must never claim completion runs the same rule
forwards: `scaleX(0)` to `.6–.75` by 60% of a 1–1.5s run, then crawl to
`.9–.95` and hold with `forwards`. Only the real finish may take it to 1.

A figure in a mock — a price, a rate, a latency — obeys the same band rule as a
bar. Drive it from a sine of an integer tick around a fixed base, amplitude
0.2–1% of the base, and offset each row's phase so neighbours never move in
step: bounded by construction, it cannot trend toward a claim the way a random
walk eventually does. Tick 1.2–2s; faster reads as a feed someone should act on.
```js
v = base + Math.sin((tick + i * 4) / 7) * amp      // i = row, amp ≈ .004 × base
```
⚠ Rewrite only the digits, in a width-reserved `tabular-nums` cell, and stop the
interval under `reduce` and while the mock is off screen.
