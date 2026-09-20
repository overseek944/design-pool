---
id: twinned-elevation-tokens
category: surface
tags: [shadow,elevation,tokens,hover,card]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`box-shadow` interpolates only when both lists carry the same number of layers;
mismatch and the browser hard-swaps at the midpoint, which reads as a flicker
under the card rather than a lift. Ship the raised state as a *twin* of the
resting token — same layer count, blur, spread and colour, y-offset raised on
every layer — and the transition becomes a real rise. 1px per layer is the whole
effect; past 2–3px it reads as a jump rather than a hover.
```css
--lift-0: 0 12px 12px -6px #00000008, 0 6px 6px -3px #00000008, 0 2px 2px -1px #00000008;
--lift-1: 0 13px 12px -6px #00000008, 0 7px 6px -3px #00000008, 0 3px 2px -1px #00000008;
.card { box-shadow: var(--lift-0); transition: box-shadow .16s ease-out }
@media (hover: hover) { .card:hover { box-shadow: var(--lift-1) } }
```
⚠ A shadow change is invisible in forced-colors and to low-vision readers —
carry the state in a border or colour too.
