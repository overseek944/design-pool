---
id: proxy-painted-native-control
category: interaction
tags: [accessibility,focus,forms,input,correctness,keyboard]
axes: none
cost: 1
seen: 3
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
