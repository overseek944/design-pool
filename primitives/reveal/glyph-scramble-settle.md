---
id: glyph-scramble-settle
category: reveal
tags: [type,reveal,motion,technical,text]
axes: {energy: 4, density: 3, weight: 2, finish: 3}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
Resolve a label out of noise rather than fading it in: hold the final string
length from the first frame and fill every unresolved slot from a small fixed
glyph pool, letting the settled prefix grow left to right. Constant length
means no reflow, and the register lands as machine rather than ornament. Scale
duration with length — about 220ms plus 20ms per character, capped near 650ms —
and leave spaces intact so word shapes hold.

```js
const G = "▓▒░#/\\|<>+=-", keep = Math.floor(p * n)
el.textContent = s.slice(0, keep) + [...s.slice(keep)]
  .map(c => c === " " ? " " : G[Math.random() * G.length | 0]).join("")
```
⚠ Rewriting `textContent` destroys child markup and fights any runtime
translation layer. Restore the source string exactly on the last frame, run
once, and keep it off anything that must be read aloud.
