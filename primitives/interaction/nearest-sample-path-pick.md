---
id: nearest-sample-path-pick
category: interaction
tags: [interaction,svg,pointer,diagram,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: [svg-userspace-pointer-mapping]
tension: []
---
Dozens of hairline curves crossing in one figure cannot be hit-tested by
widening their strokes: the fat targets overlap and several claim the same
pixel. Sample each path once — step its arc length into a cached point list —
then pick the single nearest sample to the pointer and reject anything past a
cutoff radius. Exactly one route lights, its endpoints light with it, the rest
dim. Step 10–20 user units; radius 20–30, tightened where routes run close.
```js
for (let s = 0; s <= p.getTotalLength(); s += 14) pts.push(p.getPointAtLength(s))
// then: nearest cached point wins, unless best distance > radius²
```
⚠ `getPointAtLength` forces layout — build the cache on first pointer move and
rebuild only on resize, never per frame. A box hit under the cursor should win
outright, or wide targets become unreachable through the curves crossing them.
