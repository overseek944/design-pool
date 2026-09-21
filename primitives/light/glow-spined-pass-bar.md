---
id: glow-spined-pass-bar
category: light
tags: [light,glow,sweep,box-shadow,loop,cheap]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A light crossing a panel whose content does not change says the region is being
worked on — which a sheen (the surface is glossy) and a wipe (something
arrived) both say differently. Build it as a 1–2px element whose `box-shadow`
blur is 10–20× its own thickness: the bloom is the entire read and the line is
only its spine. Fade the line's own fill to transparent at both ends so it has
no hard cap and never reads as a rule that came loose. Crossings of 3–6s.

```css
.pass { position: absolute; inset-inline: 0; height: 2px; opacity: 0;
  background: linear-gradient(90deg, #0000, var(--c) 30% 70%, #0000);
  box-shadow: 0 0 24px 6px rgb(from var(--c) r g b / .35) }
```
⚠ Animate `translate`, never `top` — travel that far relayouts the panel every
frame. A `filter: blur()` in place of the shadow buys the same softness for a
full-width offscreen buffer.
