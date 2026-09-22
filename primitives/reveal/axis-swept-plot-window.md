---
id: axis-swept-plot-window
category: reveal
tags: [reveal,chart,svg,clip-path,motion,data]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 3
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

Written as CSS the same wipe gains a timeline: `clip-path: inset(0 100% 0 0)`
animating to `inset(0 0 0 0)` is a CSS animation, so it takes
`animation-timeline` and can be scrubbed by scroll, where the SMIL `<animate>`
form cannot — the two timing models do not meet. It also needs no id and no
`clipPath` element. Put the declaration on the `<svg>`, never on the `<path>`.
```css
@keyframes wipe { from { clip-path: inset(0 100% 0 0) } to { clip-path: inset(0) } }
.plot { animation: wipe linear both; animation-timeline: --frame;
        animation-range: cover 20% cover 52% }
```
⚠ On a `<path>` the reference box is the geometry's *fill* box, so the stroke is
cut in half wherever the line touches it — the apex flattens and the end caps
square off, at `inset(0)` as much as mid-sweep, and `stroke-box` does not rescue
it. On the `<svg>` element the box is a real border box and one clip sweeps every
series together, which is the agreement this entry exists to keep.
