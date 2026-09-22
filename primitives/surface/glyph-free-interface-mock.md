---
id: glyph-free-interface-mock
category: surface
tags: [mock,decoration,product,placeholder,texture,accessibility]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A decorative product mock beside a headline competes with it the moment it holds
readable text — two things to read, one of them fiction. Draw its contents as
geometry: bars on the type's own metrics with fully-rounded ends, a filled square
for a thumbnail, discs for avatars, a hairline per divider. It reads as an
interface at a glance, makes no claim and needs no translation. Bar height 4–6px
at a 6–9px rhythm, radius half the height, one tint two steps off the surface.

```css
.bar   { height: 5px; border-radius: 999px; background: var(--ghost);
         margin-block-end: 7px }
.thumb { width: 64px; aspect-ratio: 1; border-radius: 8px; background: var(--ghost) }
```
⚠ Mark the block `aria-hidden`. Bars are also the skeleton-loading idiom, so give
the group one card of real copy or a reader waits for content that never arrives.
