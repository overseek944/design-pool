---
id: axis-swept-plot-window
category: reveal
tags: [reveal,chart,svg,clip-path,motion,data]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A line drawn on with `stroke-dashoffset` is revealed by arc length, so on one
clock a volatile series falls behind a flat one and the two stop agreeing about
where in x they are. Clip to a rect whose width animates instead: every path
appears in the plot's own ordering, and any series left outside the clip — a
baseline, a reference index — stays whole from the first frame. Sweeps 1.4–3s,
the endpoint marker landing at 80–90% of that.

```svg
<clipPath id="w"><rect height="100%" width="0">
  <animate attributeName="width" to="1440" dur="2.4s" fill="freeze"/></rect></clipPath>
<path d="M0 505L65 528…" clip-path="url(#w)" vector-effect="non-scaling-stroke"/>
```
⚠ A clip cuts the stroke square: this reads as a wipe, never as a nib. The
rect is user space — under `preserveAspectRatio="none"` its width is viewBox
units, not pixels.
