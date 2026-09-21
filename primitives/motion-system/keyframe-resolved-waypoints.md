---
id: keyframe-resolved-waypoints
category: motion-system
tags: [motion,keyframes,custom-properties,architecture,choreography]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 8
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
