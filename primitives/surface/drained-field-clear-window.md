---
id: drained-field-clear-window
category: surface
tags: [surface,mask,backdrop-filter,focus,attention,de-emphasis]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Direct attention by de-emphasising everything else: a full-bleed overlay whose
`backdrop-filter` drains colour and sharpness, with a soft-edged hole punched in
its own mask so one region stays untouched. Desaturation reads as "not now" far
more reliably than blur alone and costs no legibility inside the window. Move the
hole and attention moves with it — the content underneath is never altered.
Blur 1.5–4px, hole radius 60–120px, feather over 2–5% of the stop pair.
```css
.wash { position: absolute; inset: 0; backdrop-filter: grayscale(1) saturate(0) blur(3px);
  mask-image: linear-gradient(#000 0 0), radial-gradient(circle var(--r,76px) at var(--x) var(--y), #000 61%, transparent 63%);
  mask-composite: exclude }
```
⚠ Ship the `-webkit-mask-*` pair or Safari fills the hole. A backdrop filter over
a large area is real compositor cost — one such layer per view, not per card.
