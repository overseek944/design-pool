---
id: role-named-spacing-tiers
category: scale
tags: [tokens,architecture,rhythm,layout,scale]
axes: none
cost: 2
seen: 1
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
