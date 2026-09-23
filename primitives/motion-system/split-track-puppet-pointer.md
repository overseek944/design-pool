---
id: split-track-puppet-pointer
category: motion-system
tags: [demo,cursor,choreography,spring,loop]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 10
requires: []
conflicts: []
completes: []
tension: []
---
A synthetic pointer demonstrating an interface is two motions, not one, and
giving them a single transition is what makes it look fake. Put travel on a
slow underdamped spring so the path arcs and overshoots slightly like a hand;
put the press on a short scale keyframe *delayed past the spring's settle*, so
the click lands on arrival instead of halfway there. Hold anchors as
percentages of the frame and the script survives every resize.

```js
animate:    { left: a.x, top: a.y, scale: press ? [1,.75,1.05,1] : 1 }
transition: { left:  { type:'spring', stiffness: 50–80, damping: 12–18 },
              scale: { duration: .4–.6, delay: .8–1.1 } }
```
⚠ Nothing under it is operable: `pointer-events:none` and `aria-hidden`, and a
label pill beside the arrow if a reader must know who is driving. Under reduced
motion park it on a named anchor rather than removing it.

The press belongs to the target, not to the cursor. An inert stage cannot
produce `:hover` or `:active` on anything inside it, so a scale keyframe on the
arrow alone lands over a control that never acknowledges being pressed. Set a
state attribute on the element being driven and let the product's own depress
styling answer — the exhibit then demonstrates the real component rather than a
mime of it, and every new control is covered without touching the script.
Depress 0.96–0.98 with a matching 3–6% brightness drop.
```css
[data-demo-stage] [data-pressed] { scale: .97; filter: brightness(.95) }
```
⚠ Clear the attribute on the same timeline that clears the cursor's press, not
on a separate timer — a stranded flag leaves one control depressed for the rest
of the loop and reads as a rendering fault.

When the puppet switches shape mid-script — arrow over controls, I-beam over
fields — stack both shapes inside one positioned element and offset each so
its own hotspot sits on the element's origin. The element is then positioned by
hotspot alone and a swap cannot nudge it. Scale every offset with the shape
(`calc(-8px * var(--cursor-scale))`), 1.1–1.3× the system size so it reads
beside the real cursor. A click is a 0.85–0.9 press plus a ring scaling 0.4→2.6
out of the hotspot over 0.3–0.5s.
```css
.pointer { position: absolute; pointer-events: none }
.arrow { left: calc(-8px * var(--s)); top: calc(-5px * var(--s)) }   /* tip at origin */
.ibeam { left: calc(-14px * var(--s)); top: calc(-14px * var(--s)) } /* centre at origin */
```
⚠ `pointer-events: none` is also what lets `elementFromPoint` at the hotspot report the target instead of the puppet.
