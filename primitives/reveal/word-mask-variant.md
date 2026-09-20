---
id: word-mask-variant
category: reveal
tags: [type,motion,reveal]
axes: {energy: 4, density: 3, weight: 3, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: [revert-split-on-resize]
tension: []
---
Same nested-mask structure at word granularity (`inline-block` on both levels)
for shorter, punchier headlines. Words need a tighter stagger than lines — .04–.06.

An `overflow: hidden` wrapper sized to the text box crops the face itself:
descenders lose their tails, and an italic or a swash loses its side bearing.
Pad the wrapper out on all four sides and cancel each pad with an equal negative
margin — the mask gains room, the layout sees the original box, and nothing
shifts. 0.06–0.1em vertically is enough for descenders; sloped faces need
0.1–0.15em horizontally.
```css
.mask { display: inline-block; overflow: hidden;
        padding: 0 .12em .08em; margin: 0 -.12em -.08em }
```
⚠ Bottom padding alone leaves the mask's own edge visible above the glyph on a
tall ascender. `align-bottom` on the wrapper keeps the padded box on the baseline.
