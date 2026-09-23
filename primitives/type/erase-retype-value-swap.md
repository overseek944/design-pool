---
id: erase-retype-value-swap
category: type
tags: [type,text,swap,comparison,motion,technical]
axes: {energy: 3, density: 2, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
When figures switch to another dataset, delete each old string one character
at a time and type the new one in, while the bars beside them move straight to
size. The shape carries the comparison while the words arrive like a terminal
answering. Erase 20–35ms, type 40–70ms per character; skip unchanged strings.

```js
const step = (el, s, ms, done) => el.textContent === s ? done?.()
  : (el.textContent = s.length > el.textContent.length
      ? s.slice(0, el.textContent.length + 1) : el.textContent.slice(0, -1),
     setTimeout(() => step(el, s, ms, done), ms));
```
⚠ Each tick mutates text: make the node `aria-hidden`, carry the final value
in a label. Reduced motion writes it at once.
