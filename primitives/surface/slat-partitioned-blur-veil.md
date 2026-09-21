---
id: slat-partitioned-blur-veil
category: surface
tags: [backdrop-filter,glass,blur,edge,bleed,surface]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: [multi-edge-mask-fade]
---
A blur plate over bleeding artwork says *faded*, and what was behind it is
gone. Split the veil into narrow equal-width slats instead — each its own
`backdrop-filter`, sharing one horizontal light-to-shade gradient — and it
reads as fluted glass standing in front of content that is still there. Earns
its cost at a section edge where an oversized figure runs past its column:
the fins terminate it without masking it. Slats 40–90px, three to five, blur
60–140px. The gradient is what makes a fin a cylinder rather than a grey bar.

```css
.veil   { display: flex; inline-size: 240px; overflow: hidden }
.veil i { flex: 0 0 80px; backdrop-filter: blur(100px);
          background: linear-gradient(90deg, #ffffff40, #0000000a 49%, #ffffff14) }
```
⚠ One backdrop readback per slat per frame — keep the count under six, never
animate the radius, and collapse to a single opaque plate under
`prefers-reduced-transparency`.
