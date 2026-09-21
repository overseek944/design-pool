---
id: breakpoint-published-as-tokens
category: scale
tags: [responsive,breakpoint,tokens,container-query,custom-properties,architecture,css-only]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A breakpoint is usually a place rules are written, so every component that cares
restates the query. Publish it instead: one query sets inherited tokens on `*` —
0/1 flags for what arithmetic reaches, named keyword tokens read as a `var()`
fallback for what it cannot. Each property's whole responsive story then fits one
declaration, and under `@container` a component answers to its own box without
naming it. Two to four steps, each smaller flag defaulting to the next larger so
only differences are stated.

```css
:root { --lg: 1; --md: 0 }
@container (width < 50em) { * { --lg: 0; --md: 1; --flex-md: flex } }
.row { display: var(--flex-md, grid);
       gap: calc(2.5rem * var(--lg) + .75rem * var(--md)) }
```
⚠ A zero-weighted term still has to parse, and one unresolvable `var()` voids the
whole declaration — give every flag a root default. Setting tokens on `*` inside
a query is a cheap match but a wide invalidation; keep it to the token block.
