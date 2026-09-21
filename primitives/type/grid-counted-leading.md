---
id: grid-counted-leading
category: type
tags: [type,tokens,scale,rhythm,leading,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: [role-leading-ladder]
---
Set leading as a whole count of one shared unit instead of a ratio of the font
size, and count the sizes off a second unit of the same kind. Mixed sizes in a
column then land on one rhythm, and a breakpoint retunes every heading, label
and gutter by editing two numbers rather than a table of tokens. Keep the units
small enough that the counts stay whole — 0.26–0.34rem each — because the count
is what the call site reads.

```css
:root      { --u-size: .275rem; --u-lead: .275rem }   /* ≥921px: .32rem */
.display   { font-size: calc(var(--u-size) * 20); line-height: calc(var(--u-lead) * 21.5) }
.body      { font-size: calc(var(--u-size) * 4.5); line-height: 1.55 }
```
⚠ Absolute leading cannot respond to the content it holds — keep prose on a
ratio, and never set the units in `px`, or a reader's larger type grows the
glyphs inside line boxes that did not move.
