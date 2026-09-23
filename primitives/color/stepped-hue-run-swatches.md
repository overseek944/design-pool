---
id: stepped-hue-run-swatches
category: color
tags: [color,palette,accent,divider,legend,swatch]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An ordered run of 4–7 neighbouring hues, spread over roughly 90–150° of the
wheel, used only as discrete swatches and never blended. A 3–5px strip made of
hard-stop bands, and 6–10px index squares keyed to list items in run order. On
a neutral page it reads as a set, not a gradient.
Promote one mid-run member to be the only text accent.

```css
.strip { height: 4px; background: linear-gradient(90deg,
  var(--h1) 0 25%, var(--h2) 0 50%, var(--h3) 0 75%, var(--h4) 0) }
.key::before { content: ""; inline-size: 8px; block-size: 8px;
  background: var(--h, var(--h1)) }
```
⚠ Swatches are decoration; never the only thing telling
items apart. Only the promoted accent has to pass 4.5:1 as text.
