---
id: legibility-floor-scroll-port
category: layout
tags: [overflow,responsive,scroll,correctness,table,figure]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A table or a diagram has a width below which it stops being readable, and
shrinking past it serves nobody. Give the content an intrinsic floor and let
the wrapper scroll sideways instead — 34–40rem for a four-column table, the
authored width for a diagram. Keep the framing rules on the wrapper so the top
and bottom lines hold while the content slides under them.
```css
.port { overflow-x: auto; overscroll-behavior-inline: contain }
.port table { min-width: 38rem }
.port img   { width: 52rem; max-width: none }
```
⚠ Without `overscroll-behavior-inline: contain` a swipe running off the end of
the strip chains to the browser's back gesture and leaves the page.

A port that scrolls is content a keyboard must be able to reach, and a plain
`overflow-x: auto` div is not focusable — the rows past the fold are
unreachable without a mouse. Give it `tabindex="0"`, a `role="region"` and a
label naming what scrolls, then style the ring: it is a real stop in the tab
order and must look like one.
```html
<div class="port" tabindex="0" role="region" aria-label="Results by model">
```
⚠ Only make it focusable while it actually overflows, or it is a dead tab stop
at every width where the table fits.

`min-width: max-content` on the content is the floor to reach for when no single
rem value is right — a code block whose longest line is unknown. It scrolls at
exactly its widest line and never wraps, where a fixed floor either wraps a long
line or over-reserves for a short one. It only works if every grid or flex
ancestor carries `min-width: 0`; without it the track floors at min-content, the
port never overflows, and the whole layout widens instead.
```css
.port { min-width: 0; overflow-x: auto }      /* and every ancestor track child */
.port pre code { display: block; min-width: max-content }
```

Scrolling is the wrong answer in running prose. A reader mid-article will not
move a code block sideways to finish a sentence, so let it wrap: `pre-wrap` plus
`overflow-wrap: break-word`, with `overflow-x: visible` so no port is created at
all. Scroll a port the reader has stopped at — a table, a hero snippet, a
diagram; wrap anything embedded in a column of text.
