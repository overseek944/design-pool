---
id: gradient-through-text
category: light
tags: [color,type,effect]
axes: {energy: 3, density: 2, weight: 4, finish: 3}
cost: 2
seen: 7
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

Build the gradient out of `currentColor` mixed toward transparent and the
effect stops needing a colour of its own: one class shimmers correctly over any
inherited text colour and in both themes, because the highlight *is* the text.
Sweep `background-position` across a `200%` background rather than moving the
element.

```css
.shimmer { background-image: linear-gradient(90deg,
    color-mix(in oklab, currentColor 45%, transparent) 38%, currentColor 50%,
    color-mix(in oklab, currentColor 45%, transparent) 62%);
  background-size: 200% 100%; animation: sweep 2s linear infinite }  /* 1.6–3s */
```
⚠ The reduced-motion branch must restore `-webkit-text-fill-color: currentColor`
and drop the image. `animation: none` alone leaves the fill transparent — the
text is simply gone. Same trap behind any `@supports` fallback.
