---
id: seat-quantised-ring-turn
category: motion-system
tags: [radial,rotation,counter-rotation,custom-property,loop]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 3
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

The same paired rotation runs perpetually rather than terminally: identical
duration, `linear`, `infinite`, the child's keyframe the negation of the
ring's. Logos, faces and labels then orbit without ever tipping, and nothing
needs untwisting per frame. Two rings at unrelated periods — 14s and 22s, not
14s and 28s — read as a mechanism rather than a clock. 10–30s; under 8s the
orbit reads as a spinner.
```css
.ring  { animation: spin var(--p) linear infinite }
.child { animation: spin var(--p) linear infinite reverse }
@keyframes spin { to { rotate: 1turn } }
```
⚠ Two compositor tickets per orbiting child, and the pair only stays in phase
while both start together — anything that restarts one animation alone
(a class toggle, a re-render that re-declares it) tips every child permanently.

Place each child with the individual `rotate`/`translate` properties, not
`transform`: a counter-spin keyframe written on `transform` replaces the
placement, so every node collapses to the centre unless the keyframe repeats
`translate(-50%, calc(-1 * var(--r))) rotate(calc(-1 * var(--a)))` ahead of the
spin. Pausing on hover is safe only if one rule pauses ring and children
together. Radius as a `clamp()` token, 8–18rem.
```css
.orbit:hover :is(.ring, .child) { animation-play-state: paused }
```
