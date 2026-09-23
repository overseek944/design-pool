---
id: bare-ground-pointer-claim
category: interaction
tags: [interaction,pointer,overlay,svg,play,background,easter-egg,crosshair]
axes: {energy: 4, density: 2, weight: 2, finish: 3}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
The empty ground of a page can become playable without stealing a click. Draw the toy in one fixed, `pointer-events: none` overlay behind the
content, listen at the document, and act only when the press lands on nothing
that matters — `closest()` against controls, copy and forms. A crosshair cursor
announces it. Cap live objects at 2–6, spawn on a
600–1200ms scroll throttle, idle-respawn every 5–10s.

```js
const owned = t => t.closest('a,button,input,textarea,select,label,form,p,h1')
document.addEventListener('mousedown', e => {
  if (e.button || owned(e.target)) return
  e.preventDefault(); fire(e.clientX, e.clientY) })
```
⚠ Pointer-only and decorative: `aria-hidden` the layer, never gate content on it, and skip it entirely under reduced motion. `preventDefault` on bare ground kills text selection there.
