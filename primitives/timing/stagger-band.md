---
id: stagger-band
category: timing
tags: [motion,rhythm,sequencing]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 1
seen: 4
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
siblings that should read as a single gesture, and a loose tier at .12–.22s for
sequences meant to be counted — steps, beats, labelled phases taken one at a
time, the top of that band only for block-sized items. One token forces every group into the same reading.

Without a script the stagger is *n* delay classes on one keyframe, stepping by
the chosen band. It needs `animation-fill-mode: both`, or each element holds its
*final* state through its own delay and the group flashes in before the sequence
starts. Past eight classes, use the JS form.
