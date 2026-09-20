---
id: in-flow-overlay-header
category: layout
tags: [layout,sticky,overlay,correctness,cls]
axes: none
cost: 1
seen: 6
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

Where the bar is inset from all four edges rather than full-bleed — a strip of
floating controls over the hero, not a plate — `fixed` is the right call after
all, and the cost it usually carries goes away: nothing needs a body offset
because the bar was never meant to reserve height. Give the container
`pointer-events: none` and its controls `auto`, or the invisible strip swallows
clicks and text selection across the full page width.
```css
.bar { position: fixed; inset: 24px 24px auto; pointer-events: none }
.bar a, .bar button { pointer-events: auto }
```

An overlay bar above an asymmetric layout has nothing to align to: a centred
`max-width` inner lands the nav in the wrong place the moment the page beneath
is split rather than centred. Give the bar the *same* `grid-template-columns` as
the section under it and put the links in the matching track — the bar inherits
the layout's geometry instead of restating it, and one edit to the split moves
both. Collapse both to a single track at the same breakpoint.
```css
.stage, .overlay-bar { grid-template-columns: 1fr minmax(0, var(--aside, 46vw)) }
.overlay-bar { position: absolute; inset: 0 0 auto; display: grid }
```
⚠ The two rules are one decision written twice — carry the track list in a
custom property or they drift apart at the next breakpoint.
