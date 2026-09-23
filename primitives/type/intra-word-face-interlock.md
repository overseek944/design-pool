---
id: intra-word-face-interlock
category: type
tags: [type,display,headline,lettering,fallback,detail]
axes: {energy: 1, density: 3, weight: 4, finish: 3}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---

Two faces can meet inside a single word rather than between blocks. Split each
word into its opening glyph and its remainder, set the first from an ornamental
face and the rest from a plain or bitmap one, and a headline reads as one
lettering system instead of two fonts sharing a line. Give the opening glyph
`line-height: 0` so its larger body cannot open the line box, and 0.02–0.06em of
right margin so it does not collide with what follows. Where the plain face
draws one character badly — a `c` that reads as an `o`, a `1` as an `l` —
override that character alone to a third face at 1.1–1.3em to match x-height.

```css
.cap  { font-family: var(--ornament); line-height: 0; margin-right: .04em }
.rest { font-family: var(--plain) }
.rest .amend { font-family: var(--legible); font-size: 1.21em }
```
⚠ One word becomes several nodes — keep the trailing space inside the wrapper or
the headline is read as one run-on word. The override must be the real
character, never a lookalike, or copied text carries a different word than the
one on screen.
