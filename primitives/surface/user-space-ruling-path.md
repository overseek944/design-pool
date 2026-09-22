---
id: user-space-ruling-path
category: surface
tags: [surface,svg,texture,blueprint,diagram,cheap]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Rule a drawing inside its own `viewBox`, not behind it. A single `<path>` whose
`d` chains `M…H…` and `M…V…` subpaths carries the entire grid as one node, in
the coordinates the drawing is authored in — so marks land on lines exactly, and
the ruling crops, scales and retints with the figure. A CSS background grid sits
in device pixels under all of that and can do none of it. Pitch 8–12% of the
short side.

```svg
<path d="M0 40H400M0 80H400M0 120H400M40 0V200M80 0V200M120 0V200"
      fill="none" stroke="currentColor" opacity=".06"/>
```
⚠ Opacity .04–.10 — above it the ruling competes with the drawing's own
hairlines, below it vanishes on a tinted plate. The stroke scales with the
viewBox, so a plate rendered small loses its grid before it loses its subject.

Invert the constraint deliberately where the *spacing* should be fluid and the
weight should not. `preserveAspectRatio="none"` lets the viewBox stretch to any
width, so the tick interval becomes a share of the container;
`vector-effect: non-scaling-stroke` holds every tick at the hairline the rest of
the page already uses. A short scale of alternating tick lengths laid on a
section's top edge then reads as a measured boundary at 390px and at 2560px from
one piece of markup. Majors every fourth or fifth tick.
```svg
<svg viewBox="0 0 200 12" preserveAspectRatio="none" style="width:100%;height:12px">
  <g stroke="currentColor" stroke-width=".35" vector-effect="non-scaling-stroke">
    <line x1="0" x2="0" y1="0" y2="12"/><line x1="5" x2="5" y1="0" y2="6"/></g></svg>
```
⚠ Only the stroke is spared — a glyph, a circle or a round cap in that viewBox
shears with the stretch. Keep the strip to axis-aligned lines, and out of the
a11y tree.

The stretch is not only for ruling. A plot has no intrinsic aspect ratio — x is
time, y is value — so a data polyline is the other thing that belongs in a
stretched viewBox: author it once in data units and let the section choose the
box, 3:1 across a band and near-square in a column, with `non-scaling-stroke`
holding the line at the same token weight through both. What shears is not the
stroke but the *joins*: a miter at a sharp reversal opens as the box widens.
`stroke-linejoin: round` leaves the distortion nothing to act on.
```svg
<svg viewBox="0 0 1440 671" preserveAspectRatio="none" style="width:100%">
  <path d="M0 505L65 528L152 668…" fill="none" stroke="currentColor"
        vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>
```
⚠ Ticks, value labels and the endpoint dot do not survive the stretch. Put them
in DOM positioned in percentages over the SVG — a circle inside that viewBox
arrives as an ellipse.
