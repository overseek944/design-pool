---
id: in-stage-sequence-exit
category: interaction
tags: [accessibility,keyboard,scroll,pin,focus,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A pinned narrative several viewport-heights long is a corridor with no door:
anyone who does not want it, or who tabbed into it, leaves only by many wheel
events. Put the exit inside the stage, first in DOM order so tabbing in
reaches it before anything else, and have it park the timeline on its finished
frame before moving. Hold it `inert` until the sequence is actually running, so
a viewport that never pins gains no stray tab stop.

```js
skip.onclick = () => { settle(1)               // finished frame, never 0
  after.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  after.focus({ preventScroll: true }) }       // after carries tabindex="-1"
```
⚠ Moving the scroll is not enough — focus must follow, or the next Tab walks
back into the corridor. It sits over artwork, so it needs its own 44px target
and `:focus-visible` ring rather than an inherited one.
