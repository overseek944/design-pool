---
id: token-indexed-reading-front
category: reveal
tags: [type,scroll,progress,reveal,colour]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
Text that inks in as it is read cannot be a gradient sweep: a gradient fills by
geometry, a reader advances by line, and they disagree past the first line.
Split to tokens, map the block's rect to an integer index, light every token
under it. `color` alone changes — no layout, no layer, nothing to re-measure —
so hundreds of spans stay cheap and a frame touches one node. Front 0.8–0.9 to
0.3–0.4 viewport height, 0.08–0.15s each.

```css
.tok { color: rgb(from var(--ink) r g b / .18); transition: color .12s linear }
.tok.lit { color: var(--ink) }
```
⚠ Unlit tokens sit far under 4.5:1 — land the front before the block exits.
Wrap each word in a `nowrap` span before splitting to characters, or lines
break mid-word. Under reduced motion bail before splitting: the node stays
inked and findable.
