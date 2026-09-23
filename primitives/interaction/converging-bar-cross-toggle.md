---
id: converging-bar-cross-toggle
category: interaction
tags: [interaction,toggle,menu,icon,glyph,morph,transform]
axes: {energy: 2, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A three-bar menu glyph can become its own close mark. The outer bars travel
to the middle bar's line and rotate ±45° about their own centres while the
middle one fades, so open and close read as one object folding rather than
two icons swapping. Travel is exactly bar thickness plus gap.
Bars 1.5–2px, gap 4–6px, 180–260ms.

```css
.bars span { height: var(--t); transition: transform .22s, opacity .15s }
[aria-expanded=true] .bars span:first-child { transform: translateY(calc(var(--t) + var(--g))) rotate(45deg) }
[aria-expanded=true] .bars span:nth-child(2) { opacity: 0 }
[aria-expanded=true] .bars span:last-child  { transform: translateY(calc(-1 * (var(--t) + var(--g)))) rotate(-45deg) }
```
⚠ List translate before rotate, or the travel follows the tilted axis. The button keeps its
own name and `aria-expanded`.
