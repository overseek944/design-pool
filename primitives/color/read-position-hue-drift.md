---
id: read-position-hue-drift
category: color
tags: [color,scroll,ambient,gradient,filter]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 2
seen: 3
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

Variant — stepped, no script: give each section its own ground on a monotonic
lightness ladder instead of one rotating layer. Five to seven rungs, 1–3% L apart
in OKLCH at fixed hue, so each boundary reads as a descent rather than a new
surface. Holds under reduced motion for free, and nothing inside is filtered.
⚠ Rungs closer than ~1% L disappear on uncalibrated panels; mark each seam with
a hairline so the step survives.

Variant — no layer at all: one `linear-gradient` on the page-length wrapper,
stops placed at content milestones (neutral → warm → cool), the last stop set
past 100% (110–130%) so the final hue is approached, never landed. Zero script,
zero repaint; stops drift if section heights change, so keep 3–5 of them.
