---
id: root-attribute-composition-variant
category: layout
tags: [layout,variant,experiment,css-only,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Two arrangements of one section — a split hero against a centred one, a light
panel against an inverted one — need not be two component trees. Author the
base composition, then one delta block keyed to an attribute the server writes
on the root. An arm then costs a stylesheet block rather than a second render
path, there is no hydration mismatch and no flash before paint, and retiring
the loser is deleting rules. Keep the delta additive: two full compositions
drift apart by the third edit.

```css
.hero          { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1.02fr) }
[data-arm=b] .hero { grid-template-columns: 1fr; text-align: center; max-inline-size: 64rem }
```
⚠ CSS reorders what is painted, not what is read. One DOM order has to be
sensible in every arm or one of them ships a broken tab order — and anything
the arms cannot share, different copy or an extra control, is a render branch
rather than a rule.
