---
id: safe-area-floor-gutter
category: layout
tags: [layout,tokens,safe-area,responsive,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A gutter written as a plain value gets eaten by notches, rounded corners and
gesture bars; a gutter written as `env()` alone collapses to zero on every
device without insets. Take the larger of the two, resolve each side
independently, and ship the result as the token every section reads — the
design value becomes a floor the hardware can only raise. Design value 16–32px
narrow, up to 80px wide.
```css
:root { --gutter: 32px;
  --pad-i: max(env(safe-area-inset-left),  var(--gutter));
  --pad-e: max(env(safe-area-inset-right), var(--gutter)) }
.section { padding-inline: var(--pad-i) var(--pad-e) }
```
⚠ `env()` resolves to zero unless the document ships `viewport-fit=cover`, and
landscape is where insets actually bite — test there, not portrait.
