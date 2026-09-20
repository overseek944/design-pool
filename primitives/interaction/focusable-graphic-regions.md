---
id: focusable-graphic-regions
category: interaction
tags: [accessibility,svg,focus,diagram,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A drawing whose parts answer to the pointer — a map, a schematic, a labelled
assembly — is unreachable by keyboard and silent to a screen reader when only
the whole `<svg>` carries a label. Make each part its own figure instead:
`tabindex="0"` and `role="img"` on the group, an `aria-label` naming the part
*and* its value, and `aria-hidden` on the text already drawn inside so nothing
is read twice. The hover treatment then keys off `:focus` for free.

```html
<g class="part" tabindex="0" role="img" aria-label="Gulf — 15% uplift">
  <use href="#gulf" class="shape"/><text aria-hidden="true">15%</text>
</g>
```
```css
.part { outline-offset: 3px }                      /* 2–4px, off the stroke */
.part:hover .shape, .part:focus .shape { filter: brightness(1.45) }
```
⚠ Tab order follows document order, not the picture. Sort the groups into a
reading sequence or the keyboard walks the drawing at random.
