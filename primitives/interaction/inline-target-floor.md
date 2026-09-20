---
id: inline-target-floor
category: interaction
tags: [accessibility,interaction,correctness,detail]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A row of small print — legal links, meta, a footer — fails target size long
before it fails contrast. Make each link `inline-flex` with a `min-height` at the
floor: the hit box grows while the type stays at its intended size, and the
visible text does not move. Give the wrapping row a small cross-axis gap so the
grown boxes cannot overlap into each other's targets. Floor 24px, or 44px where
the row is a primary way out of the page.

```css
.meta { display: flex; flex-wrap: wrap; column-gap: 1.25rem; row-gap: .25rem }
.meta a { display: inline-flex; align-items: center; min-height: 44px }
```
⚠ `min-height` on an inline box does nothing — the display change is the mechanism.

Where the mark cannot grow its box at all — an icon link inline in a heading, a
control on a tight row — decouple the hit box from the layout box instead:
padding out to the floor, then an equal negative margin that hands the space
back to the layout. The element measures 44px to the pointer and its original
size to every sibling, so nothing reflows and the icon stays where it was drawn.
```css
.icon { display: inline-flex; box-sizing: border-box;
        width: 44px; height: 44px; padding: 13px; margin: -13px }
```
⚠ Layout no longer knows the targets grew, so two of them closer than the
padding have overlapping hit boxes and one silently steals the other's taps.
Check spacing between neighbours against twice the padding, and keep the
negative margin off any edge where it would drag the element out of a clipping
parent.
