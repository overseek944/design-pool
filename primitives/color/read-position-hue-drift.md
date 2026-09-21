---
id: read-position-hue-drift
category: color
tags: [color,scroll,ambient,gradient,filter]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A long page reads as one undifferentiated field when every section shares a
ground. Publish document progress as a 0–1 scalar and spend it as a hue rotation
on a single fixed ambient layer beneath everything: the page warms as the reader
descends, so position is felt rather than marked and no section needs a colour
of its own. Rotation 10–25deg over the whole document; past 30deg the palette
changes identity.

```css
.ground { position: fixed; inset: -6vh 0; z-index: 0; pointer-events: none;
  transform: translateY(calc(var(--p, 0) * -4vh));
  filter: hue-rotate(calc(var(--p, 0) * 16deg)) }
```
⚠ The filter rotates every hue in the layer, so nothing with fixed identity — a
logo, a chart, a photograph — may live inside it, and the whole fixed layer
repaints on each write. Coalesce `--p` in rAF; hold it still under
`prefers-reduced-motion`.
