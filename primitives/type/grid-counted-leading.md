---
id: grid-counted-leading
category: type
tags: [type,tokens,scale,rhythm,leading,architecture]
axes: none
cost: 2
seen: 2
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

Between the count above and a ratio sits a third model that answers that
warning: set leading as the size *plus a constant*. The interline gap then holds
at one value across the whole scale — small text opens up, display closes in,
which is what both actually want — and one size token drives leading with no
second token to keep in step. The constant is the paragraph's texture: 4–8px on
a 13–18px body, tightening toward 2–4px where the scale runs to display sizes.

```css
.text-body { font-size: var(--size-body); line-height: calc(var(--size-body) + 6px) }
```
⚠ It degenerates at both ends of a wide scale — a 48px headline gets 1.13 and a
10px label gets 1.6. Use it across the two or three sizes that share a texture,
and let display roles name their own ratio rather than stretching one constant
over everything.
