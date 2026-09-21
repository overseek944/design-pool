---
id: geometry-scoped-connector-overlay
category: layout
tags: [layout,diagram,connector,responsive,correctness,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An overlay of connectors is a picture of one arrangement, not of the content.
Below the breakpoint that builds that arrangement the columns become a stack,
every endpoint moves, and the rescaled drawing lands on nothing — so delete the
layer at that width instead of reflowing it, and let the stacked order carry the
relationship. Gate it on the same query that sets the columns, never on a second
hand-tuned one that can drift out of step.

```css
.diagram { display: grid; grid-template-columns: 1fr }
.links   { display: none }
@media (min-width: 48rem) {
  .diagram { grid-template-columns: var(--rail) 1fr var(--rail) }
  .links   { display: block; position: absolute; inset: 0; pointer-events: none }
}
```
⚠ The overlay is decoration on both sides of the query, so the relationship has
to survive without it — if the lines are the only thing saying what connects to
what, the narrow layout has lost the content, not a flourish.
