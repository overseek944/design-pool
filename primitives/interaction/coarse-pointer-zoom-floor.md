---
id: coarse-pointer-zoom-floor
category: interaction
tags: [correctness,accessibility,pointer,forms,responsive,type,detail,css-only]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Mobile Safari zooms the whole page when a focused control's text is under 16px,
and it does not zoom back — one 14px input wrecks the viewport for the rest of
the session. Do not raise control type everywhere to dodge it; floor it only
where the bug lives. `max(16px, 1em)` leaves anything already larger alone, and
the two gates confine the override to iOS touch, so every other platform keeps
the 13–15px controls the design asked for.

```css
@supports (-webkit-touch-callout: none) { @media (pointer: coarse) {
  input, select, textarea { font-size: max(16px, 1em) !important } } }
```
⚠ The floor changes control height — audit any fixed-height row on a phone. A
ghost element measured against the field, sizing an autogrow textarea, needs
the same rule or it mis-measures.
