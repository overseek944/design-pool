---
id: render-scale-countered-label
category: type
tags: [type,svg,diagram,label,responsive,legibility]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
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
