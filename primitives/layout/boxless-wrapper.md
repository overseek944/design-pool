---
id: boxless-wrapper
category: layout
tags: [layout,grid,architecture,correctness,accessibility]
axes: none
cost: 1
seen: 2
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

The same property is a responsive tool, and that is where it earns most. A
desktop structure built from nested wrappers — a header pair above a body pair —
can only ever stack wrapper-then-wrapper on a narrow screen, when what the
reader needs is each header sitting directly above its own body. Flatten both
wrappers at the breakpoint and all four children become direct items of one
grid, placeable by `grid-template-areas` in any order. No duplicated DOM, no
script, and the desktop nesting stays intact above the breakpoint.
```css
@media (max-width: 720px) {
  .card { display: grid; grid-template-areas: "h-a" "b-a" "join" "h-b" "b-b" }
  .heads, .bodies { display: contents }
  .head-a { grid-area: h-a } .body-a { grid-area: b-a }
}
```
⚠ Anything the flattened wrappers were painting — a shared background, a border
between the pairs, a `gap` that only applied inside one of them — vanishes with
their boxes at exactly that breakpoint. Move those declarations onto the
children or onto the grid before flattening.
