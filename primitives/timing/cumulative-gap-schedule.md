---
id: cumulative-gap-schedule
category: timing
tags: [motion,sequencing,choreography,entrance]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A hand-authored entrance is a list of *pauses*, not absolute delays. Write the
gap before each beat and accumulate at run time: retuning one breath shifts
everything after it instead of forcing a rewrite downstream. Uniform stagger
cannot express this — a long hold, three fast beats, another hold. Gaps
150–550ms; under 120 reads as one beat.
```js
let t = 0
const ids = [400, 280, 380, 500].map((gap, i) =>
  setTimeout(() => setStep(i + 1), t += gap))
return () => ids.forEach(clearTimeout)
```
⚠ Clear every handle, not the last — a rerun without clearing leaves two
sequences racing. Under `prefers-reduced-motion`, jump to the end state rather
than shortening the gaps.
