---
id: ink-channel-probed-icon
category: media
tags: [icon,svg,media,correctness,currentcolor]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An icon pasted from an arbitrary set carries its colour on one of two
properties, and which one is a property of the set, not of the icon: outline
families paint `stroke`, solid families paint `fill`. A control that writes both
turns outline glyphs into blobs. Probe the markup once — if any element declares
`stroke`, bind `stroke` to `currentColor` and leave `fill: none`, otherwise bind
`fill` — and expose stroke width as a range of 1.25–2px rather than the value
the file shipped with.

```js
const ink = svg.querySelector('[stroke]:not([stroke="none"])') ? 'stroke' : 'fill'
svg.style.setProperty(ink, 'currentColor')
svg.style.overflow = 'visible'
```
⚠ A stroke is centred on its path, so widening one clips against the `viewBox`
unless the root is `overflow: visible` — which then lets the glyph paint outside
its own box and over a neighbour.
