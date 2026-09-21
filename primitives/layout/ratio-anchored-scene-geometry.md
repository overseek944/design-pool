---
id: ratio-anchored-scene-geometry
category: layout
tags: [layout,architecture,responsive,tokens,geometry,css-only]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A layered illustration sized in pixels at one breakpoint and re-cropped at the
others is three sets of art. Publish two numbers instead — the stage's height,
and one unitless ratio for the line everything registers to — then derive each
layer in `calc()`. Layers above the line take
`calc(var(--anchor) * 100%)`, those below take the complement, and each prop's
size is a fraction of the stage clamped against one of the viewport. The scene
recomposes at any aspect instead of cropping, with nothing measured.

```css
.stage { --anchor: .73; --h: calc(100svh - var(--nav)); height: var(--h) }
.sky   { top: 0; height: calc(var(--anchor) * 100%) }
.ground{ top: calc(var(--anchor) * 100%); bottom: 0 }
.prop  { height: min(.155 * var(--h), .09 * 100vw);
         bottom: calc((1 - var(--anchor)) * 100% - var(--sink)) }
```
⚠ Every layer depends on one number, so a wrong `--anchor` breaks the scene
everywhere at once. Keep it in one declaration; overriding it per
breakpoint is what the fractions exist to avoid.
