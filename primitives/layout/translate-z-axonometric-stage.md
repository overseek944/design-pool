---
id: translate-z-axonometric-stage
category: layout
tags: [3d,depth,diagram,transform,stage]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 3
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A cutaway model — floor, walls, shelving, a mover — is buildable from plain
boxes, no renderer. Rotate one `preserve-3d` container to a fixed
axonometric angle, then place each part in plan coordinates and lift it with
`translateZ`. Height is one number per element, parts occlude
correctly, and everything stays text and hover targets. rotateX 45–60° with rotate −30 to −45°
reads as a model; declare no `perspective`, or near parts balloon.

```css
.stage { transform-style: preserve-3d; transform: rotateX(52deg) rotate(-37deg) }
.stage > * { position: absolute }        /* Z is height */
.wall  { transform: translateZ(94px) }
```
⚠ Every ancestor between stage and lifted part needs `preserve-3d` — one
default `flat` collapses that branch onto the floor.

Lift from the index rather than from a literal per part, and the stage takes any
count: `calc((var(--i) - (var(--n) - 1) / 2) * var(--step))` straddles the
members about the origin so adding one thickens the pile in both directions
instead of pushing it off the frame, and `z-index: calc(10 + var(--i))` from the
same number fixes paint order for the flat children a `preserve-3d` branch
cannot sort. Step 60–140px at stage scale.
```css
.part { transform: translate3d(-50%, -50%, calc((var(--i) - 2) * 110px));
        z-index: calc(10 + var(--i)) }
```
⚠ Centring on the count makes the *front* member's Z depend on how many there
are — a lid, a floor or anything that must stay the nearest thing needs its own
offset past the ladder's top, not a hard number.

A stack of lifted plates reads as layers of one system once something passes
through them. Add one more plate — outline or low-alpha fill — and animate only
its `translateZ` from below the lowest member to above the highest, fading in
over the first 10–15% and out over the last. It reads as a scan sweeping the
model, costs one compositor layer, and needs no knowledge of the plates. Cycle
3–6s, peak alpha .5–.8.
```css
.scan { animation: scan 4s linear infinite }
@keyframes scan { 0% { transform: translateZ(-150px); opacity: 0 }
  12%, 88% { opacity: .7 } to { transform: translateZ(130px); opacity: 0 } }
```
⚠ Without `preserve-3d` on the scan's parent it paints over every plate instead
of slicing between them.
