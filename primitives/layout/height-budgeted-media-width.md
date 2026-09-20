---
id: height-budgeted-media-width
category: layout
tags: [layout,container-query,aspect,fit,cls]
axes: none
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
When a card must fit one screen exactly — media plus chrome, nothing clipped —
width is the derived quantity, not the given one. Declare the chrome height as
a token, make the scroller a *size* container, and solve for width from
container height: subtract the chrome, multiply by the media ratio. Clamp both
ends. Chrome budget 8–12rem.

```css
.scroller { container: feed / size; --chrome: 10rem }
.card { width: clamp(22rem, (100cqh - var(--chrome)) * 16 / 9, min(40rem, 100%)) }
```
⚠ `container-type: size` needs a definite height from the layout above and
cannot be sized by its contents. The token is a promise: one extra line
inside the chrome and the card no longer fits.

A fixed-ratio stage — a square canvas, a 16:9 plate — resolves the same budget in
one `min()` with no container at all, because the ratio lets a single length
answer for both axes: the smaller of a width fraction, an absolute ceiling and a
height fraction. It cannot overflow either axis and needs no breakpoint; the term
that binds simply changes as the viewport does.
```css
.stage { --size: min(76vw, 640px, 76dvh); inline-size: var(--size); aspect-ratio: 1 }
```
⚠ `dvh` resolves against the *dynamic* viewport, so the stage resizes as mobile
chrome retracts and anything measured from it has to follow; `svh` holds still at
the cost of permanently reserving that chrome.

The budget need not cost a container at all. Where the slot already carries an
`aspect-ratio`, only one axis has to be solved: put the chrome allowance in the
middle term of a `clamp()` against `svh` and let the ratio derive the other
side. No `container-type: size`, so nothing above has to supply a definite
height, and the floor and ceiling are the same two promises made in one
declaration. Chrome budget as a rem sum of the stack above it, floor low enough
that the media survives a landscape phone.
```css
.slot { aspect-ratio: 9 / 16; max-inline-size: 86vw;
        block-size: clamp(12rem, 100svh - 27rem, 48rem) }
```
⚠ The rem term is a hand-tallied sum of everything sharing the fold — it does
not track a heading that wraps to a third line at some width. Audit at the
narrow end, where the wrapping happens and the clamp is already at its floor.
