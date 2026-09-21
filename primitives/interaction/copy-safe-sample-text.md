---
id: copy-safe-sample-text
category: interaction
tags: [interaction,code,correctness,detail,usability]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A terminal or code sample is there to be dragged over and pasted, and
everything framing the command — the prompt sigil, the comment lines, the
output, line numbers, the result glyph — pastes with it and breaks what the
reader runs. Mark the frame `user-select: none` so a selection across the whole
block yields exactly the runnable lines. Cheaper and more honest than a copy
button, and it keeps working for the reader who selects part of a line.

```css
.sample .prompt, .sample .comment, .sample .out, .sample .ln { user-select: none }
```
⚠ Non-selectable is not non-readable — a screen reader still announces it, so
`aria-hidden` anything purely decorative as well. Do not extend this to the
output when the output is the point, as in an error being diagnosed.

The runnable text has its own hierarchy. A compound command is two or three
things joined by shell operators, and at full contrast the `&&` competes with
the words on either side of it. Drop the connectives to 30–40% opacity and the
line reads as its steps while still copying byte-for-byte — opacity changes
nothing about what is selected. Treat it as typography, never as `user-select:
none`: the operator is part of what has to run.
```css
.sample .op { opacity: .35 }        /* &&  ||  |  \ */
```
⚠ At 35% the operator can fall under 4.5:1. Fine for punctuation between
readable tokens, wrong the moment an operator carries meaning a reader must
notice — a `>` that truncates a file, say.

The same rule governs editorial apparatus. A section ordinal, a figure number or
a rail label set beside running copy is part of the page's furniture and not of
its argument, and a reader who drags across three paragraphs pastes `02` into
the middle of a sentence. Mark the apparatus `user-select: none` and the
selection yields prose. Where the marker is duplicated so each breakpoint can
place it differently — once in a gutter track, once above the heading — hide the
inactive copy with `display: none` and not with `visibility`, `opacity` or an
off-screen inset: those three leave it selectable, and the ordinal then pastes
twice from a page that only ever showed it once.
```css
.ordinal { user-select: none }
.ordinal--gutter { display: none }
@media (width >= 48rem) { .ordinal--inline { display: none }
                          .ordinal--gutter { display: block } }
```
⚠ Hiding by `display: none` also drops the copy from the accessibility tree,
which is what makes the duplicate safe — the pattern is only correct while
exactly one of the pair is displayed at every width.
