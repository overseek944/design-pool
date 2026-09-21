---
id: gridline-borne-value-label
category: layout
tags: [chart,axis,label,mono,hairline,density]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---

A plot that reserves a left gutter for its value axis spends 40–60px of the one
dimension a card is short of. Set each label on its own gridline instead —
flush to the line's left end, resting just above it, smallest mono tier at
30–45% ink — and the plot runs full width with no axis column. The rule is the
label's baseline, so nothing aligns to anything, and rules placed by percentage
of the plot box keep the scale out of CSS.

```css
.rule { position: absolute; inset-inline: 0; top: var(--pct);
        border-block-start: 1px solid var(--line) }
.rule > b { position: absolute; left: 0; bottom: 2px; color: var(--ink-35);
  font: 10px/1 var(--mono); font-variant-numeric: tabular-nums }
```
⚠ Labels now sit over the data: reserve 10–16px of head room in the scale so
the top one never lands on a stroke, and set tabular figures or the column
shivers as values change.

Where the rules carry no labels at all they need no elements either. One
hard-stop `linear-gradient` on the plot box paints the whole set — two stops a
percent apart per line, transparent between — and `background-size` plus
`background-position` inset it to the data area rather than the padded
container, which is the part a repeating gradient cannot express. Zero nodes,
so the lines cost nothing in a chart that re-renders, and they sit under the
marks without a stacking context.
```css
.plot { background-image: linear-gradient(to top,
          transparent 24%, var(--line) 25%, transparent 26%,
          transparent 49%, var(--line) 50%, transparent 51%);
        background-size: 100% calc(100% - var(--chrome)); background-repeat: no-repeat;
        background-position: 0 var(--head) }
```
⚠ A 1% band is sub-pixel on a short plot and 3px on a tall one. Past ~4 lines
write the stops from the scale in the template rather than by hand, and check
that the gradient box still matches the plot after any padding change — nothing
errors when it drifts, the lines just stop meaning anything.

A plot can carry no axis at all. Set the range's endpoints only, each in the
corner it belongs to — highest top-left, lowest bottom-left, the horizontal
extremes on the bottom two — in the smallest mono tier inside the plot's own
frame. The scale arrives in four short strings and every pixel of the box stays
data. It reads as an instrument readout rather than a chart, and it is the one
arrangement that survives a plot narrower than its own axis labels. Inset 6–10px
from the frame.
```css
.plot { position: relative; border: 1px solid var(--line) }
.plot > b { position: absolute; font: 10px/1 var(--mono); color: var(--ink-45) }
.plot > .hi { top: 8px; left: 8px }  .plot > .lo { bottom: 8px; left: 8px }
```
⚠ Four numbers state a range, not a scale: honest where the reader compares
positions, wrong where they might read a value off a point. Name the quantities
somewhere — two bare percentages in the corners say nothing alone.
