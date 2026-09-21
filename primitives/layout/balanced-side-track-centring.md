---
id: balanced-side-track-centring
category: layout
tags: [layout,grid,alignment,chrome,correctness]
axes: none
cost: 1
seen: 7
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

The other failure is the middle child being *removed* rather than outgrowing its
share. An empty `auto` track collapses, but the two flexible sides keep splitting
the row evenly, so a wide brand on the left now wraps or runs under the cluster
on the right while half the row sits empty beside it. Drop to flex at that
breakpoint and let each side hug its own content.
```css
@media (width <= 680px) { .bar { display: flex; justify-content: space-between } }
```

The third track does not need a third child. `fr` sizes from free space rather
than from content, so two children in a three-track row still leave the middle
one centred — the empty end track takes its equal share regardless. Drop the
spacer node and place the children explicitly; an empty `div` kept only to fill
a slot ships in the accessibility tree unless it is hidden, and it silently
redirects any `:last-child` rule written against the row.
```css
.bar > .brand { grid-column: 1; justify-self: start }
.bar > .mid   { grid-column: 2 }
.bar > .end   { grid-column: 3; justify-self: end }   /* optional */
```
⚠ Explicit placement removes the safety of source order: a child added later
with no `grid-column` auto-places into the first free cell, which is now
whichever end track was left empty.
