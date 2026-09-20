---
id: in-flow-overlay-header
category: layout
tags: [layout,sticky,overlay,correctness,cls]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A header that must float over the first section and still stick has a conflict:
`position: sticky` works only while the element stays in flow, and in flow it
occupies height. Keep it sticky and reclaim the height with a negative bottom
margin. `fixed` would solve the overlay and cost a hand-maintained body
`padding-top` plus the scroll behaviour.

```css
.head { position: sticky; top: 0; z-index: var(--z-head) }
.head[data-overlay] { margin-bottom: calc(-1 * var(--head-h)) }
```
⚠ The margin must equal the real height at every breakpoint or the hero shifts —
ship `--head-h` as a token, not a measurement. Add `scroll-padding-top:
var(--head-h)` on the root or anchor jumps and keyboard focus land underneath.
