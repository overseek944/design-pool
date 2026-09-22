---
id: tint-only-selection-highlight
category: type
tags: [type,selection,highlight,contrast,accessibility,cheap]
axes: {energy: 1, density: 1, weight: 2, finish: 5}
cost: 1
seen: 7
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

The opaque form is right in exactly one case: a page with a single ink and a
single ground. There are no role colours to flatten and no coloured sample to
protect, so setting both `color` and `background-color` to the swapped pair
states the selection as an inversion — the strongest mark available, and one
that keeps the contrast the page already passes instead of diluting it to a
wash. Swap the page's own two values; a third colour here reads as a bug.
```css
::selection { color: var(--ground); background-color: var(--ink) }
```
⚠ Audit every inverted region, dark panel and caption over art first — the
moment a second ground exists this stops being an inversion and becomes an
arbitrary block.
