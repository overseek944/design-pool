---
id: argument-registered-function-transition
category: motion-system
tags: [custom-property,registered-property,transition,clip-path,interpolation,architecture]
axes: none
cost: 2
seen: 3
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

The same registration is the only way to turn a conic gradient without turning
its box. Register `<angle>`, feed it to `from`, and animate it linear-infinite:
the paint sweeps while the element's mask, blur radius and blend context all sit
still — rotating the element instead drags every one of those round with it, and
a directional fade stops fading downward. Period 60–140s reads as weather; under
20s it reads as a spinner.
```css
@property --sweep { syntax: "<angle>"; inherits: false; initial-value: 0deg }
.aurora { background: conic-gradient(from var(--sweep) at 50% 50%, …);
          animation: turn 100s linear infinite }
@keyframes turn { to { --sweep: 360deg } }
```
⚠ Registered properties animate on the main thread — a viewport-sized conic
under a 70px blur repaints every frame. Keep it to one, cap the layer's size,
and retire it under `reduce` rather than slowing it.
