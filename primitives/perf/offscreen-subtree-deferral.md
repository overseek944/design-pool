---
id: offscreen-subtree-deferral
category: perf
tags: [performance,containment,rendering,scroll,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Below-fold grids of cards, figures or rows cost style, layout and paint on
first render although nobody has scrolled to them. `content-visibility: auto`
skips all three until the subtree nears the viewport — but only pays off when
told the size it is skipping, or the scrollbar jumps as each block
materialises. Pair the two always, estimating from the real median height:
300–700px for a card grid, taller for a full section.

```css
.gallery, .rows { content-visibility: auto;
                  contain-intrinsic-size: auto 480px }
```
⚠ A skipped subtree is invisible to in-page find and to anchor scrolling in
older engines. Never apply it to content a reader needs to Ctrl+F.
