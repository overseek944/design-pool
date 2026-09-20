---
id: inline-style-custom-property-hatch
category: scale
tags: [tokens,responsive,breakpoint,architecture,cascade,custom-properties]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Markup that carries its layout in `style` attributes — server-rendered
components, CMS blocks, design-tool export — cannot be reached by a media or
container query, because a declaration set inline outranks every stylesheet
rule. Emit a *custom property* inline instead of the property itself. The value
still travels with the node, but the consumer lives in the stylesheet, so a
breakpoint can redefine it like any other token. Where the emitter is not
yours, the only hatch left is a small closed set of `!important` utilities, one
per responsive decision, named in one block so the unoverridable rules stay
countable — four to eight, not a library.
```html
<div class="grid" style="--cols:5">
```
```css
.grid { grid-template-columns: repeat(var(--cols), minmax(0,1fr)) }
@media (width <= 900px) { .grid { --cols: 2 } }
```
⚠ An inline custom property is inherited, so it reaches every descendant that
happens to read that name — scope it with `@property { inherits: false }` or a
component-prefixed name.
