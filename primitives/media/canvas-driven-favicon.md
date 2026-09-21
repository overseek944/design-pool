---
id: canvas-driven-favicon
category: media
tags: [media,icon,canvas,motion,browser,detail]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
The tab strip is a surface a page can paint. Render the mark into a small
offscreen canvas, export it as a data URL, and assign it to a `<link rel=icon>`
the script appends itself — the static icons stay in the document, so dropping
that one link restores them. Drive it from `setTimeout`, not the display clock:
8–12fps is enough at 32px. Force whatever pose keeps the silhouette legible
that small; a hero's idle wobble closes a hole at icon scale.

```js
const link = Object.assign(document.createElement('link'), { rel: 'icon' })
document.head.appendChild(link)                       // own it; never reuse theirs
try { link.href = canvas.toDataURL('image/png') }     // tainted canvas throws
catch { link.remove() }                               // static icons resume
```
⚠ Skip it under `prefers-reduced-motion`, and idle on `document.hidden` — a
buried tab still repaints its icon. Re-encoding a data URL several times a
second never lets the network go quiet, so anything waiting on network-idle
hangs outright.
