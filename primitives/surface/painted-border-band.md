---
id: painted-border-band
category: surface
tags: [surface,border,frame,texture,css-only,detail]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
The border box is a paintable band, not just an outline. Give an element a thick
transparent border and two background layers — the fill clipped to `padding-box`,
an image or texture clipped to `border-box` — and the band fills with material
while the interior stays flat. It frames a panel without a pseudo-element, a
mask, or a child in flow, and because the band's width *is* the border width the
outer radius falls out as the inner plus that width. Band 8–32px.

```css
.panel { --rim: clamp(8px, 2vw, 28px);
  border: var(--rim) solid transparent;
  border-radius: calc(20px + var(--rim));
  background: linear-gradient(#161f28, #161f28) padding-box,
              url(rim.jpg) center / cover border-box }
```
⚠ Clip keywords are positional within one shorthand, so any later rule that sets
`background` at all drops the rim silently. A band under ~6px reads as a
mis-rendered border rather than a frame.
