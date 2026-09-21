---
id: overhung-skew-fill-sweep
category: reveal
tags: [reveal,interaction,motion,detail,effect]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Fill a control on hover behind a slanted edge, not a straight one: an
oversized pseudo-element, skewed, travelling on `transform`. The lean
displaces each end by `height × |tan(skew)| ÷ 2`, so the horizontal overhang
must exceed that or a triangle of the ground shows in the corners at rest and at
travel's end. Overhang 10–20% per side, lean 25–40°, 0.3–0.5s.

```css
.btn::before { content:''; position:absolute; inset:0 -12%;
  transform:skew(150deg) translateX(-110%); transition:transform .4s cubic-bezier(.3,1,.8,1) }
.btn:hover::before { transform:skew(150deg) translateX(0) }
```
⚠ Repeat both functions in the same order in both states — skew-only to
translate-only decomposes the matrix and the slant flattens mid-sweep. The
required `overflow:hidden` clips a focus ring, so put the ring on `outline`
with a positive `outline-offset`.

The straight-edged sweep needs no element at all, which answers the ⚠ above:
paint the incoming colour as a single-colour `linear-gradient` over the resting
`background-color` and transition `background-size` from `0 100%`. Nothing
overflows, so nothing has to be clipped and the focus ring keeps a positive
offset. `background-position` picks the edge it grows from — `0` left, `100% 0`
right, `50%` opens from the centre. 0.3–0.5s.
```css
.btn { background-color: var(--out); background-size: 0 100%; background-repeat: no-repeat;
  background-image: linear-gradient(var(--in), var(--in)); transition: background-size .42s var(--wipe) }
.btn:hover { background-size: 100% 100% }
```
⚠ `background-size` repaints the control every frame where the skewed sweep
composites a transform. Fine on one button, wrong on a grid of forty.
