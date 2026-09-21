---
id: scanline-register-overlay
category: surface
tags: [overlay,scanline,texture,video,register,decoration]
axes: {energy: 1, density: 3, weight: 2, finish: 2}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Footage from mismatched sources — an archive still, a head camera, a wrist
camera — reads as a scatter of clips until something says all of it is being
*monitored*. One repeating gradient over the whole array does that for the cost
of a single background-image: a dark line every few pixels, never a tint, so
nothing shifts hue and the ruling survives a two-colour register. Period 3–5px,
line alpha 0.08–0.20. Give the footage back 4–8% brightness to pay for what the
ruling takes.

```css
.feed::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(#0000 0 3px, #0000002e 3px 4px) }
```
⚠ At fractional device pixel ratios the period beats against the pixel grid and
drifts into wide bands — check 1.25× and 1.5×, and drop the layer entirely
under `prefers-contrast: more`.
