---
id: polygon-band-sparkline
category: surface
tags: [surface,chart,sparkline,clip-path,decoration,css]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A decorative trend glyph needs no SVG: clip a filled pseudo-element to a
polygon that walks the line's vertices left to right, then walks back offset
3–6% lower. The result is a thin band that takes `background`, gradients and
theme tokens like any box. Stack two at different alpha for a primary and a
comparison series. 8–12 vertices.

```css
.spark::before { content: ''; position: absolute; inset: 0; background: var(--accent);
  clip-path: polygon(0 72%, 30% 42%, 60% 30%, 100% 8%,   100% 13%, 60% 35%, 30% 47%, 0 78%) }
```
⚠ The offset is vertical, so steep segments render thinner than flat ones —
keep slopes shallow. Decorative only: `aria-hidden`, and never for real data.
