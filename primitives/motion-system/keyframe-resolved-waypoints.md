---
id: keyframe-resolved-waypoints
category: motion-system
tags: [motion,keyframes,custom-properties,architecture,choreography]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 18
requires: []
conflicts: []
completes: []
tension: []
---
A `@keyframes` block is document-global and takes no arguments, so a route with
literal coordinates serves exactly one element — the usual escape is generating
a block per instance. Declaration values inside keyframes resolve against the
*animating* element, so write every stop as `calc()` over named waypoint
properties and one block drives every instance, each setting its own
destinations. Fold a scale scalar into the same expression and the route tracks
a resized stage for free.

```css
.node { --x1: 40px; --y1: 12px; --k: 1; animation: hop 10s linear infinite }
@keyframes hop {
  0%,18% { transform: translate(calc(var(--x1) * var(--k)), calc(var(--y1) * var(--k))) }
  20%,38% { transform: translate(calc(var(--x2) * var(--k)), calc(var(--y2) * var(--k))) }
}
```
⚠ The properties are read at each stop, not interpolated — rewriting one
mid-cycle jumps unless it is `@property`-registered. Unregistered, an invalid or
missing waypoint drops the whole declaration and the element sits at its base
transform rather than failing visibly.

The same document-global rule is a silent trap in the other direction: an
`animation` written into a `style` attribute resolves its name against global
keyframes only, and every build-time scoping layer — CSS Modules, styled-jsx,
scoped SFC styles — rewrites `@keyframes` names. The reference then matches
nothing, and there is no error: the element simply sits still. Emit the keyframes
unscoped beside the component and namespace the name by hand, or move the
`animation` into the scoped class where the rename reaches both halves.
```jsx
<style>{`@keyframes card-in { from { opacity: 0 } }`}</style>
<li style={{ animation: `card-in ${240 + i * 60}ms ease-out both` }} />
```
⚠ Hand-namespaced globals collide across components — prefix by owner, not by
effect, or the second `fade-in` on the page silently wins.

Ship the motion preference in that same unscoped block, keyed to an attribute
the component writes on every node it animates. The reduced-motion branch then
travels with the keyframes instead of living in a global stylesheet that a
later extraction leaves behind, and one rule retires the whole component
wherever it is mounted.
```css
@media (prefers-reduced-motion: reduce) { [data-x-anim] { animation: none !important } }
```
⚠ `animation: none` holds each element at its authored base style, so anything
whose resting position is a keyframe stop — a ring seeded mid-cycle, a member
placed by its 0% frame — collapses to the middle unless the base style is the
finished pose.

Where the elements differ only in *pose*, the stops need not name waypoints at
all — scale the rest-state properties. Each member already carries the `--rot`,
`--tx` and `--ty` that place it, so a keyframe multiplying those by 1.3–1.8 at
its midpoint makes every member breathe about its own resting position from one
block, and the 0%/100% stop is a copy of the base declaration. A fanned stack, a
scattered field and a tilted row all animate off the same six lines.
```css
@keyframes spread { 0%, 100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) }
  50% { transform: translate(calc(var(--tx) * 1.55), calc(var(--ty) - 2px))
                   rotate(calc(var(--rot) * 1.55)) } }
```
⚠ A member at rest pose zero does not move — the amplitude is proportional, so a
centre card with `--rot: 0` sits dead still while its neighbours swing. Give it a
small non-zero rest value or animate an additive term beside the multiplier.

Where the stops are *poses* rather than coordinates, store the entire transform
list in the property and let the stop be a bare `var()`. The block then holds
only structure — which stop, how long, what swaps at the crossing — and the
geometry lives where a media query can reach it, so one route re-tunes for a
narrower stage with no second keyframe block to keep in step. Keep the whole set
in one rule so the poses read as a composition rather than as six numbers.
```css
.stage { --p-far: translate3d(-.9rem,.5rem,-64px) rotate(-1.6deg) scale(.945) }
@media (width < 48rem) {
  .stage { --p-far: translate3d(-.6rem,.4rem,-58px) rotate(-1.2deg) scale(.95) } }
@keyframes recede { to { transform: var(--p-far) } }
```
⚠ Poses are substituted, not interpolated. Two stops naming different properties
tween between whatever those resolve to, so every pose must be a complete list in
the same function order — mismatched lists fall back to a matrix blend and the
rotation takes the short way round.

Document-global also means *name-addressed and last-wins*, which is the only
clean way to upgrade an animation whose values use a unit that may not parse.
A custom property cannot rescue it — an unsupported unit invalidates the whole
declaration, and there is no per-value fallback inside a keyframe. Redeclare the
entire block under a feature query instead and the element, its class and its
`animation` shorthand are untouched: a bar chart authored in px becomes one
authored in container units wherever those resolve.
```css
@keyframes bar { 0%,100% { height: 4px } 50% { height: 16px } }
@supports (height: 1cqw) {
  @keyframes bar { 0%,100% { height: 4cqw } 50% { height: 16cqw } } }
```
⚠ Query a *unit* by using it, not by querying the feature that introduced it —
`container-type` support and container-unit support are separate. Order matters
absolutely: the override must come after, and a later import can silently undo
it.
