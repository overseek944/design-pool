---
id: focus-released-occlusion
category: interaction
tags: [interaction,accessibility,focus,sticky,correctness,css-only]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Any arrangement that deliberately covers one element with another — a pinned
stage a later panel rises over, a negative-margin overlap, an ascending
`z-index` — hides whatever the keyboard lands on once focus reaches the covered
side. Let that element opt out of its own positioning while focus is inside it.
`:has(:focus-visible)` is one rule with no `focusin`/`focusout` pair to keep
balanced, and it is scoped to keyboard focus, so a pointer press does not
unpin the page mid-scroll.
```css
.stage { position: sticky; top: 0 }
.stage:has(:focus-visible) { position: relative; top: auto }
```
⚠ The release is a layout change under the reader. Give the focusable children
`scroll-margin-top` equal to the fixed chrome, or the browser's own
scroll-into-view lands them behind it.
