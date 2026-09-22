---
id: writing-mode-flipped-edge-rail
category: layout
tags: [layout,chrome,writing-mode,responsive,rail,fixed,logical-properties]
axes: {energy: 1, density: 2, weight: 3, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One fixed chrome strip can run down the left edge on desktop and along the
bottom on a phone. A `space-between` flex row under `vertical-rl` follows the
inline axis, so it runs top to bottom; at the breakpoint restore `horizontal-tb`,
move the inset, and the children re-lay left to right. Width 24–36px, mono 8–10px.

```css
.rail { position: fixed; inset: 0 auto 0 0; width: 30px; display: flex;
        justify-content: space-between; writing-mode: vertical-rl }
@media (max-width: 980px) { .rail { inset: auto 0 0; width: auto; height: 24px;
        writing-mode: horizontal-tb } }
```
⚠ Nothing reserves its space: offset content by the strip's width (height when
flipped) or it covers the first column and last line.
