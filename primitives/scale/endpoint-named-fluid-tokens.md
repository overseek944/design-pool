---
id: endpoint-named-fluid-tokens
category: scale
tags: [tokens,fluid,naming,architecture,responsive]
axes: none
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Name a fluid token after the two pixel values it interpolates between —
`--text-fluid-20-80` — so the range is legible at the call site and nobody has
to open the definition to learn what a step does. The body is one `clamp()` in
`vi` rather than `vw`, which follows the writing mode's inline axis and ignores
a vertical scrollbar. A flat list of named ranges replaces an abstract scale
nobody can hold in their head.

```css
--text-fluid-20-80:  clamp(1.25rem, -5.1786rem + 10.7143vi, 5rem);
--space-fluid-16-24: clamp(1rem, .1429rem + 1.4286vi, 1.5rem);
```
⚠ Generate the middle term from the endpoints and a fixed viewport band —
360–1600px is a usable default. Hand-written slopes drift and then the name
lies, which is worse than no name at all.

A ramp that runs negative — a fluid overlap pulling a block up under the one
above — reverses which endpoint is which. `clamp()` reads minimum, preferred,
maximum in that order, so the *deeper* pull goes first and the shallower one
last. Get the order backwards and it is not an error: clamp silently returns the
first argument at every width, and the overlap is frozen.
```css
.visual { margin-block-start: clamp(-80px, -5vw, -48px) }   /* -80 is the min */
```
⚠ Carry the signs into the name for the same reason the positive ramps carry
their endpoints — otherwise the next reader repairs the order the wrong way round.

The same naming argument applies to the *static* scale, and answers the oldest
objection to `rem` type: name each token after the pixel size the design
specifies and hold a `rem` value in it. The handoff vocabulary survives — a
spec that says 13px is satisfied by a token called 13px — while every size
still answers to the reader's root setting, so nobody has to choose between a
legible scale and an accessible one. The name is mechanical, so there is no
judgement per call site and no step anyone has to learn.
```css
--font-size-13px: 0.8125rem;   /* 13 ÷ 16 */
--font-size-18px: 1.125rem;
```
⚠ The name is a lie at any root size but the default, which is the point —
never compute against it, and never mix a raw `px` value into the same scale.

Colour takes the same naming and gains something sizes do not. Name each token
after its light-mode hex — `--tone-21222c` — and redefine that name under the
dark scope: a value pasted straight out of a design file becomes a token
nobody had to invent a semantic name for, and it inverts without being
renamed. Semantic aliases still sit on top for anything that has a role; the
hex layer catches the long tail of one-off values that would otherwise be
written literally and never flip.
```css
:root            { --tone-21222c: #21222c }
[data-theme=dark]{ --tone-21222c: #f4f3f3 }
```
⚠ The name is now a lie in one of the two themes, which is the price. Keep the
literal layer strictly below the semantic one — a component reaching for a hex
name has skipped a decision about what the colour means.
