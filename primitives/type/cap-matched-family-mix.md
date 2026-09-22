---
id: cap-matched-family-mix
category: type
tags: [type,pairing,font,alignment,precision]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Two families at the same `font-size` rarely share a cap height, so a serif
figure beside a sans label, or a serif phrase inside a sans headline, looks a
size off. `font-size-adjust: cap-height <ratio>` rescales the second face so its
capitals match the primary's — every role token stays one number across both
families. Use the primary face's own cap ratio, typically .66–.73 for a
grotesque.

```css
.serif, .display, .stat { font-size-adjust: cap-height .70 }
```
⚠ It resizes the whole face, so x-height and line length shift too — recheck
measure. Unsupported engines fall back to the unadjusted size, so pick pairs
that are tolerable there.
