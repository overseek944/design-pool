---
id: blurred-conic-hue-bloom
category: light
tags: [gradient,glow,bloom,hue,conic,decoration,ambient]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
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
