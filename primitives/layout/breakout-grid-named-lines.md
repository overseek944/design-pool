---
id: breakout-grid-named-lines
category: layout
tags: [layout,grid,tokens,architecture,full-bleed]
axes: none
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
One grid on the page wrapper with named lines for the bleed gutters and the
content field: a child picks its width by naming a line instead of escaping with
negative margins. Derive the column track from the content width itself — max
width less margins less gutters, over the count — so full-bleed and in-grid
children share one rhythm.
```css
--col: calc((min(var(--max),100vw) - var(--margin)*2 - var(--gutter)*11)/12);
.page { display:grid; column-gap:var(--gutter); grid-template-columns:
  [full-start] minmax(0,1fr) [content-start] repeat(12,minmax(0,var(--col)))
  [content-end] minmax(0,1fr) [full-end] }
.hero { grid-column: full }  .prose { grid-column: content }
```
⚠ Clamp margin 32–80px, gutter 16–32px; hold the count fixed. `minmax(0,…)`
throughout — a bare `1fr` has an `auto` minimum, so one long string widens a
track.

With no page grid to name into, the same asymmetry is one padding `calc()`: pad
the leading edge out to where the centred container would start and leave the
trailing edge at the plain gutter, so a block sits on the content rhythm on one
side and bleeds off the viewport on the other.
```css
.half-bleed { padding-left: calc(max(0px, (100cqw - var(--max)) / 2) + var(--gutter));
              padding-right: var(--gutter) }   /* --max 56–80rem */
```
⚠ `100vw` here includes the scrollbar and drifts the copy off the sections
below it — measure a container-typed wrapper instead.

Where `100vw` genuinely is the right measure — a rule that must span the window,
not the container — subtract the scrollbar in CSS rather than reaching for JS:
on the root, `100vw` includes it and `100%` does not, so the difference *is* its
width. Cache it once as a token and every breakout reads the same number.
```css
:root { --sbw: calc(100vw - 100%) }
.rule { width: calc(100vw - var(--sbw)) }
```
⚠ Only valid measured on an element whose containing block is the root and that
is not itself scrolling — anywhere else the two quantities are unrelated.
