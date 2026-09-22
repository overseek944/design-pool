---
id: offframe-apex-ray-fan
category: light
tags: [gradient,conic,ground,atmosphere,ambient,cheap]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A radial wash gives light a direction but no structure. A repeating conic
gradient whose apex sits just outside the frame gives it rays: the angular
period draws evenly spaced spokes, and because the convergence point is off-
canvas they read as divergent beams rather than as a pinwheel. The transparent
run must dominate the tinted one or the ground turns to stripes. Apex 105–125%
past the edge, period 5–9deg with the tint holding 8–15% of it, alpha .10–.22.

```css
.ground::before { content:""; position:absolute; inset:0; pointer-events:none;
  background-image: repeating-conic-gradient(from 180deg at 50% 112%,
    #0000 0deg 5.5deg, var(--ray) 6deg, #0000 6.5deg) }
```
⚠ Sub-degree stops alias into visible stair-stepping on the long rays; keep the
tinted band at least 0.5deg. Purely decorative — mark it `aria-hidden` and let
it vanish under `forced-colors`.

Centre the apex and hollow it instead, and the spokes become texture rather
than beams. A 1–2deg period at even duty in a pale tint, laid over a coloured
bloom and masked by a radial gradient clear at the core, draws a fine striation
that thickens toward the rim — the colour appears combed, not lit. Mask core
clear 15–30%, layer opacity .2–.4.
```css
.disc { border-radius:50%; opacity:.3;
  background: repeating-conic-gradient(#0000 0 1deg, #fffc 1deg 2deg);
  mask-image: radial-gradient(circle, #0000 20%, #000 100%) }
```
⚠ At this period the spokes fall below a pixel near the centre and moiré — the
hollow mask exists to hide exactly that region.
