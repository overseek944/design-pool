---
id: will-change-on-split-children
category: perf
tags: [motion,performance,promotion]
axes: none
cost: 1
seen: 1
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
