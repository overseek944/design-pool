---
id: proxy-painted-native-control
category: interaction
tags: [accessibility,focus,forms,input,correctness,keyboard]
axes: none
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Keep the real `<input>` and paint a sibling. Clip it to a 1×1 rect rather than
hiding it: `display: none` and `visibility: hidden` drop it from the tab order
and the accessibility tree, and `opacity: 0` leaves it clickable on top of your
artwork. The control keeps native keyboard handling, form submission, label
association and screen-reader semantics, while the proxy takes every state
through the adjacent-sibling combinator — checked, disabled and focus never get
mirrored into script. Forward focus explicitly; a ring drawn on the invisible
box is the usual failure.

```css
.sr { position: absolute; width: 1px; height: 1px; clip: rect(0,0,0,0) }
.sr:checked        + .box { background: var(--fill); border-color: var(--fill) }
.sr:focus-visible  + .box { outline: 2px solid currentColor; outline-offset: 2px }
.sr:disabled       + .box { opacity: .6 }
```
⚠ Wrap both in a `<label>` or the proxy is not a hit target. Forced colors
strips the painted fill — put a glyph inside the box, not colour alone.

The adjacent-sibling combinator constrains DOM order: the painted proxy has to
follow the input. Where it cannot — a file input whose drop zone wraps the label,
an icon before the control — hang the state on the wrapper with `:has()` instead
and the two can sit in any order. Same states, same forwarding, no structural
debt.
```css
.field:has(> .sr:focus-visible) .box { outline: 2px solid currentColor;
                                       outline-offset: 2px }
```
⚠ `:has()` on a wrapper matches any descendant that satisfies it — scope the
inner selector with `>` or a nested control lights its parent's proxy too.

`<input type=file>` needs no proxy at all: its button is a real pseudo-element.
Style `::file-selector-button` and the control keeps the native picker, the
keyboard path and the label association with nothing to forward — the one case
where the sibling structure above is pure cost.
```css
input[type=file]::file-selector-button { font: inherit; border: 0;
  padding: .5rem 1rem; background: var(--fill); color: var(--on-fill) }
```
⚠ The pseudo-element inherits no typography, so it renders in the platform UI
face until `font` is set. The filename beside it can be neither styled nor
relabelled, so a design that needs its own wording still wants the proxy.

Where the proxy *is* the artwork — a drag-to-compare picture, a canvas scrubbed
by pointer — the native control should not be clipped to 1×1 but hidden in place
and handed back on focus. `opacity: 0` with `pointer-events: none` keeps it out
of the pointer's way where the clip trick would put it out of reach of the eye
too, and `:focus-visible` restores both, so a keyboard reader gets a real slider
sitting on the thing it drives rather than an invisible one.
```css
.range { position: absolute; inset-block-end: .75rem; opacity: 0; pointer-events: none }
.range:focus-visible { opacity: 1; pointer-events: auto }
```
⚠ Only safe with `pointer-events: none` present — that is the pairing the plain
`opacity: 0` failure above is missing. Both handlers must write one value, or
arrowing the slider and dragging the surface disagree.
