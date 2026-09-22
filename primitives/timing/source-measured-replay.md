---
id: source-measured-replay
category: timing
tags: [timing,motion,stream,demo,data,honesty,correctness]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A result that arrives whole but is *about* how fast it was produced loses its
whole argument when it appears at once, and inventing a cadence to replay it at
is a lie the page is making on the machine's behalf. Have the response carry its
own elapsed seconds and spend exactly that long unveiling it: one rAF, progress
as `t/measured`, slice the payload by that fraction. A faster backend then
visibly finishes sooner with no constant retuned. Below a floor nobody perceives
as duration, skip the pass and paint the result — 40–80ms.

```js
const p = Math.min((performance.now() - t0) / (secs * 1000), 1)
el.textContent = parts.slice(0, Math.floor(parts.length * p)).join('')
```
⚠ Slice on words or rows, never characters — a per-character write inside a live
region is announced per character. Under `reduce`, render the finished state.
