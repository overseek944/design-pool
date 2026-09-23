---
id: glyph-free-interface-mock
category: surface
tags: [mock,decoration,product,placeholder,texture,accessibility]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 2
seen: 6
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

Where the contents are code, geometry throws away exactly what makes code
recognisable — the indent profile, the token colour, the shape of a call. Keep
the real listing and take it under reading size instead: 6–8px with the syntax
colour intact and every token at 30–40% alpha. It is unmistakably code at a
glance and cannot be read, so it competes with nothing, and it gains a state
bars cannot carry — lifting one line's tokens to full alpha marks a position
inside something the reader never has to parse.
```css
.listing      { font: 6.5px/1.7 var(--mono); white-space: pre; overflow: hidden }
.listing span { opacity: .35; transition: opacity .5s }
.listing .live span { opacity: 1 }
```
⚠ Real strings at 6px are still real strings: `aria-hidden` the block and keep
invented identifiers out of it, or find-in-page and a screen reader surface copy
nobody meant to publish.
