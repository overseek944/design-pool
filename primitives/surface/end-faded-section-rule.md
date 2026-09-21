---
id: end-faded-section-rule
category: surface
tags: [hairline,divider,gradient,section,restraint]
axes: {energy: 1, density: 1, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A full-bleed rule declares a measure it does not have: run it edge to edge and
it contradicts the column, clip it to the column and it announces a container
the eye cannot otherwise see. Paint it as a gradient that reaches zero alpha at
both ends instead and the line has no endpoints to justify. Peak alpha belongs
over the content, not at the viewport's geometric centre, so an asymmetric
layout takes an off-centre peak stop. Peak 20–40% of the line token; a full
strength peak reads as a clipped solid rule.

```css
.seam { height: 1px; border: 0;
  background: linear-gradient(90deg, transparent, var(--line) 50%, transparent) }
```
⚠ Not a contrast-bearing edge anywhere but its middle — never the only
separation between two interactive regions, and never the accessible boundary
of a group.
