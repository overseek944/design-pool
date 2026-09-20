---
id: stagger-band
category: timing
tags: [motion,rhythm,sequencing]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Sibling stagger lives in a narrow band: **.06–.08s** reads as one gesture
arriving in sequence. Below .04 the group fires as a block; above .12 it becomes
a queue and the reader waits.
```js
{ stagger: .07 }
{ stagger: { amount: .22, from: "random" } }   // whole run capped, scattered
```
`amount` caps the *total* spread regardless of count — the pattern that keeps a
40-item grid from taking three seconds.

Ship the band as **two** tokens, not one value: a tight base at .06–.08s for
siblings that should read as a single gesture, and a loose tier at .12–.15s for
sequences meant to be counted — steps, beats, a list the reader is supposed to
follow item by item. One token forces every group into the same reading.
