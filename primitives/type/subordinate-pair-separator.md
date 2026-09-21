---
id: subordinate-pair-separator
category: type
tags: [type,figures,hierarchy,detail,unit]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One quantity stated twice — two currencies, metric beside imperial, the ends of
a range — reads as two separate facts while the separator carries the same ink
as the figures. Drop the glyph one weight step and one tone step below both
operands and the eye binds the pair into a single value: it stops being a third
number and becomes a joint. Put the separator 40–60% of the way from figure ink
to ground. Everything else in the row may be quieter than the figure; only this
should be quieter than the label beside it.

```css
.pair      { font-weight: 500; color: var(--ink) }
.pair span { font-weight: 400; color: var(--ink-quiet) }
```
⚠ Announced as two numbers with a symbol between them. The relation has to live
in text or an `aria-label`, not in the weight. Under 3:1 the separator drops out
and the two figures collide into one unreadable number.
