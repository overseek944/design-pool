---
id: proximity-revealed-target
category: interaction
tags: [interaction,pointer,accessibility,focus,custom-properties,affordance,pointer-events]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: [gesture-affordance-label]
---
A control meant to be found rather than advertised can key its own visibility to
how near the pointer is. One custom property carries a smoothstepped distance
falloff and drives opacity; a separate boolean thresholded off the same number
turns `pointer-events` on, so the invisible control never takes a click meant
for what is under it. Focus pins the property to 1, which is the only reason a
keyboard reaches it at all. Reveal radius 90–140px over a 50–80px feather.

```css
.target { opacity: var(--near, 0); pointer-events: none; transition: opacity .16s }
[data-near="true"] .target { pointer-events: auto }
```
```js
const n = Math.min(1, Math.max(0, (R - Math.hypot(px - x, py - y)) / feather))
el.style.setProperty('--near', n * n * (3 - 2 * n))    // smoothstep, not linear
```
⚠ It has to be a real button with a label and its own focus handler — something
reachable only by hovering the right 100px is reachable by nobody using a
keyboard, a screen reader or a touchscreen.

The same find-don't-advertise rule needs no pointer maths where the trigger is
structural: a section permalink sits at `opacity: 0` beside its heading, shown
by the heading's own `:hover` and by the link's `:focus-visible`. It stays in
tab order and keeps its label, so a keyboard lands on something that appears
rather than something that is missing. Fade 120–200ms; offset .35–.6em.
```css
.anchor { opacity: 0; transition: opacity .18s }
h2:hover .anchor, .anchor:focus-visible { opacity: 1 }
```
⚠ Touch has no hover — keep the heading itself linkable, or the permalink is
unreachable on a phone.
