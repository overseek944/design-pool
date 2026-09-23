---
id: translucent-mat-ring
category: surface
tags: [card, ring, box-shadow, spread, gradient-ground, edge]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

An opaque white card on a tinted gradient ground can take a second edge made of
the ground itself: a zero-blur spread ring of white at 15–35% alpha, 3–6px wide.
It takes the hue beneath it, so the card reads as set into a frosted mat —
edge without ink, lift without shadow.

```css
.card { background: #fff; border-radius: 12px;
  border: 1px solid rgb(6 27 76 / .04);
  box-shadow: 0 0 0 4px rgb(255 255 255 / .25) }
```
⚠ Invisible on a white or very light ground — it needs mid-tone behind it. The
ring occupies `box-shadow`, so a focus style must use `outline`.
