---
id: content-ghosted-width-reservation
category: type
tags: [type,layout-shift,css-only,accessibility,correctness]
axes: none
cost: 1
seen: 1
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
