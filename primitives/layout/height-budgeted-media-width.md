---
id: height-budgeted-media-width
category: layout
tags: [layout,container-query,aspect,fit,cls]
axes: none
cost: 2
seen: 11
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

The derived quantity need not be a length the box takes; it can be the type
inside it. Publish the copy that must share the fold as a height budget,
subtract it from the space available, and divide by the face's height-to-size
ratio to get a `font-size` — then `min()` that against an ordinary width-fluid
clamp so whichever axis is scarcer binds. The display line gives up the fold
before the copy does, which is the right order once the whitespace in the stack
has already surrendered. Ratio 1.6–2.0 for a two-line block; measure it once.
```css
--copy: 11.25rem;                          /* what must survive below it */
--word: min(clamp(2.75rem, 10vw, 12rem), calc((var(--stage) - var(--copy)) / 1.9));
```
⚠ The ratio belongs to that face at that leading and line count — a wrap to a
third line overruns the budget with no warning. Floor the clamp above the point
where the display size drops under the body size, or the hierarchy inverts on a
landscape phone.

A ratio is not always the relation wanted. Where the budget is a judgement —
"at 1000px tall this figure should be 1040 wide, at 700px it should be 880" —
fit a line through the two anchors instead and write it straight into the
length: `max()` supplies the floor, `min(100%, …)` the ceiling, and the slope
is the one term nobody has to reason about again. It needs no container, no
breakpoint and no measurement, and it is legible as two design decisions rather
than as a coefficient.
```css
/* (700svh→880px, 1000svh→1040px) → slope .533, intercept −5.33rem */
.figure { max-inline-size: min(100%, max(880px, 53.3svh - 5.33rem)) }
```
⚠ Leave the two anchor pairs in a comment. The coefficients are unreadable and
the next edit is otherwise an algebra problem — and `svh` under a tall phone
chrome resolves to a height no desktop anchor was fitted against, so gate the
whole rule behind a pointer-and-keyboard width.

The same `min()` resolves against a *container* rather than the viewport, which
is what a fixed-ratio preview inside a resizable panel needs: `100cqw` for the
width term, `100cqh` times the ratio for the height term, `aspect-ratio`
deriving the other side. The frame then fits whichever axis of the panel is
scarcer while a splitter is dragged, with no observer and no breakpoint.
```css
.panel { container-type: size }
.frame { aspect-ratio: 16 / 9; max-inline-size: 100%;
         inline-size: min(100cqw, 100cqh * 16 / 9) }
```
⚠ `cqh` needs `container-type: size` on the panel, so the panel's height must
come from the layout above it — sized by its contents instead, every `cqh` term
resolves to zero and the frame collapses to nothing.
