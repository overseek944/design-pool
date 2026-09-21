---
id: cycle-seam-reshuffle
category: timing
tags: [timing,loop,motion,svg,variation]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [percent-of-master-duration]
tension: []
---
An ambient loop that repeats exactly becomes wallpaper on the second pass. Change
what it shows, but only at the seam: read the running clock, wait out the
remainder of the current period, then mutate — which entries light, where nodes
sit, which track leads — while every participant sits at the state it started in.
Nothing pops, because the frames either side of the boundary are identical.
Re-arm from the mutation itself so no drift accumulates. Periods 6–12s; floor the
wait at 150–250ms so a throttled tab cannot spin.
```js
const wait = period - (svg.getCurrentTime() % period)
setTimeout(() => { reshuffle(); tick() }, Math.max(200, wait * 1000))
```
⚠ Only what is invisible or at rest at the boundary may change — mutate anything
mid-travel and the seam is precisely where the jump shows.
