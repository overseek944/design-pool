---
id: first-paint-entry-style
category: motion-system
tags: [motion,transition,css-only,progressive-enhancement,state]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An element that did not exist a frame ago has no previous value to transition
from, so a class added on mount either runs a frame late or needs a double
`requestAnimationFrame` to force a style flush. `@starting-style` declares that
first value in the stylesheet — the browser paints the element with it once,
then transitions to the computed one. Entry motion with no mount hook, no
forced reflow and nothing for a script to sequence. Applies to anything
transitioned, and to an element leaving `display: none`.

```css
.chip { opacity: 1; scale: 1; transition: opacity .15s var(--ease), scale .15s var(--ease) }
@starting-style { .chip { opacity: 0; scale: .97 } }
```
⚠ There is no exit half: removal still needs `transition-behavior:
allow-discrete` on `display`, or the element disappears instantly. Engines
without support skip the block and the element simply arrives settled.
