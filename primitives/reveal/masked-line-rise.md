---
id: masked-line-rise
category: reveal
tags: [type,motion,reveal]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [revert-split-on-resize, will-change-on-split-children]
tension: []
---
Split to lines, wrap each in an `overflow-hidden` outer with a transform-only
inner. Lines rise out of their own mask — no fade needed, and the crop edge
gives the motion a physical boundary. The canonical headline entrance.
```js
const outer = SplitText.create(el, { type:"lines", linesClass:"overflow-hidden line-outer" })
const inner = SplitText.create(outer.lines, { type:"lines", linesClass:"line-inner inline-block w-full" })
gsap.from(inner.lines, { yPercent: 110, duration: .9, ease: "power3.out", stagger: .07 })
```
Two nested splits — one to mask, one to move. One split can't do both.
