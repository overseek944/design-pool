---
id: lead-in-separated-arrival
category: timing
tags: [timing,motion,sequence,stream,demo,mock,cadence,delay]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
A mock of anything that arrives over a network — streamed tokens, search
results, build lines — reads as fake at a uniform cadence: the real thing
pauses once, then is steady. Split the schedule in two, a lead-in before the
first item and a constant gap after it. The lead-in is the number worth varying
between scenarios, because it is what a faster path actually changes. Lead-in
200–600ms, gap 40–90ms.

```js
const t = items.map((_, i) => setTimeout(() => show(i + 1), leadIn + gap * i))
return () => t.forEach(clearTimeout)
```
⚠ Clear the whole set on every re-arm, not the pending tail — a scenario
switched mid-pass interleaves two schedules. Under `reduce`, render the
finished state.
