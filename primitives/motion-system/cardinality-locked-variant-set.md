---
id: cardinality-locked-variant-set
category: motion-system
tags: [motion,svg,morph,state,diagram,architecture]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A set of marks that switches state — a diagram's shapes, a chart's series, the
parts of a figure — cross-fades the moment the member count changes, because the
renderer has nothing to match old to new. Pad every variant out to the set's
maximum with degenerate members: zero area, zero opacity, parked where they
should emerge from. Each index then owns one persistent element for the life of
the component, so a state change is geometry interpolating rather than two
pictures dissolving, and one spring carries every member at once.

```js
const N = Math.max(...variants.map(v => v.length))
const NIL = { pts: quad(cx, cy, 0, 0), opacity: 0 }
const set = variants.map(v => Array.from({ length: N }, (_, i) => v[i] ?? NIL))
```
⚠ Key members by index, never by a shape id — identity keys reintroduce the
mount and unmount this exists to prevent. Each degenerate member still costs a
node and a tween, so cap N rather than letting one rich variant set it for all
the others.
