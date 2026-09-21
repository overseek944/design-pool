---
id: edge-traversing-knob
category: interaction
tags: [interaction,state,affordance,motion,detail]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: [coordinated-group-state]
---
A control states its direction by sending its own mark the whole way across it
rather than nudging it. Pin the mark to the inner edge and animate
`inset-inline-start` to `calc(100% - mark - pad)`, turning it on the same clock
so it arrives having changed rather than merely moved. The label never shifts,
so nothing reflows. 300–450ms; faster reads as a teleport. One per screen —
two of these compete for the same claim.

```css
.act  { --m: 2rem; --p: .25rem; position: relative }
.knob { position: absolute; inset-block: 0; inline-size: var(--m); margin-block: auto;
        inset-inline-start: var(--p); transition: inset-inline-start .4s ease-out, rotate .4s }
.act:hover .knob { inset-inline-start: calc(100% - var(--m) - var(--p)); rotate: 180deg }
```
⚠ Needs `@media (hover: hover)` or a tap strands the mark at the far edge under
sticky `:hover`. Reduced motion gets a colour change, not a shortened trip — a
mark crossing a whole control is large-amplitude peripheral motion. Keep the
label clear of both end positions.
