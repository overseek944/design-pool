---
id: corner-tick-frame
category: surface
tags: [surface,border,frame,detail,currentcolor,precision]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 8
requires: []
conflicts: []
completes: []
tension: []
---
Four short L-marks at the corners instead of a closed border: the eye completes
the rectangle, and what would have read as a box reads as registration on a
drawing. Four no-repeat `linear-gradient`s in `currentColor` on one
pseudo-element cost no extra node and inherit every colour the element already
resolves — hover, inverted section, disabled — without a second rule. Arm
6–14px, at the hairline weight.

```css
.mark::before { content: ""; position: absolute; inset: 0; pointer-events: none;
  --t: linear-gradient(currentColor, currentColor);
  background: var(--t) left top/9px 1px no-repeat, var(--t) left top/1px 9px no-repeat,
    var(--t) right bottom/9px 1px no-repeat, var(--t) right bottom/1px 9px no-repeat }
```
⚠ Decoration, not a focus ring and not a contrast boundary. Below ~6px the arms
read as rendering dirt.

When the arm needs a *shape* the gradient form cannot draw — a stepped
staircase, a taper, an L of uneven weight — author one small path and place it
four times, rotating each copy 90°. One definition still governs all four
corners, so an edit cannot leave three agreeing and one wrong. Offset the marks
outward by half the frame's border width so each straddles the line rather than
sitting inside it, and the bracket reads as clamped onto the frame instead of
drawn within it. `shape-rendering: crispEdges` keeps a stepped arm hard.
```css
.frame > .tick { position: absolute; inline-size: 20px; aspect-ratio: 1;
  inset-block-start: -3px; inset-inline-start: -3px }
.frame > .tick:nth-child(2) { rotate: 90deg;  inset-inline: auto -3px }
.frame > .tick:nth-child(3) { rotate: 180deg; inset-block: auto -3px; inset-inline: auto -3px }
```
⚠ Four nodes instead of none. Worth it only where the arm carries a shape — for
plain hairline Ls the pseudo-element stays cheaper and inherits colour for free.

Two marks on one diagonal, not four: an opposed pair *crops* where four corners
*frame*. Top-left and bottom-right is enough for the eye to close the rectangle,
it halves the paint, and it leaves the other two corners free for a badge, a
counter or an image that overflows the box. Keep the pair on the reading
diagonal or the asymmetry reads as a bug rather than a convention — and note
that the four-layer `background` above already draws exactly this pair; a true
four-corner frame takes eight layers.

Two marks rather than four, and closed rather than open: keep the full border,
then straddle one small square over each end of a single diagonal, filled with
the page background so it punches through the line. The frame stops reading as
registration and starts reading as a *selected object* — those squares are the
handles a drawing tool would put on a selection, and the eye supplies the rest
without a label. 6–10px square, offset outward by half its own size.
```css
.sel::before, .sel::after { content: ""; position: absolute; width: 8px;
  height: 8px; background: var(--canvas); border: inherit }
.sel::before { top: -4px; left: -4px }  .sel::after { bottom: -4px; right: -4px }
```
⚠ All four corners reads as a scatter of dots at small sizes; the diagonal pair
is what makes it a selection. Still decoration — a genuinely selected state has
to be announced, not only drawn.
