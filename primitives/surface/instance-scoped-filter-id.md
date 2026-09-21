---
id: instance-scoped-filter-id
category: surface
tags: [svg,filter,architecture,correctness,component]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Filters, gradients and masks resolve by id against the whole document, so a
component shipping its own `<defs>` collides with its second instance and every
copy silently renders the first one's parameters. Generate the id per instance,
hand it to CSS as a custom property, and the rule stays static — the stylesheet
never learns the id and nothing goes inline.

```css
.pane { backdrop-filter: var(--filter-id) saturate(1.15) }
```
```js
const id = `f-${useId().replace(/[^\w-]/g, '-')}`   // framework ids carry ':'
```
⚠ A URL fragment cannot contain `:` or a leading digit — sanitise, do not trust
the generator. The map inside also needs the element's own size, so recompute it
from a `ResizeObserver`, not once at mount.

A generated noise filter wants a generated `seed` beside the generated id.
Share one and a grid of textured panels shows the identical grain in every cell,
which reads as a repeated asset rather than material; vary it and each surface
is its own piece of stock cut from the same batch. Derive the seed from the
instance key so it survives hydration and re-render unchanged — a random draw
per paint makes the texture flicker. Any spread over a few hundred is enough;
the value is arbitrary, only its stability and distinctness matter.
```js
const seed = [...id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7) % 997
```
⚠ Seed changes the pattern, not its statistics — vary `baseFrequency` and octave
count slightly too, or the cells still read as one texture offset.
