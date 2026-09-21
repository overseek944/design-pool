---
id: route-scoped-design-system-sheet
category: perf
tags: [performance,critical-path,architecture,tokens,bundle,css]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A marketing route sharing a build with the product inherits the product's whole
stylesheet — tables, charts, dialogs, node graphs — as render-blocking bytes on
a page that reaches almost none of it. Split by what each route can match: the
token block is small and belongs everywhere, the component layer only where
components mount. Measure per route with CSS coverage, before and after.

```
(marketing)/layout → tokens.css
(product)/layout   → tokens.css + components.css
```
⚠ Coverage over-reports: a `:root` block counts as used the moment one token in
it resolves, so 30% of a 500KB sheet is a floor, not the real share. Judge by
which selectors *can* match.
