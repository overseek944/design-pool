---
id: ground-notched-section-plates
category: surface
tags: [surface,section,radius,seam,css-only]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Separate full-bleed sections without rules: make each one a plate with rounded
trailing corners over a neutral page ground, so the ground shows in the corner
notches and the sequence reads as stacked sheets. Alternate plate tints; the
footer takes leading corners instead. Radius 24–64px, scaled with viewport.

```css
body    { background: var(--ground) }
.plate  { background: var(--tint); border-radius: 0 0 var(--r) var(--r);
          --r: clamp(20px, 4vw, 56px) }
```
⚠ The notch is only visible where the ground differs from both neighbours —
two adjacent plates on the ground's colour lose the seam entirely.
