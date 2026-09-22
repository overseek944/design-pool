---
id: frame-cycled-glyph-indicator
category: type
tags: [indicator,mono,glyph,loading,state,motion]
axes: {energy: 3, density: 1, weight: 2, finish: 3}
cost: 1
seen: 5
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

The width warning has a CSS-only answer that needs neither a monospaced face nor
a timer. Size the container to the sequence's *widest* state in `ch`, put the
cycling glyphs in a nested `overflow: hidden` span, and step that span's width
through the set with `step-end`. The line is reserved at its maximum before the
first frame paints, so nothing shifts in a proportional face either, and the
whole indicator is two rules. Period 1–1.6s over 3–4 stops.
```css
.wait { display: inline-block; width: 3ch }            /* reserve the maximum */
.wait > span { display: inline-block; width: 1ch; overflow: hidden;
               white-space: nowrap; animation: dots 1.2s step-end infinite }
@keyframes dots { 0% { width: 1ch } 33% { width: 2ch } 66% { width: 3ch } }
```
⚠ `ch` is the width of `0`, not of the glyph being revealed — for periods or
braille it over-reserves and the sentence after it sits a little far off. Measure
the real set and use a fixed `em` value where the gap shows.

The third form animates `content` on a pseudo-element directly — no timer, no
width arithmetic, the sequence written as the keyframes themselves. It is the
shortest of the three and the least portable: `content` is not an interpolable
property, so engines that decline to animate it leave the pseudo-element
showing frame zero forever, and where frame zero is `""` the indicator is
simply absent. Reserve the widest state on the host and left-align, or the
sentence after it still moves.
```css
.wait::after { content: ""; display: inline-block; width: 3ch; text-align: left;
               animation: dots 1.4s infinite }
@keyframes dots { 0%,20%{content:""} 40%{content:"."} 60%{content:".."} 80%,to{content:"..."} }
```
⚠ Make frame zero the *final* state, not the empty one, so a non-animating
engine shows a complete ellipsis rather than nothing at all.
