---
id: translated-curve-line-field
category: surface
tags: [svg, path, lines, contour, wave, ground, ambient, generative]
axes: {energy: 2, density: 3, weight: 1, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Flowing hairlines need no noise or canvas: repeat one cubic curve N
times, each copy shifted only vertically. Translates of one curve never cross,
so the family packs evenly, reading as contours. Overscan the path
past the viewBox by the sway distance and animate the wrapping `<g>` — one
transform drives every line. Lines 24–40, step 12–24u, amplitude 40–80u, sway
±40–100u over 6–12s `alternate`.

```js
for (let i = 0; i < N; i++) { const y = i * STEP
  d.push(`M-100 ${y-A} C300 ${y-A} 300 ${y+A} 700 ${y+A} S1100 ${y-A} 1500 ${y-A}`) }
```
⚠ Stretched under `preserveAspectRatio="none"`, strokes distort — add
`vector-effect: non-scaling-stroke`. Alpha ≤ .25 behind text; stop
sway under reduced motion.
