---
id: gradient-through-text
category: light
tags: [color,type,effect]
axes: {energy: 3, density: 2, weight: 4, finish: 3}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
`background-clip: text` with a transparent fill turns a headline into a window
onto a gradient or animated layer. Animate the background, not the text, and the
letterforms stay crisp.
```css
background: linear-gradient(...); -webkit-background-clip: text; color: transparent;
```
