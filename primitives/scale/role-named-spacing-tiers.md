---
id: role-named-spacing-tiers
category: scale
tags: [tokens,architecture,rhythm,layout,scale]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A t-shirt spacing scale makes every author guess which step a given seam wants,
so the same seam gets three values. Insert a third tier: one base unit, numeric
steps derived from it, and role names on top — `page`, `band`, `section`,
`card`, `chunk`, `stack`, `row`. Call sites name the *relationship* they are
spacing, never a size, so the rhythm survives a rescale. The payoff is that a
dense subtree only has to redefine the base.

```css
:root { --unit: .25rem; --step-lg: calc(var(--unit) * 3);
        --space-card: var(--step-2xl); --space-stack: var(--step-md) }
.compact { --unit: .225rem }             /* .18–.28rem; whole subtree tightens */
```
⚠ Role names must stay ordered and non-overlapping — the moment two resolve to
the same step, authors pick by feel and the tier stops meaning anything.

Roles can name the *axis* of the relationship rather than the container:
`stack` for the seam between things above and below each other, `inline` for
beside, `cluster` for a group of controls that travel as one. Three short
ladders instead of one long one, and a call site picks its ladder from the
layout direction it is already in — a flex row reaches for `inline`, a grid
column for `stack`. One physical value can then sit in two ladders without
ambiguity, because the name says which seam it is.
```css
--space-stack-md: var(--step-3);  --space-inline-md: var(--step-3);
.col { gap: var(--space-stack-sm) }   .row { gap: var(--space-inline-sm) }
```
⚠ Only pays where vertical and horizontal rhythm genuinely diverge. If the
ladders stay numerically identical at every step they are one ladder with two
names, and the second set is overhead.
