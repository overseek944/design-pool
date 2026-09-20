---
id: gradient-through-text
category: light
tags: [color,type,effect]
axes: {energy: 3, density: 2, weight: 4, finish: 3}
cost: 2
seen: 8
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

A gradient across a headline is only as legible as its worst stop, and hues
taken straight off the palette usually put that floor well under the body text's.
Mix every stop 15–30% back toward the foreground colour: the sweep survives, the
contrast floor is set by a token that already passes, and one stop list then
works in both themes.
```css
background: linear-gradient(135deg, var(--fg) 0%,
  color-mix(in oklab, var(--brand) 75%, var(--fg)) 60%, var(--accent) 100%);
```
⚠ Score each stop against the ground on its own — an average of the stops is not
a contrast ratio, and the failing one is usually the saturated middle.
