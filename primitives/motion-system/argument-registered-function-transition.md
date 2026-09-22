---
id: argument-registered-function-transition
category: motion-system
tags: [custom-property,registered-property,transition,clip-path,interpolation,architecture]
axes: none
cost: 2
seen: 4
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

Register a bare `<number>` with no unit and the same lever drives a whole
composite. One dimensionless gain feeds a `color-mix` percentage, a shadow's
offset and blur, and a scale — every declaration a `calc()` against it — so a
single transition on the property carries all of them on one curve and no
channel can drift from another. Keep the derived properties *out* of the
transition list: eased twice, each chases a target that is itself still moving
and the settle flattens to well past the stated duration. 0.2–0.5s.
```css
@property --g { syntax: "<number>"; inherits: false; initial-value: 0 }
.cell { transform: scale(calc(1 + .22 * var(--g)));
        box-shadow: 0 calc(var(--g) * 10px) calc(var(--g) * 28px) -8px var(--glow);
        transition: --g .32s cubic-bezier(.22,1,.36,1) }
```
⚠ A registered property interpolates on the main thread and re-resolves every
consumer each frame — one element's budget, not a field's. Where a whole set
must respond, write the scalar per element from one loop and transition nothing.
