---
id: dispersal-routed-morph
category: motion-system
tags: [morph,rearrange,burst,transition,marks]
axes: {energy: 4, density: 3, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A field of marks interpolated straight into a new arrangement reads as a lerp
however good the easing — the old form stays legible until it is the new one.
Route every mark through a dispersed intermediate instead: fling them to a ring
at randomised angles, ease-out on the way there, ease-in onto their targets.
Neither form survives the middle, so the change reads as dissolve and reform.
Burst a quarter to a third of the timeline; ring radius 0.8–1.2× the form.

```js
const a0 = Math.random() * TAU                                    // SPLIT ≈ .28
const ring = shuffle(range(n)).map(s => polar(a0 + s / n * TAU, rand(.8, 1.2) * R))
p[i] = q < SPLIT ? lerp(from[i], ring[i], easeOut(q / SPLIT))
                 : lerp(ring[i], to[i], easeIn((q - SPLIT) / (1 - SPLIT)))
```
⚠ Take ring angles from a shuffled slot list, jittered — a fresh random each
clumps, and a clump reads as a dropped mark. The legs need opposed curves;
ease-out on both stalls everything on the ring.
