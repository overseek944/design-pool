---
id: derived-epsilon-write-guard
category: perf
tags: [performance,frame-budget,animation,correctness,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scrubbed frame writes dozens of values, nearly all unchanged — each a style
invalidation paid for regardless. Guard each write with the cheapest test on
its input, and take the tolerance from the *output's* resolution: a colour
channel cannot show less than 1/255, a position less than a device pixel.
Discrete state takes a composite key; text, a read first.
```js
if (Math.abs(p - last) < 1 / 255) return           // .002–.01 per channel
const k = `${step}|${mode}|${innerWidth}`; if (k === lastKey) return
if (el.textContent !== s) el.textContent = s
```
⚠ One epsilon cannot serve every output — a tolerance right for a colour
strands a transform short of its target.
