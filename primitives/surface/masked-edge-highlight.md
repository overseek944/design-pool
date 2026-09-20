---
id: masked-edge-highlight
category: surface
tags: [surface,border,light,mask,detail]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: [emitted-light-not-borders]
---
A hairline that is bright at one point and fades to nothing around the rest of
the ring, so a flat panel reads as catching light from a fixed direction. Draw
the border on an inset pseudo-element with `border: inherit`, then mask that
element with a radial ellipse. The plateau stop holds full strength before the
falloff begins; moving the centre re-aims the light. Plateau 0–20%, falloff
80–100%.

```css
.panel::after {
  content:""; position:absolute; inset:0; pointer-events:none;
  border:inherit; border-radius:inherit;
  mask: radial-gradient(ellipse var(--hi-w,20%) var(--hi-h,30%)
    at var(--hi-x,0) var(--hi-y,0),
    #000 0, #000 var(--hi-plateau,0%), transparent var(--hi-falloff,90%));
}
```
⚠ Not a contrast-bearing edge — on the far side the border is invisible, so never let it be the only thing separating an interactive control.
