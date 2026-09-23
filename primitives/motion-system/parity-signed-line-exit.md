---
id: parity-signed-line-exit
category: motion-system
tags: [exit, headline, lines, scroll, stagger, split-text]
axes: {energy: 4, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A multi-line headline that leaves as one block reads as scrolled off; lines that
leave on alternating sides read as dispersed. Derive a sign from each line's
index, `index × 2 − 1`, and multiply one exit scalar by it for lateral drift and
tilt, while lift and a backward pitch stay unsigned. Drift 20–50px, tilt 2–5°,
pitch 10–20°, lift 60–120px.

```css
.line > span { --dir: calc(var(--i) * 2 - 1);
  transform: translate(calc(var(--x) * var(--dir) * 34px), calc(var(--x) * -90px))
             rotateZ(calc(var(--x) * var(--dir) * 3deg)) rotateX(calc(var(--x) * -14deg)) }
```
⚠ Lines come from layout, so re-split on resize or the parity lands on the wrong
lines. Under reduced motion, fade only.
