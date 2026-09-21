---
id: slot-attribute-child-contract
category: layout
tags: [layout,architecture,composition,naming,css-only]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Let the arrangement own its children's boxes. A part publishes one stable
`data-slot` name; the container that places it writes the height, radius and
clipping against that attribute. The same part is then a tall tile in one grid
and a flush row in another with no variant prop, no forwarded class and no
wrapper element — the part keeps its content and its states, the layout keeps
every measurement.

```css
.roster [data-slot="card"]   { min-block-size: var(--card-h); border-radius: 1rem; overflow: clip }
.rail   > [data-slot="card"] { min-block-size: 0; border-radius: 0 }
```
⚠ A descendant attribute selector crosses component boundaries: nest a part
inside itself and the inner copy is styled too — scope with `>` or a second
attribute on the container. A slot name that script also queries is two
contracts in one string; give behaviour its own hook.
