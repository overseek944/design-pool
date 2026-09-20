---
id: self-erasing-play-classes
category: motion-system
tags: [architecture,progressive-enhancement,svg,accessibility,correctness,entrance]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Author the finished frame as the markup, then take it away to play it. Script
adds `armed` to un-draw the moving parts, `play` to run them once, and drops
both when the run ends — leaving exactly the file that shipped. No "complete"
state is authored, and with the script dead, inside an `<img>` or under reduced
motion the reader still gets the whole thing. Await the real animations, not a
duration you retyped.

```js
el.classList.add('armed')     /* .armed .curve { stroke-dashoffset: 1 } */
el.classList.add('play')
Promise.all(el.getAnimations({ subtree: true }).map(a => a.finished))
  .then(() => el.classList.remove('armed', 'play'), () => {})
```
⚠ Arm before first paint or the settled frame flashes. Re-arm only at ratio 0;
at 0.1–0.3 it replays mid-view.
