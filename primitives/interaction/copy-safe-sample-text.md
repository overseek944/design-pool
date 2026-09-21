---
id: copy-safe-sample-text
category: interaction
tags: [interaction,code,correctness,detail,usability]
axes: none
cost: 1
seen: 3
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
