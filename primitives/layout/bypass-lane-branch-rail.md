---
id: bypass-lane-branch-rail
category: layout
tags: [layout,diagram,connector,flowchart,branch,hairline]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A condition in a vertical flow needs a path that leaves the spine and rejoins
below it, and reaching for SVG buys a measured coordinate per node. Draw the
lane as one absolutely positioned box with three borders and the two corners on
its outer side rounded: it peels off at the split, runs down its own rail and
curves back under the branch. It stays in flow, so it re-solves whenever the
nodes reflow. Rail 30–44px out, radius 12–18px.

```css
.branch { position: relative }
.lane   { position: absolute; left: 34px; right: 50%; top: 0; bottom: -11px;
          border: 1px solid var(--line); border-right: 0;
          border-radius: 14px 0 0 14px }
```
⚠ `right: 50%` lands the rejoin on the spine only while the lane's containing
block shares the nodes' centre. The route is geometry alone — label both legs,
or the figure says nothing to anyone not looking at it.
