---
id: worst-case-ground-ink
category: color
tags: [color,contrast,accessibility,icon,correctness]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A mark handed to a surface you do not own — a favicon in the tab strip, a
bookmark row, an OS notification — has no ground to measure against, and
`prefers-color-scheme` will not supply one: it reports the OS setting, which
the host chrome may ignore. Guess, and the mark vanishes wherever the guess is
wrong. Take the value whose *lower* contrast across both grounds is highest.

```
maximise  min( contrast(ink, lightGround), contrast(ink, darkGround) )
  vs #fff / #000 the optimum is ~#757575, 4.58 : 1 either way
  real chrome is never pure — re-solve against the two actual extremes
```
⚠ Balanced is mediocre by construction — the ceiling is ~4.6:1, so the mark has
to read at 4:1 and can never reach 7:1. Only where transparency is forced:
anything that can carry an opaque plate should, and then the ink is chosen
against a known colour and beats this every time.

Invert the solve when the marks are fixed and the plate is yours — a row of
supplied logos arrives at both polarities and cannot be recoloured. Maximise
the same expression over the *ground* instead, and put every mark on that one
value.
```
maximise  min( contrast(darkestMark, plate), contrast(lightestMark, plate) )
  the ceiling is the same ~4.6:1, reached near a mid neutral
```
⚠ The optimum belongs to the set, not to the component: one near-black mark
added later moves it, so re-solve when the row changes. And a mark carrying its
own baked-in white beats every plate value — that asset has to be re-cut.

Re-cutting is not the only answer when the marks arrive at both polarities and
the plate is yours. Knock every one of them back against it instead — 40–55%
opacity — and each mark is already pulled halfway to the ground, so the set
reads as one neutral grey rather than a dozen brand colours arguing, and the
plate's value decides the contrast rather than the loudest mark's. The theme
flip is then one declaration, because a washed mark inverts to a washed mark on
the opposite ground.
```css
.logo img      { opacity: .45 }
.dark .logo img{ opacity: .5; filter: invert(1) }
```
⚠ `invert()` complements hue as well as flipping value, so a saturated mark
returns the wrong colour — `grayscale(1)` ahead of it for any that do. Under
~40% a wordmark stops being identifiable, and that is the floor, not the target.
