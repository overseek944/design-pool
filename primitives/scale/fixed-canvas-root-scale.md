---
id: fixed-canvas-root-scale
category: scale
tags: [scale,layout,proportion,transform,responsive]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 2
seen: 13
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

Where the stage is a transformed scene rather than a flat canvas, the factor
has nowhere of its own to live: a second `transform` on the same element
replaces the first, silently flattening the scene. Concatenate the scale into
the same declaration as the scene's own rotation, and let the breakpoint swap
the whole declaration rather than one term. A component whose children are
absolute pixel coordinates has no fluid path at all — a static per-breakpoint
factor of 0.6–0.85 is the correct answer, not a failure to be responsive.
```css
.stage { width: min(78vw, 560px); transform: rotateX(52deg) rotate(-37deg) }
@media (max-width: 40rem) {
  .stage { width: 480px; transform: rotateX(52deg) rotate(-37deg) scale(.7) } }
```

Container query units give the same factor with no script, no first-paint
flash and no transform at all: publish `--px: calc(100cqw / <designWidth>)` on
an `inline-size` container and spend it as `calc(N * var(--px))`, where N is
read straight off the mock. Nothing is transformed, so the scaled thing still
composes with a camera or a parallax above it, and it nests — a 1922-wide
stage holding a 780-wide panel each declare their own. Where the content is a
real product surface, redefine the *design system's* spacing, type and radius
tokens through the unit inside that scope and every component renders at
miniature without knowing.
```css
.shell { container-type: inline-size; aspect-ratio: 1922 / 1320 }
.stage { --px: calc(100cqw / 1922) }
.stage .panel { --inset-md: calc(12 * var(--px)); --body-size: calc(14 * var(--px));
                inline-size: calc(486 * var(--px)) }
```
⚠ Text sized this way carries the same WCAG 1.4.4 risk as the transform does,
so the miniature must never be the only copy of anything that has to be read.

Let the design width live in CSS rather than in the script that divides by it.
Publish it as a property on the shell, have the observer read it back, and one
generic scaler serves every stage on the page — a hero mock at 540, a diagram at
1100 — with the number sitting beside the `aspect-ratio` it has to agree with
instead of in a module nobody edits when the mock is redrawn.
```css
.shell { --dw: 540; aspect-ratio: 540 / 300 }
```
```js
const dw = parseFloat(getComputedStyle(el).getPropertyValue('--dw')) || 1
new ResizeObserver(([e]) => el.style.setProperty('--f', e.contentRect.width / dw)).observe(el)
```
⚠ The ratio and the width are still two statements of one decision — derive the
`aspect-ratio` from the same pair of properties or a redraw desynchronises them.

The stepped per-breakpoint factor above answers width; a stage that must fit
between fixed chrome and the fold is bound on *height* instead, and no width
query sees the problem. Step the same factor off `max-height` — a short laptop
and a phone in landscape are the readers who lose the bottom of a diagram.
Three steps over 750–1000px of height, 0.6–0.85, is enough.
```css
@media (max-height: 1000px) { .stage { transform: scale(.8) } }
@media (max-height: 750px)  { .stage { transform: scale(.62) } }
```
⚠ The reserved box has to shrink with it or the scaled stage leaves a growing
band of dead space under itself at every step.

A design width is not required to scale a subtree, and fixing one costs the
content its breakpoints. Where the region must still reflow — a product replica
that has to answer a phone and a desktop — give the scaled child a *reciprocal
percentage* width and let the wrapper state the compensated height: it lays out
against a box `1 / f` wider than the one it occupies, then shrinks back onto it
exactly. Apparent density drops; every query inside still fires at the width the
content actually got. Factor 0.82–0.92.
```css
.wrap  { --f: .88; height: calc(760px * var(--f)); overflow: hidden }
.inner { width: calc(100% / var(--f));
         transform: scale(var(--f)); transform-origin: top left }
```
⚠ The height is the one term that cannot be derived — it is the child's
*unscaled* height, so anything sized by its own content needs a measured value
rather than a literal, and a wrong one crops or leaves a band.

The inverse is right where the miniature is decoration rather than a readable
canvas: do not scale at all — author it natively at 4–7px type. Glyphs stay
hinted instead of resampled, there is no transform, no wrapper height to keep
in sync and no WCAG 1.4.4 exposure, because nothing at that size claims to be
text. The composition then has to read from blocks, rules and colour fields
alone, with the lettering as texture.
```css
.mini { font-size: 5px; line-height: 1.4 }       /* 4–7px, never above 8 */
.mini, .mini * { user-select: none }
```
⚠ `aria-hidden` the whole figure and restate anything load-bearing in real
markup beside it. Sub-pixel paddings and hairlines round inconsistently across
engines at this scale — quantise the internal spacing to whole pixels.
