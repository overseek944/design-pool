---
id: slack-funded-control-expansion
category: layout
tags: [layout,flex,toolbar,disclosure,controls,restraint]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A secondary control in a fixed bar — volume, a filter, a search field — can be
absent at rest and still not shove the bar when it opens. Give exactly one
sibling `flex: 1` and every other child `flex: none`: the expansion is paid out
of that elastic neighbour, so both ends hold and only it shortens. Animate
`inline-size` from 0 with opacity behind. Open width 48–96px; the elastic
sibling needs a floor so it cannot be eaten.

```css
.bar > *       { flex: none }
.bar > .track  { flex: 1; min-inline-size: 6rem }
.slider        { inline-size: 0; opacity: 0;
                 transition: inline-size .25s var(--curve), opacity .2s }
.vol:is(:hover, :focus-within) .slider { inline-size: 64px; opacity: 1 }
```
⚠ `inline-size` relayouts the row each frame — one control, not a row of them.
A zero-width control is still focusable: gate on `:focus-within`, never hover
alone, or a keyboard reaches a slider it cannot see.
