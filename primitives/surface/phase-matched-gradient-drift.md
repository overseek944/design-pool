---
id: phase-matched-gradient-drift
category: surface
tags: [surface,gradient,loop,ambient,background]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
An oversized gradient translated behind its box gives a ground ambient motion
with no canvas and no script — but only if the loop closes. Make the stop list
repeat across the element, the same hues twice over a 200% width, and translate
by exactly one repeat: the frame at 100% is then identical to the frame at 0%
and there is no seam to see. Where the stops do not divide evenly, alternate the
direction instead — a ping-pong never wraps, so it never has a seam to hide.
```css
.ground::after { position: absolute; inset: 0 auto 0 0; width: 200%;
  background: linear-gradient(106deg, var(--a) 0, var(--b) 50%, var(--a) 100%);
  animation: drift 20s linear infinite }                  /* 12–40s */
@keyframes drift { to { transform: translateX(-50%) } }
```
⚠ Give the parent `overflow: clip` or the page gains a horizontal scrollbar.
Perpetual ambient motion needs a reduced-motion branch — drop to the 0% frame.

The same rule holds for a ruled hairline pattern, and there it decides whether
the lines stay lines. Animating `background-position` re-rasterises the
gradient at a new sub-pixel phase every frame, so hairlines shimmer and change
weight as they move; translate a pseudo-element painted once instead, overhung
by one pitch each side, and move it exactly one pitch. Where the colour must
change, paint a flat fill through a static `mask-image` of the rules — the mask
never re-rasterises. Pitch 4–10px, rule 1–2px, 1.5–4s per pitch.
```css
.rules::before { inset: -2px calc(var(--pitch) * -1); will-change: transform;
  background: currentColor; mask: repeating-linear-gradient(90deg, #000 0 var(--w), #0000 var(--w) var(--pitch));
  animation: step 2s linear infinite }
@keyframes step { to { transform: translateX(calc(var(--pitch) * -1)) } }
```
⚠ A promoted layer rounds to whole device pixels while its box may not — overhang vertically too, and let the parent clip.
