---
id: pointer-transparent-copy-layer
category: interaction
tags: [interaction,pointer,accessibility,layout,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Copy laid over a background that *reacts to the pointer* swallows every event
the background needs. Make the copy layer `pointer-events: none` and hand it
back only on the controls inside it, then have the background's handler bail
when the event target is one — otherwise the decoration keeps reacting under a
button the reader is aiming at.

```css
.copy   { pointer-events: none }
.copy :is(a, button) { pointer-events: auto }
```
```js
if (e.target.closest('a, button')) { influence = 0; return }
```
⚠ `pointer-events: none` does not remove the layer from the tab order or the
accessibility tree — it only stops the mouse, so nothing about focus changes.
Text selection goes with it: exempt any block meant to be copied.
