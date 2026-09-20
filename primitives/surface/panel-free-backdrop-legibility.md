---
id: panel-free-backdrop-legibility
category: surface
tags: [backdrop-filter,legibility,photography,contrast,surface,type]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: [backdrop-blur-tier-system]
---
Copy over a photograph usually gets a plate, and the plate breaks the picture.
Give the text block itself a `backdrop-filter` and no background at all: the
image keeps its brightness and its frame, and only the detail beneath the words
goes quiet. Blur is an average, so it removes busyness without removing
luminance — contrast stays unsolved until a second term in the same filter list
commits to it. Blur 8–24px, `brightness(.55–.75)` over light imagery.

```css
.copy { background: none; backdrop-filter: blur(16px) brightness(.65) }
```
⚠ The filter stops at the element's box, printing a rectangle of smooth into a
detailed picture — pad 1–2rem past the text and feather the edge with a mask.
One compositing layer per block, so not for long-form running text.
