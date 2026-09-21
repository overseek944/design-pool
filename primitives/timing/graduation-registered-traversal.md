---
id: graduation-registered-traversal
category: timing
tags: [motion,diagram,svg,rhythm,precision,loop]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A marker crossing a drawn scale reads as drift unless its stops are the scale's
own. Lift the graduations out of the artwork, write one keyframe stop per mark,
then space those stops evenly *in time*: the traveller takes the same beat
between every pair however unequal the gaps are. Uneven travel on an even
cadence is what an instrument looks like. Three to five stops over 8–16s,
entering and leaving beyond the outermost mark so the loop has no seam.

```css
@keyframes descend {              /* percentages even, distances not */
  28% { translate: 0 250px }  54% { translate: 0 517px } }
```
⚠ Keep traveller and marks in one `viewBox` — scaled apart, the stops and the
ticks part company and the registration reads as an error.
