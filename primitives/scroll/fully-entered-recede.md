---
id: fully-entered-recede
category: scroll
tags: [scroll,scroll-driven,view-timeline,scale,transition]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A tall artifact parked between two sections reads as a wall to be got past. Let
it withdraw instead: scrub `scale` down on the element's own view timeline, with
the origin on the edge facing the copy it should retreat behind, so the next
section arrives over a receding object rather than a hard boundary.
`entry 100% exit 0%` is the range that means *wholly on screen* — the effect
never runs while an edge is still clipping the element, which is where a scale
change reads as jitter rather than movement. Floor 0.55–0.8.

```css
@supports (animation-timeline: view()) {
  .stage { transform-origin: top; will-change: transform;
    animation: recede linear both;
    animation-timeline: view(); animation-range: entry 100% exit 0% } }
@keyframes recede { to { scale: .68 } }
```
⚠ A scaled box keeps its layout size, so a gap opens beneath it as it shrinks —
budget the section's spacing at the floor, not at 1. `both` is load-bearing:
without it the artifact snaps back to full size the instant it starts leaving.

In a column of stacked cards, run it only over the leaving half:
`animation-range: contain 0% exit 0%` with a lift of 120–250px plus a scale
floor of 0.94–0.97. Each card drifts up and back as the next one arrives, then
leaves at rest, so the drift never fights the incoming card's entrance.

The mirror is an approach swell. Scale each section up from 0.96–0.98 to 1 over
the first 25–35% of its view progress, origin top, so a block settles to full
size as it arrives. The amount is too small to see as motion and reads as
the page firming up. Skip it below ~768px, where a scaled column exposes
side gutters.
