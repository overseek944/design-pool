---
id: instance-scoped-filter-id
category: surface
tags: [svg,filter,architecture,correctness,component]
axes: none
cost: 1
seen: 1
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
