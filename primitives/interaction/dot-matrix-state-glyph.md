---
id: dot-matrix-state-glyph
category: interaction
tags: [interaction, icon, toggle, menu, state]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A toggle glyph built from a 3×3 dot grid changes state without changing shape:
the closed state keeps all nine dots, the open state dims the four edge
midpoints so the corners and centre form an ✕. Nothing rotates, so the swap
reads as the same object answering. Draw it as a CSS mask over a
`currentColor` fill and it recolours with the chrome for free.
```css
.toggle::before { content: ""; inset: 0; position: absolute;
  mask: url(dots.svg) center / 1.1–1.4rem no-repeat; background: currentColor }
/* open: the four edge-midpoint dots at opacity .08–.2 */
```
⚠ The glyph is decorative — the button still needs its own name and
`aria-expanded`, and the dim is not the only open cue.
