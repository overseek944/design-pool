---
id: mirrored-sign-pair
category: reveal
tags: [reveal,motion,rotation,symmetry,pairing]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Two peer blocks on one row share a single progress value and read it with
opposite sign: one enters rotated negative and drifting right, the other positive
and drifting left, both resolving to zero together. The pair closes like a book
rather than sliding in parallel, which is what separates a row of two from a list
of many. Only worth it at exactly two — three or more reads as wobble.

```css
.pair > :nth-child(1) { --s: -1 }
.pair > :nth-child(2) { --s:  1 }
.pair > * { transform: rotate(calc(var(--s) * var(--a)))
            translateX(calc(var(--s) * var(--d) * -1)) }
```
⚠ Rest angle 3–7deg and travel 40–120px; past that the corners of a wide card
sweep outside the viewport and the page gains a horizontal scrollbar. Rotated
text is resampled mid-flight — land on exactly 0deg or it stays soft.
