---
id: breakpoint-fallback-chain
category: scale
tags: [tokens,responsive,architecture,components,css]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Let a caller pass per-breakpoint values as custom properties and resolve them
with a nested `var()` chain that falls through to the next smaller one that was
defined. Each breakpoint rewrites only the chain, never the consumers, so a
component accepts `{sm, md, lg}` props with no media query per instance and any
size the caller skipped inherits downward on its own.

```css
.box { --cols: var(--sm-cols) }
@media (min-width: 48rem) { .box { --cols: var(--md-cols, var(--sm-cols)) } }
@media (min-width: 64rem) { .box { --cols: var(--lg-cols, var(--md-cols, var(--sm-cols))) } }
```
⚠ The smallest tier must always be defined — an unresolved chain makes the
declaration invalid at computed-value time, not absent. Chains stay readable to
about four tiers; past that write the media queries out.
