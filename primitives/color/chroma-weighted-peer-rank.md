---
id: chroma-weighted-peer-rank
category: color
tags: [color,hierarchy,accent,icon,grid,contrast]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Two grids of identical cards on one page read as equally important, and ranking
them by size breaks the track they both reflow on. Rank them by accent strength
instead: the lead group's mark knocked out of a saturated fill, the subordinate
group's drawn in the same hue over an 8–15% tint of it. Geometry, radius and
spacing stay identical, so both grids collapse to one column on the same rule —
and the rank survives there, where every size difference has already gone.

```css
.mark     { background: var(--accent); color: var(--paper) }
.mark.sub { background: color-mix(in oklab, var(--accent) 12%, var(--paper));
            color: var(--accent) }
```
⚠ The tinted mark is still a non-text UI element owing 3:1 against its own
ground, and a low mix of a pale hue rarely clears it. Score the lightest member
of the set, not the mid one.
