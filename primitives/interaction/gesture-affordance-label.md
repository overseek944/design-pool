---
id: gesture-affordance-label
category: interaction
tags: [affordance,interaction,accessibility,detail,ux]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A surface whose only affordance is a gesture — drag to orbit, scroll to zoom,
pinch to pan — advertises nothing. No cursor change, no hover state, nothing
moves until someone guesses. Name the gesture in a small label parked in a
corner of the surface, then retire it the first time the gesture succeeds. Type
at 0.7–0.8rem on a 60–75% plate; inset 8–16px from the edge it sits against.

```css
.hint { position: absolute; inset-block-end: .75rem; inset-inline-start: .75rem;
        transition: opacity 200ms } [data-used] .hint { opacity: 0 }
```
⚠ A permanent label is clutter and still leaves keyboard users with nothing —
the surface needs real key handling and its own description either way.
