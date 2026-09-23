---
id: corner-split-hue-shadow
category: light
tags: [shadow,glow,hue,halo,box-shadow,decoration]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Four shadows, each pushed diagonally toward its own corner in its own hue,
wrap a card in a rim whose colour changes around the perimeter — neighbours
mix along each edge. A gradient halo from one `box-shadow` list: no extra
element, no filter, follows the radius. Offset 4–10px, blur 16–32px, alpha
.15–.3; keep hues near-equal in lightness or one corner dominates.

```css
.shot { box-shadow: -6px -6px 20px rgb(var(--h1) / .25), 6px -6px 20px rgb(var(--h2) / .25),
                    -6px 6px 20px rgb(var(--h3) / .25), 6px 6px 20px rgb(var(--h4) / .25) }
```
⚠ Never transition the list — four blurs repaint every frame; fade a wrapper
instead. On dark grounds the hues must out-light the surface or read as dirt.
