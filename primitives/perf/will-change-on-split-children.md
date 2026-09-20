---
id: will-change-on-split-children
category: perf
tags: [motion,performance,promotion]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Split text creates dozens of nodes animated simultaneously; without an explicit
promotion hint they thrash the main thread. Put `will-change` on the split
children via the class option, and clear it on complete.
```js
{ charsClass: "inline-block will-change-[opacity,transform]" }
onComplete: () => gsap.set(chars, { clearProps: "willChange" })
```
⚠ permanent `will-change` on many nodes costs more memory than it saves.

Clearing the hint is not only a memory decision. A promoted element is
rasterised once and composited thereafter, which renders text visibly softer
than plain DOM text on a high-density panel — a finished headline that looks
almost right but never quite sharp is usually still on its layer. Demote each
node on the frame *it* settles rather than the whole set at the end, and drop
the residual `transform` and `filter` with it so nothing holds the layer open.
```css
.char.is-settled { will-change: auto; transform: none; filter: none }
```
⚠ A `filter`, a 3D transform or `backface-visibility: hidden` each hold the
layer on their own — removing `will-change` alone changes nothing.
