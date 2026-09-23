---
id: alpha-threshold-fuse-filter
category: media
tags: [svg,filter,mark,liquid,state]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 2
seen: 3
requires: []
conflicts: []
completes: [instance-scoped-filter-id]
tension: []
---
Separate shapes read as one substance when a blur is pushed back through an
alpha ramp: blur the group, then multiply alpha hard and subtract, so each halo
snaps to an edge and two overlapping halos resolve as one silhouette. Members
drifting apart then stretch and part like a liquid. Blur 2–5% of a member's
radius, multiplier 15–30 against an offset near half of it — softer and the
edge never re-forms, harder and they separate before touching.

```svg
<filter id="fuse"><feGaussianBlur stdDeviation="3.2" result="b"/>
<feColorMatrix in="b" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -9"/></filter>
```
⚠ The group re-rasterises every frame — a small mark, never a field.
Antialiasing is discarded, so hairlines inside the group vanish.

The warning about antialiasing is an instruction about layering, not a limit:
give the filter the shapes only and put every glyph, icon and hairline in an
unfiltered sibling absolutely positioned over it. The blur then has nothing
legible to eat, and a `visibility: hidden` copy of the label inside the filtered
group keeps the fused shape sized by its own text rather than by a hard-coded
width.
```css
.group { filter: url(#fuse) }                 /* shapes, no content */
.overlay { position: absolute; inset: 0; pointer-events: none }
```
⚠ The overlay must not inherit the filter — a filtered ancestor applies to the
whole subtree, so it is a sibling of the group, never a child.

Two declarations decide whether the filter is stable at all. `color-interpolation-filters="sRGB"`
stops the default linearRGB space shifting the fused colour away from the
members' own fill, and an explicit filter region — `x/y -25%`, `width/height
150%` — stops the default `-10%/120%` box clipping a blur wide enough to bridge
the gap. Pair `filterUnits="objectBoundingBox"` with
`primitiveUnits="userSpaceOnUse"` so `stdDeviation` stays in pixels and one
filter serves members of different sizes.
```svg
<filter id="fuse" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"
  color-interpolation-filters="sRGB" x="-25%" y="-25%" width="150%" height="150%">
```
⚠ A filtered subtree is not guaranteed to re-rasterise per frame in every
engine: WebKit caches it, so a member animated on `transform` slides out of its
own halo. Animate a layout property — `right`, `left` — inside a filtered group
there, and keep `transform` for engines that recompute.
