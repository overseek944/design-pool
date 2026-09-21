---
id: scheduled-discrete-property-step
category: timing
tags: [transition,stacking,scheduling,hover,precision]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A stacking change has no in-between, so naming `z-index` in a transition flips
it the instant state changes: a card lifting toward the reader jumps in front
before it has moved. Give the property `0s` duration and a *delay* instead and
the flip lands on a frame you chose, partway into the transform beside it.
Delay 35–55% of the moving duration, asymmetrically per state, so the swap
hides inside the fastest part of the travel. `visibility` takes the same
schedule, and `display` under `transition-behavior: allow-discrete`.

```css
.card       { transition: transform .45s cubic-bezier(.22,1,.36,1), z-index 0s .2s }
.card:hover { transform: translateY(-12px); z-index: 2;
              transition: transform .45s cubic-bezier(.22,1,.36,1), z-index 0s }
```
⚠ Hit-testing follows the real value, not the scheduled one: until the delay
fires the pointer lands on whatever is nominally on top. Never delay a stacking
swap under a control about to be clicked.
