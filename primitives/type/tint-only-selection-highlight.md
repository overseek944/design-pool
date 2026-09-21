---
id: tint-only-selection-highlight
category: type
tags: [type,selection,highlight,contrast,accessibility,cheap]
axes: {energy: 1, density: 1, weight: 2, finish: 5}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
The UA selection block is opaque and sets its own text colour, so on a dark
ground it inverts the run and inside a coloured sample it flattens every role
colour to one. Declare `::selection` with `background-color` alone and no
`color`: a translucent wash marks the range while every glyph keeps the colour
it was given. Alpha 25–40% — under about 20% a reader cannot tell what they
have grabbed. Redeclare it inside any inverted region, since the wash
composites against that element's background and not the page's.

```css
::selection            { background-color: rgb(from var(--accent) r g b / .30) }
.inverted ::selection  { background-color: rgb(from var(--accent) r g b / .38) }
```
⚠ `::selection` honours only a handful of properties, and `forced-colors`
overrides it outright — which is correct. Never let the highlight carry meaning.
