---
id: midpoint-switched-ink
category: color
tags: [theme,transition,contrast,color,custom-properties,legibility]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [registered-property-scope]
tension: []
---
A theme toggle that tweens paper and ink on one curve passes through its own
worst contrast: halfway across, the ground is half dark while the type is still
half light. Register the ink tokens with `@property` so they can be scheduled,
then give them zero duration and a delay of half the paper's. The ground glides,
the type cuts over at the crossing, and contrast never drops below the lower of
the two themes.

```css
@property --ink { syntax: "<color>"; inherits: true; initial-value: #1a1714 }
:root { --swap: .72s; --step: calc(var(--swap) / 2) }   /* paper .4–.9s, step half */
body { transition: background-color var(--swap) var(--ease),
                   --ink 0s var(--step), --ink-muted 0s var(--step) }
```
⚠ An unregistered custom property cannot be transitioned, so the delay is
silently dropped and the flip lands on frame one. Register every ink token,
including the one on controls whose ground inverts. Reduced motion zeroes both.

Where the ground changes because the reader scrolled a new section under fixed
chrome, rather than because a theme flipped, the ink has no companion tween to
be halfway with: the ground arrives at a seam, in one frame, and every frame of
a 200–400ms colour tween on the ink is a value that fits neither side. Step it
at the crossing and spend the duration on something the contrast does not
depend on — a fill, a hairline, a shadow.
```css
.chrome { transition: color 0s, background-color .24s var(--ease) }
```
⚠ The crossing is where the *ink* sits, not where the section edge meets the
viewport top — probe on the element's own band or the step lands early and the
label flips while still over the old ground.
