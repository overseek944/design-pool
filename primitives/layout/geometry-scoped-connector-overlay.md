---
id: geometry-scoped-connector-overlay
category: layout
tags: [layout,diagram,connector,responsive,correctness,architecture]
axes: none
cost: 1
seen: 5
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

Where the overlay's job is to say which of several routes was taken, draw the
whole option space once as inert hairlines and carry the selection on one extra
stroke laid over them, its `d` set from a table of routes. The unchosen paths
stay visible, so the figure states the alternatives rather than implying a
single fixed pipe, and a state change is one attribute write however many
routes there are — no per-route class, no elements mounting and unmounting.
Ghost strokes at 0.35–0.5 of the active weight and a muted ink; the active one
takes the accent.
```js
demo.querySelector('.active-line').setAttribute('d', routes[name])
```
⚠ Author every route from the same endpoints so the active stroke lands exactly
on the ghost it replaces — a half-pixel apart and the overlap reads as a
doubled line rather than as a highlight.
