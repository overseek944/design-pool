---
id: percentage-root-with-divided-type
category: scale
tags: [scale,tokens,accessibility,unit,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Spacing and type share the `rem` and usually cannot be tuned apart: enlarging
the root to open up the layout also inflates every label. Set the root as a
*percentage* of the reader's own base size, then divide the type tokens by that
same factor. Gutters, radii, container widths and icon slots grow by the factor;
text lands exactly where the reader asked for it. A percentage root keeps
browser font-size settings working, which a `px` root silently discards.

```css
html { font-size: 120% }                 /* 105–135% useful */
:root { --text-body: 0.8333rem;          /* 1 ÷ 1.2 */
        --text-meta: 0.5729rem }
```
⚠ Third-party and framework rem values are not divided and will render at the
full factor. Either restate them as tokens or accept that borrowed components
run one step large.
