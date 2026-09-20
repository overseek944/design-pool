---
id: non-converging-decorative-meter
category: motion-system
tags: [motion,mock,meter,progress,accessibility]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 2
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
