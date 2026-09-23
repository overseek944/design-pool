---
id: blurred-conic-hue-bloom
category: light
tags: [gradient,glow,bloom,hue,conic,decoration,ambient,metal,material]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Radial lamps give one hue each and seam where they meet. A conic gradient
cycling three to four hues and closing on its first stop gives colour by angle
instead: blurred hard, it becomes one bloom whose every side is a different hue,
seamless. Rotate `from` to choose which hue faces the copy. Blur 60–100px,
opacity .12–.25, box 500–900px, heavily rounded so no corner survives the blur.

```css
.bloom { position:absolute; inset:0; border-radius:100px; opacity:.2;
  filter: blur(80px); pointer-events:none;
  background: conic-gradient(from 180deg, var(--h1), var(--h2) 90deg,
    var(--h3) 180deg, var(--h4) 270deg, var(--h1)) }
```
⚠ The blur buffer is the box plus the radius on every side — never animate it.
Decorative only; `aria-hidden`.

Variant — drop the hue and alternate *value* instead: five or six near-greys,
light and dark in turn, off-centre at 30–40% and blurred 24–40px, read as the
smeared reflections of polished metal rather than as light. Oversize the layer
20–30% a side and tilt it 5–12° so no stop lines up with the box, then multiply
a hairline `repeating-linear-gradient` at 2–4% alpha over it for the grain. A
procedural cover with no asset; invert the ramp per theme.
```css
.plate::before { inset: -28%; filter: blur(34px); transform: rotate(-8deg);
  background: conic-gradient(from 210deg at 36% 42%, #fff, #c8c7c2 88deg,
    #f2f1ed 154deg, #aaa9a3 232deg, #dedcd6 298deg, #fff) }
```
