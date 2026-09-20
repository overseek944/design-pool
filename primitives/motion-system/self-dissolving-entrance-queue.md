---
id: self-dissolving-entrance-queue
category: motion-system
tags: [motion,sequencing,correctness,reveal,scroll]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Serialising entrances stops a long page arriving as noise, but a strict queue
punishes a reader who outruns it — they look at content still at opacity 0.
Release the lock the moment a *second* section asks for its turn: a lone
entrance still plays alone, and a reader who is ahead gets everything waiting at
once. Hold 200–600ms.
```js
const request = job => { queue.push(job); if (busy) release(); pump() }
const pump = () => { const j = !busy && queue.shift(); if (!j) return
  busy = true; j.fn(); setTimeout(() => { busy = false; pump() }, j.total) }
```
⚠ Queue only sections already well into view — approach reorders under scroll.
