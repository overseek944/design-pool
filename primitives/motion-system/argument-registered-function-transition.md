---
id: argument-registered-function-transition
category: motion-system
tags: [custom-property,registered-property,transition,clip-path,interpolation,architecture]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A CSS function interpolates only between the same shape in compatible units, so
`circle(0px at …)` to `circle(150% at …)` holds and then snaps, and no keyframe
rewrite fixes a px-against-percent mix. Register the argument instead and
transition *that*: the engine interpolates a typed value and re-resolves the
function every frame, so one class toggle drives a shape keyframes cannot reach.
The same lever opens a gradient stop or a filter amount. Radius 0 to 150–220%
of the box, 0.6–1.1s.

```css
@property --r { syntax: "<length-percentage>"; inherits: false; initial-value: 0px }
.sheet { clip-path: circle(var(--r) at var(--cx) var(--cy));
         transition: --r .9s cubic-bezier(.87, 0, .13, 1) }
.sheet[data-open="true"] { --r: 150% }
```
⚠ Unregistered it is an untyped token — the shape jumps at the end of the
duration. A percentage radius resolves against the box diagonal, so an origin
near a corner needs 200%+ to clear the far edge.
