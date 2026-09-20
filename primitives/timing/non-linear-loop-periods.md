---
id: non-linear-loop-periods
category: timing
tags: [motion,ambient,rhythm]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 2
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
Give concurrent ambient loops coprime-ish periods (4s / 5s / 7s) and alternate
directions. They drift out of phase and never visibly resync, so a small set of
loops reads as continuous life rather than a repeating pattern.
```css
animation: spin 5s linear infinite;
animation: spin 7s linear infinite reverse;
```

The same rule governs parallel *tracks*, where the period is content width ÷
speed rather than a declared duration. Two lanes at different speeds still
resync if their content is the same length — vary both, and run them in opposite
directions. 55–75px/s reads as drift rather than transport.
