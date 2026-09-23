---
id: draft-retiring-grow-wipe
category: reveal
tags: [reveal, clip-path, wipe, layering, media, scroll]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Show a finished image arriving over its own draft — a render over its wireframe, a filled map over its outline. Stack both in one cell; the finished layer wipes up under `clip-path: inset()`, and the draft fades only after the wipe ends, delayed by wipe delay plus duration. No frame is empty, and at rest no draft lines show through transparent regions. Wipe 1.2–2.2s; draft fade 0.3–0.5s.

```css
.top { clip-path: inset(100% 0 0); transition: clip-path var(--d,1.8s) var(--w,0s) }
.in .top { clip-path: inset(0) }
.in .base { opacity: 0; transition: opacity .4s calc(var(--w,0s) + var(--d,1.8s)) }
```
⚠ Under `reduce`, show the finished layer and drop the draft outright.
