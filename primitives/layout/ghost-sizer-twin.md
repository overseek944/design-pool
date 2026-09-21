---
id: ghost-sizer-twin
category: layout
tags: [layout,architecture,correctness,hover,reflow]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A box that grows on interaction — scales, lifts on Z, expands a hidden line —
either shoves its neighbours or needs its final size hard-coded. Render the
content twice instead: one copy `visibility: hidden` in normal flow reserving
the box, and an absolutely-positioned twin over it carrying every visual and
every transform. The reservation is measured by the engine from the real
content, so it survives a font swap, a translation and a fluid type scale,
which a hand-written `min-height` does not. Give the hidden copy the same
padding and a transparent border matching the widest state.

```css
.slot  { position: relative; display: inline-block }
.sizer { visibility: hidden; border: 2px solid transparent; padding: .12em .18em }
.twin  { position: absolute; inset-inline: 0; top: 0; padding: .12em .18em;
         border: 2px solid transparent; transition: transform .45s var(--ease) }
```
⚠ The content is in the accessibility tree twice. `aria-hidden` the sizer and
keep the real copy in the twin, or every label is announced doubled.
