---
id: content-ghosted-width-reservation
category: type
tags: [type,layout-shift,css-only,accessibility,correctness]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Text that animates or swaps in place resizes its own box and relays out the line
around it. Reserve from the content, not from a number: stack the children in
one grid cell and add a hidden twin carrying the final string through `attr()`.
The box is sized by the longest state it will ever hold, exactly, in the face
that actually rendered — no measurement pass, no `ch` guess, no width transition
on the layout thread, and it holds for a proportional face.

```css
.slot { display: inline-grid; grid-template-areas: "s"; white-space: nowrap }
.slot > *, .slot::before { grid-area: s }
.slot::before { content: attr(data-text); visibility: hidden }
```
⚠ Generated `content` is announced by some screen readers, so the string can
arrive twice — keep the live text as a real child and check with one.

The block axis needs no twin. A line that types in from empty — or arrives a
word at a time — has a zero-height line box until its first glyph lands, and
everything below it lifts by a line and drops back. `min-height: 1lh` holds the
slot from first paint through an empty string; `1.1–1.3em` where `lh` is not
available, matched to the line-height it is set at.
```css
.typed { display: block; min-height: 1lh }
```
⚠ Reserves one line only. Reserve against the longest *rendered* case — a
string that fits on one line at 1440px and wraps to two at 390px still moves
the page there, which is the width the reservation was bought for.
