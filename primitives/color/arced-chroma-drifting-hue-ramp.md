---
id: arced-chroma-drifting-hue-ramp
category: color
tags: [color,palette,ramp,oklch,tokens,scale]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---

An accent scale made by holding hue and chroma still while stepping lightness goes grey at both ends and dull in the deep steps. Instead, author the 50–950 steps so chroma arcs: it stays near zero in the palest tints, peaks around 500–600, and falls to half or less by 950. Also rotate the hue 5–15° across the dark half so the deep shades keep their identity rather than turning to mud.

```css
--a-50:  oklch(98% .012 236);  --a-500: oklch(70% .145 236);
--a-600: oklch(64% .15 238);   --a-950: oklch(28% .07 246);
```
⚠ If peak chroma is pushed past sRGB, the ramp clips unevenly across displays. Check each step's gamut, and pick the drift direction per hue by eye.
