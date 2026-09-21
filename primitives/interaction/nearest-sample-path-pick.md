---
id: nearest-sample-path-pick
category: interaction
tags: [interaction,svg,pointer,diagram,correctness]
axes: none
cost: 2
seen: 2
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

Sample by fixed *count* rather than fixed step and the cache costs the same for
every path, which is what a figure of wildly unequal routes wants: a long
corridor and a short spur each build 80–120 points instead of the long one
costing ten times the layout reads. Resolution then varies with length, so the
cutoff radius has to clear the coarsest path's own spacing or a pick along it
falls between samples. Take the index as the keyboard's handle too — a fixed
fraction along each path is a stable place to land.
```js
const n = 100, L = p.getTotalLength()
pts = Array.from({length: n + 1}, (_, i) => p.getPointAtLength(L * i / n))
```
⚠ Fixed count is wrong once the paths differ by more than about 5×: the longest
one's spacing sets the radius, and that radius is then loose enough on the short
ones to claim picks that belong to a neighbour.
