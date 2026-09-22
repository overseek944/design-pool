---
id: summed-term-derivation-rows
category: layout
tags: [layout,data,figure,provenance,chart,accessibility]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A derived figure is believed only when its terms are visible. Give each term a
row — label, signed value, a bar scaled against the largest magnitude — then
close on a hairline with the total, so the arithmetic is auditable in place
rather than in a tooltip. Only direction carries hue. Three to six terms, track
4–8px, strip 260–380px.

```css
.term  { display: grid; grid-template-columns: 8rem 3rem 1fr; gap: .5rem }
.term i { inline-size: calc(var(--mag) / var(--max) * 100%) }
.total { border-block-start: 1px solid var(--line) }
```
⚠ Hue is not a sign a screen reader hears — keep the minus in the printed
value. Never floor a short bar: a two-pixel term is the finding.
