---
id: inline-target-floor
category: interaction
tags: [accessibility,interaction,correctness,detail]
axes: none
cost: 1
seen: 1
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
