---
id: in-flow-overlay-header
category: layout
tags: [layout,sticky,overlay,correctness,cls]
axes: none
cost: 1
seen: 15
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

Where the stuck bar is a floating capsule, the gap around it belongs to the
sticky element's *padding*, not to its `top` offset — the inset is then inside
the sticky box, so the capsule can never reach the viewport edge however the
plate is sized, and `top` and the visual gutter stop being two numbers to keep
equal. Cancel the padding's cost in the flow with an equal negative margin and
the bar still occupies only the capsule's own height.
```css
nav { position: sticky; top: 14px; padding: 14px 14px 0; margin-top: -14px }
```
⚠ The negative margin pulls the *next* element up too if the bar is not the
first child — and `scroll-padding-top` must now clear the capsule plus the
padding, not the capsule alone.

Hiding the bar can be a question about *where* rather than about scroll
direction. Over one designated region — a full-bleed stage, a dark immersive
card — persistent chrome is the only thing breaking the frame, and a
direction-sensing header flickers back on every small upward scroll. Gate on the
region's own rect instead: hidden while it still covers the top of the viewport,
back the moment it has passed, with a small scroll floor so the bar is present
at rest.
```js
const over = zone.getBoundingClientRect().bottom > 0 && scrollY > 80
head.classList.toggle('is-hidden', over)
```
⚠ A hidden header must not be focus-trapped off screen — translate it out and
let `:focus-within` bring it back, or keyboard users lose the nav for the length
of the stage.

Not all of a header has to persist. Where only one cluster is wanted while
reading — the tabs, not the wordmark beside them — anchoring the rest to the
*page* rather than to the sticky element is what stops it riding along: absolute
against the padded wrapper, it scrolls away on its own while the sticky sibling
holds. The row is then two independent decisions instead of one bar that has to
shrink, and the persistent half can be a capsule rather than a plate.
```css
.wrap  { position: relative }
.brand { position: absolute; top: 21px; left: var(--gutter); z-index: 21 }
.tabs  { position: sticky; top: 4px; margin-left: auto; z-index: 20 }
```
⚠ The two overlap at the narrowest widths — the absolute half is out of flow and
cannot push. Reserve its box with `padding-inline-start` on the sticky row below
the width where they collide, or it steals the first tab's tap.
