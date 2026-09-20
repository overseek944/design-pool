---
id: balanced-side-track-centring
category: layout
tags: [layout,grid,alignment,chrome,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`space-between` centres nothing: the middle child lands wherever the outer two
leave it, so a wordmark on one side and a two-button cluster on the other push
the nav off the page's axis. Three tracks — equal flexible sides, intrinsic
middle — put that child on the true centre line whatever the sides weigh. The
same construction does title-between-arrows and label–rule–label.
```css
.bar { display:grid; align-items:center;
       grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) }
.bar > :first-child { justify-self:start }
.bar > :last-child  { justify-self:end }
```
⚠ True only while both sides fit their share — once one outgrows it the centre
drifts, and nothing reports it. Somewhere in 600–800px give the middle child its
own row instead.
