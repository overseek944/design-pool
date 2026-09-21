---
id: seat-quantised-ring-turn
category: motion-system
tags: [radial,rotation,counter-rotation,custom-property,loop]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: [ring-placed-upright-labels]
---
A radial arrangement built by rotating an arm out of the centre tips every child
with it, and untipping each costs a second rotation. Take that cost when the ring
has to *move*: drive both from one custom property — the ring by `+turn`, every
child by `−turn` — and they cannot drift, because there is one number. Make the
turn exactly `360°/n` and the move is terminal. Each item lands in its
neighbour's seat, upright, and the end state is identical to the start, so it
runs once with `both` and needs no loop, reset or reverse. 6–12s.

```css
.ring  { --turn: calc(360deg / var(--n)); animation: turn var(--d) var(--ease) both }
.label { animation: untwist var(--d) var(--ease) both }
@keyframes turn    { to { rotate: var(--turn) } }
@keyframes untwist { to { rotate: calc(-1 * var(--turn)) } }
```
⚠ An identical end state also means the move demonstrates nothing — it reads as
a mechanism idling. Two rotations per child; keep `n` under about twelve.
