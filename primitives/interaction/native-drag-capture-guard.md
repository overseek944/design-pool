---
id: native-drag-capture-guard
category: interaction
tags: [pointer,drag,scroll,correctness,interaction]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Images and links are `draggable` by default, so a press-and-move inside a
controlled scroll surface starts an HTML5 drag session instead of a gesture.
That session owns the input until it resolves, and an abandoned one leaves
several engines eating wheel events on a rail that then will not scroll again.
Cancel `dragstart` once at the document, in the capture phase, and let anything
that genuinely needs a drag opt back in by attribute.

```js
document.addEventListener('dragstart', e => {
  if (!e.target.closest?.('[data-allow-native-drag]')) e.preventDefault()
}, { capture: true })
```
⚠ Global: it also removes drag-to-desktop on every image. Keep the opt-out on
any file picker, sortable list or canvas export.
