---
id: sub-floor-density-breakpoint
category: scale
tags: [responsive,breakpoints,density,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Designing to a 390px floor leaves a real 320–380px band unhandled, and the
things that break there are the rows that cannot wrap — a mark, a figure and a
chevron on one line; a label-and-value pair. Rather than let them wrap into
nonsense, add one breakpoint inside the band that steps the type down a point
or two and restores it above.
```css
.stat { font-size: 10.5px }
@media (min-width: 333px) { .stat { font-size: 11.5px } }
```
⚠ One or two of these, on the specific rows that fail — a full tier below the
floor is unmaintainable. Never step below a 10px rendered size, and check the
row still clears 4.5:1 at the smaller size.
