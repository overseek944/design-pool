---
id: glow-spined-pass-bar
category: light
tags: [light,glow,sweep,box-shadow,loop,cheap]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 3
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

Where the panel is a backdrop rather than a work surface, drop the spine: a
band 30–45% of the panel's height, fading to transparent at both edges at
6–10% peak alpha, reads as a slow scan rather than a pass. Fade the band's own
opacity in over the first 10% of travel and out over the last, so it never
appears or vanishes at an edge. 6–9s; it should be noticed on the second look.
```css
.scan::after { content: ""; position: absolute; inset-inline: 0; height: 40%;
  background: linear-gradient(#0000, rgb(from var(--c) r g b / .08), #0000);
  animation: scan 7s ease-in-out infinite }
```
⚠ Stacked over several panels at once the scans fall into phase and the page
pulses — stagger their delays or let only one run in view.
