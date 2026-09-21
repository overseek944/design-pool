---
id: line-local-trailing-slot
category: layout
tags: [layout,flex,cards,metadata,correctness,css-only,detail]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A footer mixing a wrapping run of chips with one trailing metadata string has
no column to put it in: `space-between` spreads the chips apart, and a grid
cannot wrap them. Make the string the last flex child and give it an auto
inline-start margin. Auto margins resolve per flex *line*, so it hugs the end
edge whether it shares the last chip line or lands alone on the next one, and
the chips keep their own gap either way. No reserved row and nothing measured.

```css
.row { display: flex; flex-wrap: wrap; align-items: center;
       gap: var(--chip-gap, 6px) }               /* 4–10px */
.row > :last-child { margin-inline-start: auto; flex: none;
                     white-space: nowrap }
```
⚠ The auto margin eats its line's free space, so `justify-content` stops
affecting that line. `flex: none` is not optional — without it the string
shrinks under its content and breaks mid-phrase.
