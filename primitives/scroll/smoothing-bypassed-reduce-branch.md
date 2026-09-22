---
id: smoothing-bypassed-reduce-branch
category: scroll
tags: [scroll,spring,reduced-motion,accessibility,progress,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A value tracking scroll has no landed state to jump to, so the usual
reduced-motion answer — zero the duration, paint the outcome — cannot apply.
Split what a smoother does. Normalise scroll into a clamped 0–1, spring it so
chrome settles rather than tracks jitter, then branch at the *source*: the
preference picks raw progress over the spring's output and no consumer
changes. Range 120–220px, settling 150–350ms.

```js
const p = clamp01(scrollY / RANGE)     // exact, no lag
const drive = reduce ? p : spring(p)   // consumers read `drive` only
```
⚠ Reduced motion is not reduced *state* — suppress the change itself and the
chrome's appearance stops explaining itself. Re-read the query on `change`.
