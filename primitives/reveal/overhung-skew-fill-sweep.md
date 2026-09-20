---
id: overhung-skew-fill-sweep
category: reveal
tags: [reveal,interaction,motion,detail,effect]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
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
