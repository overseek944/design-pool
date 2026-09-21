---
id: focus-released-occlusion
category: interaction
tags: [interaction,accessibility,focus,sticky,correctness,css-only]
axes: none
cost: 1
seen: 2
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

The release must exempt the covering element's *own* focus, or reaching a
control inside it un-pins it under the reader's hands mid-interaction. Test for
focus anywhere in the region and then subtract focus inside the pinned part —
one selector, still no listener pair. A band pinned to the bottom of a panel
wants the same shape with `scroll-margin-bottom` instead, sized to the band plus
the safe-area inset, since a virtual keyboard shortens the port from below.
```css
.room:has(:focus):not(:has(.foot :focus)) .foot { position: static }
.room :is(button, input, select, a[href]) {
  scroll-margin-bottom: calc(var(--foot-h) + env(safe-area-inset-bottom)) }
```
⚠ `:focus`, not `:focus-visible`, once a text field is involved — a pointer tap
into an input still raises the keyboard that the release exists to clear.
