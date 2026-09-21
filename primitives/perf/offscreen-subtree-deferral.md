---
id: offscreen-subtree-deferral
category: perf
tags: [performance,containment,rendering,scroll,correctness]
axes: none
cost: 1
seen: 4
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

One median is wrong the moment the rows are heterogeneous. A list mixing full
entries with one-line traces wants an estimate per kind — an order of magnitude
apart is normal — because a placeholder ten times too tall gives a scrollbar
that collapses as the reader arrives. Use `auto <length>` rather than a bare
length so the engine keeps each element's last real measurement and the guess
only ever matters once.
```css
.row            { content-visibility: auto; contain-intrinsic-size: auto 220px }
.row.trace-only { contain-intrinsic-size: auto 24px }
```
⚠ Margins collapse through a skipped subtree, so the size it reports and the
size it occupies differ. `display: flow-root` on the row settles it.

It must be switched off wherever a real virtualiser takes over the same list.
Both mechanisms decide how tall an unrendered row is, and the virtualiser
measures the placeholder instead of the content — rows jump as they mount and
the scroll height never converges. Let the container that owns windowing revoke
both properties for its descendants.
```css
[data-virtual] .row { content-visibility: visible; contain-intrinsic-size: none }
```
