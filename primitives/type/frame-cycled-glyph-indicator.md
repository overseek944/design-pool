---
id: frame-cycled-glyph-indicator
category: type
tags: [indicator,mono,glyph,loading,state,motion]
axes: {energy: 3, density: 1, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An indeterminate wait does not need a drawn shape. Step one text node through a
short sequence of glyphs — braille octants for a process, block partials for a
filling bar, `|/-\` for a terminal — and it inherits colour, size, weight and
baseline from the sentence around it, with no SVG to align and no keyframes to
write. The glyph set carries the register, the interval carries the tempo: 80–140ms
reads as work underway, slower reads as a stall.

```js
const F = [...'⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏']                       // 4–12 frames
el.textContent = F[0]
if (!rm.matches) setInterval(() => el.textContent = F[++i % F.length], 110)
```
⚠ Monospaced only — a proportional face changes width every frame and shoves the
line. `aria-hidden` the glyph and put the state in a sibling `role="status"`, or a
screen reader announces each frame. Under reduced motion leave frame zero showing
and never start the timer.
