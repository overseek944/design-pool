---
id: count-threshold-shape-shift
category: layout
tags: [layout,has,quantity-query,chrome,css-only,density]
axes: none
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
Let a container change what it *is* once its contents pass a count, in CSS
alone. `:has(.item:nth-child(N))` is true only when an Nth child exists, so a
shell can detach a rail into a floating card — rounding its far corners, taking
elevation, dropping the divider it shared with the body — at exactly the density
where a flush edge stops reading. One threshold per rule; stack two or three for
a ladder.

```css
.shell:has(.list > :nth-child(4 of .item)) .rail {
  border-end-end-radius: var(--radius-panel); border-inline-end: none;
  box-shadow: var(--edge-raised), var(--shadow-elevated) }
```
⚠ Only `:nth-child(n of S)` counts *matching* children — plain `nth-of-type`
counts by tag, so one hidden sibling of the same element crosses the threshold
silently. The flip can fire mid-insert, so animate compositable properties only.

Presence is the other threshold. `:has()` on a decorative child lets a container
concede to it — a heading that drops a step of its clamp where a graphic shares
its box, and keeps the full scale everywhere the graphic is absent. The
concession travels with the component instead of living in a modifier class the
next author has to know to pass.

The document root can concede the same way. Properties only `html` can carry —
`scroll-padding-top` for fixed chrome, `overscroll-behavior`, `color-scheme`, a
density `zoom` — are usually toggled by a script that knows which route
rendered; `html:has(.marker)` lets the page itself decide, resolved at parse
with no script and no flash.
```css
html:has(.doc-page) { scroll-padding-top: 5.5rem; zoom: 1 }
```
⚠ Only if the marker is in the served HTML. Mounted by script after hydration,
the root property flips a frame late and the whole document jumps.

A shell conceding to a child that changes its *layout mode* — an optional rail
turning one centred column into two asymmetric tracks — has to reach further
than the grid declaration. Alignment committed elsewhere survives the switch:
centred hero text and `margin-inline: auto` blocks stay centred inside the
narrower track and read as misaligned against the rail. Reverse them under the
same `:has()`, and hide the full-bleed decorations that assumed the symmetric
mode.
```css
.page:has(> .rail)          { grid-template-columns: var(--rail-w) minmax(0, 1fr) }
.page:has(> .rail) .body    :is(.is-centred, [class*="mx-auto"]) { text-align: left; margin-left: 0 }
main:has(.page > .rail) > .backdrop { display: none }
```
⚠ Every rule is a second definition of the same component. Scope them to one
block next to the grid declaration, or the two modes drift apart silently.
