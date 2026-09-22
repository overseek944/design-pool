---
id: disengaged-scoped-transition
category: interaction
tags: [interaction,transition,pointer,drag,reveal,accessibility]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A value the pointer drives — a wipe seam, a comparison split, a spotlight —
wants no easing while driven and easing when let go; one duration on the element
gives the gesture a lag that reads as the page being slow. Put the transition on
the *resting* selector only: engaged, the property tracks the pointer
frame-exact; released, the selector reapplies and it eases home. No script, no
state. Return 0.3–0.6s on an ease-out.

```css
.card ._render          { clip-path: inset(0 0 0 var(--split, 100%)) }
.card:not(:hover) ._render { transition: clip-path .42s cubic-bezier(.22,.61,.36,1) }
.card:focus-visible ._render { clip-path: inset(0 0 0 50%) }   /* keyboard parks mid */
```
⚠ Hover is not an input method. Give the keyboard a rule that parks the value
somewhere it states the point — the midpoint for a comparison — or the effect
does not exist for anyone not using a mouse, and gate the whole thing under
`prefers-reduced-motion` down to the parked state.

The resting duration need not be a constant. Where the gesture is a drag with a
release — a sheet, a card, a pull-to-act — publish the flick strength as a
scalar alongside the position and let the settle read it, so a hard throw
resolves in a fraction of what a slow drag takes and the surface keeps the
momentum the hand gave it. Two rules: zero while engaged, computed on release.
Scale 0.2–1 over the useful velocity range, against a 300–500ms ceiling.
```css
[data-swiping]            { transition-duration: 0s }
[data-closing]            { transition-duration: calc(var(--strength, 1) * 400ms) }
```
⚠ Clamp the low end — an unclamped scalar approaching zero produces a settle
short enough to read as a teleport, and a value left unset by an interrupted
gesture drops the declaration entirely.
