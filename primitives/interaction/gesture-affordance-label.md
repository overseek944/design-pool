---
id: gesture-affordance-label
category: interaction
tags: [affordance,interaction,accessibility,detail,ux]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
A surface whose only affordance is a gesture — drag to orbit, scroll to zoom,
pinch to pan — advertises nothing. No cursor change, no hover state, nothing
moves until someone guesses. Name the gesture in a small label parked in a
corner of the surface, then retire it the first time the gesture succeeds. Type
at 0.7–0.8rem on a 60–75% plate; inset 8–16px from the edge it sits against.

```css
.hint { position: absolute; inset-block-end: .75rem; inset-inline-start: .75rem;
        transition: opacity 200ms } [data-used] .hint { opacity: 0 }
```
⚠ A permanent label is clutter and still leaves keyboard users with nothing —
the surface needs real key handling and its own description either way.

Where the gesture is the surface's *transport* rather than an extra, retiring
the label leaves a corner with nothing to say and a reader at the end with no
way back. Give the slot a second occupant: the hint fades on the first
successful gesture, and the control that returns the surface to its start fades
into the same position once the sequence completes. One place to look, and a
demonstration that ends is never a dead end.
```css
.slot > .hint  { opacity: 1 }  [data-used] .slot > .hint  { opacity: 0 }
.slot > .reset { opacity: 0 }  [data-done] .slot > .reset { opacity: .8 }
```
⚠ The reset has to be a real `<button>`, not the hint restyled — where the
transport is a gesture it is the only keyboard-reachable control on the surface.

A corner label says what to do but not *to what*. Where the targets are
scattered among decorative siblings that look identical, mark the targets
themselves: a hairline ring on a pseudo-element, expanding from just inside the
edge and fading out, on a period that is mostly empty — 4–6s with the visible
arc in the last 30–40% — so the field never reads as a row of blinking
controls. Stagger the delay by index or they pulse in unison, and cancel the
ring on the element under the pointer.
```css
.mark::after { animation: invite 4.4s ease-out var(--d, 0s) infinite }
@keyframes invite { 0%, 58% { opacity: 0; scale: .98 }
                    72% { opacity: .4 } to { opacity: 0; scale: 1.34 } }
```
⚠ Gate it on `(hover: hover)` and on a width where the scatter survives — a
ring advertising an interaction that does not exist on the device is worse than
no hint. It is decoration either way; the targets still owe a real control.
