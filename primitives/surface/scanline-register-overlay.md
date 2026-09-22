---
id: scanline-register-overlay
category: surface
tags: [overlay,scanline,texture,video,register,decoration]
axes: {energy: 1, density: 3, weight: 2, finish: 2}
cost: 1
seen: 4
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

On a dark ground the ruling can be *light* and alive: lines at 10–20% white under
`mix-blend-mode: screen`, layer opacity .06–.12, and the pseudo-element
translated down by exactly one period on a linear loop, extended upward by that
same period so the top never shows a gap. It reads as a refresh, not as a
texture. Period 5–8px, loop 2–4s.
```css
.lines::before { inset: calc(-1 * var(--p)) 0 0; animation: scan 2.5s linear infinite;
  background: repeating-linear-gradient(#fff3 0 1px, #0000 1px var(--p)) }
@keyframes scan { to { transform: translateY(var(--p)) } }
```
⚠ A full-viewport moving ruling is perpetual peripheral motion — stop it under
reduced motion and on small screens, where it also costs a composited layer.

Static and nearly subliminal, the ruling marks a still as sensor output rather
than photography: light 1px lines on a 3px period, `mix-blend-mode: overlay`,
layer opacity .04–.08, per figure rather than across the page. At that dose it
is felt, not seen, and needs no brightness compensation.
