---
id: one-hairline-token
category: scale
tags: [unit,tokens,border,precision,coherence]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
Every thin line in a system should be the same line. Declare one hairline width
in `rem` and spend it on borders, list rules, underline thickness and icon
strokes — `vector-effect: non-scaling-stroke` keeps an icon's stroke at that
weight whatever box it is drawn into. In `rem` the whole system thickens
together on a large display instead of stranding one 1px line.
```css
:root { --hair: .0625rem }
.rule { border-top: var(--hair) solid var(--line) }
a { text-decoration-thickness: var(--hair); text-underline-offset: .2em }
svg [stroke] { stroke-width: var(--hair); vector-effect: non-scaling-stroke }
```
⚠ Useful range .0625–.125rem. Thinner and the line drops out on non-retina.

One width, two tints. The rule separating rows *inside* a surface and the line
bounding the surface are the same weight and must not be the same value: the
interior line sits at the edge of visibility, two or three steps off the ground,
while the boundary reads as an edge at four or five. A single line colour makes
either the interior look ruled like a table or the container look unbounded.
```css
:root { --hairline: var(--ink-200); --edge: var(--ink-300) }
.panel      { border:var(--hair) solid var(--edge) }
.panel li+li{ border-top:var(--hair) solid var(--hairline) }
```
⚠ Two tints is the ceiling. A third reads as an inconsistency rather than a
hierarchy, and none of them may be the only thing separating two interactive
rows.

Spend the same token as a `gap` rather than a border and a grid rules itself:
set the line colour as the container's background, open a one-hairline gap, and
let every cell paint the ground. Interior lines are the container showing
through, so they cannot double at a join, no `:last-child` rule is needed to
strip a trailing edge, and a reflow at any breakpoint re-rules the grid for free.
```css
.grid { display: grid; grid-template-columns: repeat(4, 1fr);
  gap: var(--hair); background: var(--line); border: var(--hair) solid var(--line) }
.grid > * { background: var(--ground) }
```
⚠ Cells must be opaque — a translucent one shows the rule colour across its
whole face, not just at its edge.
