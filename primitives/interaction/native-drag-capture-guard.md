---
id: native-drag-capture-guard
category: interaction
tags: [pointer,drag,scroll,correctness,interaction]
axes: none
cost: 1
seen: 2
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

Scope it to the component when only one surface takes a gesture. `draggable="false"`
on the images kills the same session locally, and it wants two companions that
the document-level guard never needed: `touch-action: none` on the stage so the
browser stops arbitrating between the gesture and a scroll, and `user-select:
none` so a slow drag does not select the caption instead.
```jsx
<div style={{ touchAction: 'none', userSelect: 'none' }}>
  <img draggable={false} style={{ pointerEvents: 'none' }} />
```
⚠ `touch-action: none` surrenders scrolling over that box entirely — on a
full-width stage a reader can be trapped with no way past it. Lock only the axis
the gesture uses (`pan-y` for a horizontal drag) unless the stage is inset.
