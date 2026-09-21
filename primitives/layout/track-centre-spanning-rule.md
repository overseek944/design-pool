---
id: track-centre-spanning-rule
category: layout
tags: [layout,grid,connector,geometry,correctness,responsive]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A rule joining a row of N equal columns belongs between the *centres* of the
outer two, not between the container edges — and `50%/N` is wrong the moment
there is a gap, so the offset gets eyeballed once and breaks at the next
breakpoint. Each track is `(100% − (N−1)g)/N` wide, so its centre sits
`50%/N − (N−1)g/(2N)` in from the edge. Write the expression and the rule
re-solves for any column count, gap or width.

```css
.track { display: grid; grid-template-columns: repeat(var(--n), 1fr); gap: var(--g) }
.track::before { content: ""; position: absolute; top: 18px; height: 2px;
  inset-inline: calc(50% / var(--n) - var(--g) * (var(--n) - 1) / (2 * var(--n))) }
```
⚠ Equal `1fr` tracks only; a mixed template wants the line placed by grid area
instead. Retract it at the breakpoint where the row stacks, or a horizontal rule
hangs across a vertical list.
