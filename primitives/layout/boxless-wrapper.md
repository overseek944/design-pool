---
id: boxless-wrapper
category: layout
tags: [layout,grid,architecture,correctness,accessibility]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`display: contents` removes an element's box while keeping its children. A
wrapper that exists for ownership — a component boundary, a provider, a
conditional group — can sit inside a grid or flex parent without its children
losing their place in that layout. The alternative is flattening the markup or
reaching for `subgrid`.

```css
.chrome { display: contents }
```
⚠ The box is gone, so `background`, `padding`, `border`, `transform`,
`position`, `overflow` and containment on that element are silently ignored —
and it cannot be a stacking or positioning context. On an element with native
semantics (`ul`, `table`, `button`) it also drops that role from the
accessibility tree, so apply it only to plain `div`s.
