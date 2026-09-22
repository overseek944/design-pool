---
id: cap-registered-ruled-row
category: type
tags: [type,alignment,grid,blueprint,precision,metrics]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Text inside a visibly ruled grid looks misregistered: the line box centres
ascent-plus-descent, not the letters. Carry the face's metrics as unitless
tokens, derive where the cap band lands, and translate so caps sit at a chosen
point in the row — 0.5 centres, 0 hugs the top rule. Row equals the grid module
(20–36px).

```css
.ruled { --asc: 1.005; --desc: .295; --cap: .71; --align: .5 }
.ruled p { line-height: var(--row);
  --cap-top: calc((var(--row) - (var(--asc) + var(--desc)) * 1em) / 2 + (var(--asc) - var(--cap)) * 1em);
  translate: 0 calc(var(--align) * (var(--row) - var(--cap) * 1em) - var(--cap-top)) }
```
⚠ Metrics belong to one face; a fallback font lands off the rules.
