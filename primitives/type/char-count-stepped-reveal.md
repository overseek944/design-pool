---
id: char-count-stepped-reveal
category: type
tags: [type,motion,css-only,custom-properties,keyframes]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 4
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

Step a clip rather than a width and the reveal leaves the layout thread: `width`
relays out the line on every step, `clip-path` composites. It also survives a
proportional face and more than one line. The trade is that the steps now divide
the box evenly instead of landing on glyph advances, so an edge can sit
mid-glyph for a frame — hold the box at its final width from frame one, or the
reservation and the reveal fight each other.
```css
.line { animation: type calc(var(--chars) * 40ms) steps(var(--chars), end) both }
@keyframes type { from { clip-path: inset(0 100% 0 0) } }
```

Uniform steps are the tell when a line should read as typed by a hand rather
than printed by a machine, and that case is the one worth paying script for.
Write a character per timeout with the delay redrawn each time, 25–60ms, and
hold the result 300–600ms past the last glyph so the line is visibly finished
before its consequence appears.
```js
const type = () => { el.textContent = TEXT.slice(0, ++i)
  if (i <= TEXT.length) setTimeout(type, 26 + Math.random() * 34) }
```
⚠ Never inside a live region: a per-character write is announced per character.
Under reduced motion put the finished string in the DOM and skip the pass — a
typing effect has nothing to degrade to but its own result.
