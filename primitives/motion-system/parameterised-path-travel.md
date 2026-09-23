---
id: parameterised-path-travel
category: motion-system
tags: [motion,loop,ambient,diagram,css-only]
axes: {energy: 3, density: 3, weight: 1, finish: 4}
cost: 2
seen: 14
requires: []
conflicts: []
completes: []
tension: []
---
One keyframe animating `offset-distance` from 0% to 100% drives any number of
travellers along any number of *different* routes, because the route is a
custom property rather than part of the animation. Period and delay arrive the
same way, so a schematic with a dozen flows costs one rule plus one declaration
per node — no scheduler, no path arithmetic, no library. Fade in over the first
6–10% and out over the last 15–25% so nothing pops at an endpoint, and shrink
toward the destination to read as distance. Periods 4–9s, linear.

```css
.mote { offset-path: var(--route); offset-rotate: 0deg; offset-anchor: center;
        animation: travel var(--dur, 6.5s) linear var(--delay, 0s) infinite }
@keyframes travel { 0% { offset-distance: 0%; opacity: 0 } 8% { opacity: 1 }
  78% { scale: .8 } to { offset-distance: 100%; opacity: 0; scale: .3 } }
```
⚠ Gate it twice — `@supports (offset-path: path("M0 0 H 1"))` inside
`prefers-reduced-motion: no-preference`. Without the feature query every
traveller stacks at its untransformed origin instead of not appearing.

A linear traversal reads as traffic — constant speed says the route is a
conveyor. Where the path *converges* on something, shape the parameter rather
than the clock: raise it to a power before evaluating position, so the traveller
creeps at the origin and accelerates into the destination, and the geometry
reads as attraction instead of transport. Exponent 1.4–2; above ~2.5 the first
half stops moving perceptibly. The clock stays `linear`, so period and phase
offsets remain independent of the shaping.
```js
const d = Math.pow(phase, 1.7)              // phase linear, distance shaped
el.style.offsetDistance = d * 100 + '%'
```
⚠ Shape the parameter in one place only. A power curve on top of a non-linear
easing compounds into a near-stop at the origin that reads as a stalled element.

On a *closed* path the phase cannot come from `animation-delay`: a delayed
traveller parks at its origin until the delay elapses, so a ring of a dozen
spends its opening seconds as a clump at one point. Put the phase in the
distance instead — animate from `var(--start)` to `calc(var(--start) + 100%)` —
and every element is already distributed around the loop on frame one, each
crossing the seam at a different moment. Periods 25–60s to read as drift.
```css
.orbiter { offset-path: ellipse(var(--rx) var(--ry) at 50% 50%); offset-rotate: 0deg;
           animation: orbit var(--dur, 40s) linear infinite }
@keyframes orbit { from { offset-distance: var(--start, 0%) }
                   to   { offset-distance: calc(var(--start, 0%) + 100%) } }
```
⚠ The reduced-motion branch must pin each element to its own `var(--start)`.
`animation: none` alone collapses the whole constellation onto one point.

`offset-path: path()` is authored in absolute user units, so a route eyeballed
against a 1440px hero is wrong at every other width and the travellers drift off
the artwork they were drawn on. Where the route must rescale with its box, drop
`offset-path` and animate `top`/`left` as *percentages* of the positioned
parent, two or three waypoints held as per-instance custom properties. The route
is then relative by construction — at the cost of laying out each traveller
every frame, which is fine for a handful of 4–6px marks and never for a field.
```css
.mote { top: var(--y0); left: var(--x0); animation: travel var(--dur) infinite }
@keyframes travel { 0%, to { top: var(--y0); left: var(--x0); opacity: 0 }
  25% { top: var(--y1); left: var(--x1); opacity: 1 } }
```
⚠ `top` is a percentage of the parent's height and `left` of its width, so a
parent whose aspect ratio changes shears the route. Lock the ratio, or the
waypoints only hold at the shape they were picked at.

Absolute user units are the objection the variant above answers by giving
`offset-path` up. It can be answered without that: measure the two boxes the
route joins, emit the `path()` string from their live geometry, and write it to
the same custom property inside a `ResizeObserver`. The declaration never
changes, only the string, so every traveller on it keeps its keyframe — or takes
a scrubbed scalar in `offset-distance` instead. Round to one decimal, and turn
each elbow with a quadratic 8–16px in from the corner so nothing snaps through a
right angle.
```js
const d = `M ${r(ax)} ${r(ay)} L ${r(ax)} ${r(by - 12)} Q ${r(ax)} ${r(by)} ${r(ax - 12)} ${r(by)} …`
el.style.setProperty('--route', `path("${d}")`)
```
⚠ Observe every box the route touches, not only the wrapper — a sibling that
reflows inside an unchanged width fires nothing on the container, and the path
goes on pointing at where the box used to be.
