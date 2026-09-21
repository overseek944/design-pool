---
id: render-scale-countered-label
category: type
tags: [type,svg,diagram,label,responsive,legibility]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Text inside a `viewBox` scales with the figure, so one diagram placed in a
narrow column and again across the full measure sets its labels at two sizes —
and the wide placement turns captions into body copy. Authored size is a
function of the render box, not a constant. Put the layout variant on the figure
and step every label role down as the canvas grows, so a caption stays
caption-sized wherever it lands. Roughly inverse to the width ratio: 10–12px in
a column, 7–9px across a full measure.
```css
.fig         .lab { font-size: 10.5px }
.fig.is-wide .lab { font-size: 7px }     /* render box ~1.5× wider */
```
⚠ Below ~7px authored the type stops being legible before the geometry does —
cap the figure's width rather than shrinking further. `vector-effect` has no
text equivalent; this is the whole mechanism.

Counter-scaling has a floor, and below it the answer is subtraction rather than
size. A figure carrying several tiers of annotation — primaries, secondaries, a
ruling caption — loses the lower tiers first as the render box shrinks: pushed
up enough to stay legible they no longer fit, and left alone they are noise.
Drop the tier outright at the breakpoint and raise only what remains, the way a
map generalises as it zooms out. Two tiers survive a column; three want a full
measure.
```css
@media (width <= 560px) {
  .fig .tier-2 { display: none }
  .fig .lab    { font-size: 36px }     /* 20px at the wide render box */
}
```
⚠ Subtraction is only safe on annotation the figure's caption already carries —
a tier holding the only statement of a value has to survive, which sets the
figure's minimum width rather than its label size.
