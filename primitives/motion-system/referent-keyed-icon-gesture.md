---
id: referent-keyed-icon-gesture
category: motion-system
tags: [icon, hover, micro-motion, css, keyframes]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Peer icons sharing one hover nudge say only *clickable*. Give each glyph the
gesture of what it depicts — a dial turns, a vessel tips, a wave slides — and
the hover restates the label. Stay inside the icon box: rotate ±8–15°,
translate 2–4px, 0.5–1.5s. Loop only a referent that is itself continuous,
slowly, 12–20s per turn.

```css
.tool:hover .icon-vessel svg { animation: tip .7s ease-in-out }
@keyframes tip { 25% { rotate: -12deg } 65% { rotate: 9deg } }
.icon-dial svg { animation: turn 16s linear infinite }
```
⚠ Mirror each gesture on `:focus-visible`, and under reduced motion drop it —
the label already says what the icon means.
