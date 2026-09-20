---
id: char-count-stepped-reveal
category: type
tags: [type,motion,css-only,custom-properties,keyframes]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A per-character reveal is one number. Publish the character count as a custom
property and derive both the step count and the final width from it, so the
reveal lands exactly on glyph boundaries and the two cannot drift when the string
changes. The duration comes off the same number at 25–60ms a character. Hold the
caret's blink while the line is typing — one thing moving at a time.
```css
.line { width: 0; overflow: hidden; display: inline-block;
  animation: type calc(var(--chars) * 40ms) steps(var(--chars), end) forwards }
@keyframes type { to { width: calc(var(--chars) * 1ch) } }
```
⚠ `1ch` is one advance only in a monospace face; anything proportional stops
mid-glyph. The string is fully in the DOM the whole time and is announced
complete at once, so this is a reveal for effect, never for withholding.
