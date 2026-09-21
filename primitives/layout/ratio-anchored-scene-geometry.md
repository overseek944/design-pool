---
id: ratio-anchored-scene-geometry
category: layout
tags: [layout,architecture,responsive,tokens,geometry,css-only]
axes: none
cost: 2
seen: 4
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

`calc()` only reaches parameters that are lengths. Where the scene's shape is
carried by things it cannot express — a focal point, an angle, a zoom, an
exponent — name two presets, wide and narrow, and interpolate the whole object
by that same single number. One value still owns the recomposition, the artwork
re-frames continuously instead of jumping at a breakpoint, and a new parameter
costs one key in two objects rather than a rule per breakpoint.
```js
const mix = (a, b) => a + (b - a) * t
const p = Object.fromEntries(Object.keys(WIDE).map(k => [k, mix(WIDE[k], NARROW[k])]))
```
⚠ Only for parameters that are genuinely continuous — interpolating a count, an
index or an enum yields values neither preset intends. Those stay on a
threshold.

A section that wants to be viewport-tall over a fixed-ratio backdrop needs a
second ceiling, or a tall window asks the artwork to fill a box it was never
composed for and `cover` eats the sides. Take the smaller of two: the viewport
height, and the height the picture reaches at full width — `100 / ratio`
expressed in `vw`. On a wide window the ratio binds and the frame stays whole;
on a tall one the viewport binds; written as `min-height`, content is still the
floor under both.
```css
.stage { min-height: min(100svh, 42.9vw) }      /* 42.9 = 100 / 2.33 */
```
⚠ Below the width where the section stops being a picture with copy over it the
`vw` term collapses to a band too short to read in — release it to `auto` there
and let the content set the height.
