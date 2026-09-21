---
id: theme-shifted-series-window
category: color
tags: [color,tokens,theming,data,chart,contrast,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A series palette tuned on paper goes muddy against ink, and inverting it is
wrong: an ordered series must hold its direction or the largest bar reads
palest. Author each hue as one ramp of n+1 stops and let a theme window n
consecutive stops, sliding one rung toward the ground's opposite. Order
survives, every member gains the lightness a dark ground wants, and one spare
stop per hue buys both themes. Four stops across 40–60 points of lightness.

```css
:root { --s1:#90cbff; --s2:#58b1ff; --s3:#258eff }   /* stops 2–4 */
.dark { --s1:#d6ebff; --s2:#90cbff; --s3:#58b1ff }   /* stops 1–3 */
```
⚠ The windows overlap, so series 2 in dark wears series 1's light colour. A
reader who learned the key, or sets an export beside the live chart, has one
colour meaning two things — ship the legend with the theme.
