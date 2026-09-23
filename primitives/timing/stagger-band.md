---
id: stagger-band
category: timing
tags: [motion,rhythm,sequencing]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 1
seen: 17
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

That ceiling is on *classes*, not CSS: generated markup can carry the delay
inline and author an uneven schedule per element — 240/400/560/1100ms — playing
from first paint, not after hydration.

A group nested inside a staggered group needs its own band, not the parent's.
Start the child's run at the parent slot it occupies and step it from there, so
the inner items read as belonging to that slot rather than as more siblings:
`t = parentIndex * outer + childIndex * inner`, inner at or below outer.

Delays do not scale to marks that are not elements. Where a thousand things are
drawn in one batched pass, give each a start offset and read its progress as a
window on a single normalised clock — `smoothstep(start, start + w, t)` — so the
whole cascade is one number. It is then scrubbable, reversible, interruptible,
and reduced motion is `t = 1` rather than a branch. Window 0.12–0.25 of the run;
spread the starts over the remainder.

The band widens as the unit gets bigger. 60–80ms is right for siblings in a row;
a cascade down the *lines* of a heading reads better nearer 40–55ms, because the
eye is already travelling down them and the extra delay lands as lag rather than
rhythm. Scale it to what is moving, not to a house number.

Tokens inside one line are not siblings and do not take the sibling band. Words
in a heading sit **20–50ms** apart — an order below .06–.08 — because the eye
tracks them as a single wave crossing the line, not as items arriving in turn.
At the sibling band a ten-word heading takes most of a second to finish and
reads as a queue. Scale by tokens per line, not by the house step.

A dense field has no sibling band at all: hundreds of cells stepped one at a
time take seconds, and the eye reads them as texture rather than as items.
Bucket the index by one axis — `floor(i / cols)` — so an N-cell grid arrives in
a handful of column waves, and drop the step an order below the sibling band,
8–16ms per wave. Which axis buckets is then a layout decision, not a schedule:
by column the field fills left to right, by row it fills like text.
