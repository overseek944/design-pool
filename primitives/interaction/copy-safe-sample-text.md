---
id: copy-safe-sample-text
category: interaction
tags: [interaction,code,correctness,detail,usability]
axes: none
cost: 1
seen: 1
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
