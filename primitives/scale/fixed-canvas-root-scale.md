---
id: fixed-canvas-root-scale
category: scale
tags: [scale,layout,proportion,transform,responsive]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: [zoom-as-reflowing-scale]
---
Author the page once at one pixel width and scale the whole canvas to the
viewport from the root. Nothing reflows and nothing is a token: radii, hairlines,
gaps and type all move by the same factor, so a composition is exact at every
width rather than approximately right. The design width is the decision: 1024–1440
keeps the factor near 1 where most readers sit.

```css
:root { --f: calc(100vw / 1280) }        /* .55–1.9 usable */
.canvas { width: 1280px; transform: scale(var(--f)); transform-origin: 0 0 }
.wrap   { height: calc(var(--authored) * 1px * var(--f)) }
```
⚠ A scaled box keeps its authored size, so the page under-scrolls above 1 and
overflows sideways below it — the wrapper height above is mandatory, not tidying.
Type sized this way ignores browser zoom and user font size: WCAG 1.4.4 risk, so
narrow widths need their own design width, not a smaller factor.

Inside a fluid column `100vw` is the wrong denominator — measure the container
and publish `container / designWidth` as the property, so the factor tracks the
column through sidebars and breakpoints.
```js
new ResizeObserver(() => box.style.setProperty('--f', box.clientWidth / 1400)).observe(box)
```

The wrapper height that entry demands is better spent as an `aspect-ratio` on
the shell: the shell reserves the exact box from first paint, the stage is
absolutely positioned inside it, and the scale factor no longer has to be
mirrored into a height calculation that can drift from it. Gate the stage's
opacity on the first measurement too — a `ResizeObserver` fires after layout, so
without it the unscaled canvas paints at full size for a frame.
```css
.shell { aspect-ratio: 1200 / 746; position: relative; width: 100% }
.stage { position: absolute; inset: 0 auto auto 0; width: 1200px; height: 746px;
         transform-origin: 0 0; transform: scale(var(--f)) }
```

Where the WCAG risk above is unacceptable, keep the factor and drop the
transform: declare a unitless scalar and multiply it into each derived length.
Layout still reflows, `rem` still answers browser zoom, and the component resizes
as one object — a caller rescales the whole part by setting one number, with a
nested second scalar for a sub-part that needs to run larger than its parent.
```css
.part  { --s: 1; --gap: calc(.5vw * var(--s) * var(--sub, 1)) }
@media (max-width: 40rem) { .part { --s: 3.6 } }
```
⚠ Every length must carry the multiplier or the component tears apart at extreme
values — one forgotten padding is the bug, and it only shows at the far end.
