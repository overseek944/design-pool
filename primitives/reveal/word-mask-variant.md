---
id: word-mask-variant
category: reveal
tags: [type,motion,reveal]
axes: {energy: 4, density: 3, weight: 3, finish: 4}
cost: 2
seen: 4
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

The gap between masks must be a real space text node, not `margin-right`. With
margins the DOM holds no whitespace: copying the heading yields one run-on word,
and the selection highlight stops at each box because a margin is never painted
as selected. Insert `' '` between wrappers and set `word-spacing` to zero-out
any doubling.
```js
words.forEach((w, i) => { h.append(wrap(w)); if (i < words.length - 1) h.append(' ') })
```
⚠ Inline-block wrappers collapse the space at a line end differently across
engines — check wrap points after switching.
