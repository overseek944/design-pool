---
id: stroke-restored-display-contrast
category: type
tags: [type,display,contrast,accent,accessibility,ornament]
axes: {energy: 1, density: 2, weight: 4, finish: 4}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A display glyph filled with a high-chroma accent fails against its ground, and
darkening it throws away the reason it was chosen. Outline it instead: a text
stroke in the ink colour carries the edge the fill cannot, so the fill keeps its
saturation and the letterform its shape. The stroke is centred on the contour
and eats inward — pair it with a light weight, never a bold. 1–2px across
4–10rem.

```css
.mark { font-size: clamp(4rem, 9vw, 10rem); font-weight: 300;   /* 250–350 */
        color: var(--accent); -webkit-text-stroke: 1px var(--ink) }
```
⚠ Not a contrast fix for running text — below roughly 3rem the stroke closes
apertures and the glyph gets harder to read, not easier.

Inverted — transparent fill, stroke alone — the same declaration gives a ghost
layer: an outlined word set behind a heading, or oversized type running as a
band, present as structure without competing for ink. Two things then bite that
the filled form never hits. An engine without `-webkit-text-stroke` renders
nothing at all, so the `@supports not` branch has to restore a faint fill; and
the stroke is centred on the contour, so `paint-order: stroke` keeps the
arithmetic unchanged when a filled `<em>` is nested inside.
```css
.ghost { color: transparent; paint-order: stroke;
         -webkit-text-stroke: 1.2px var(--line-faint) }
@supports not (-webkit-text-stroke: 1px black) { .ghost { color: var(--line-faint) } }
```
⚠ Give it `user-select: none` and `aria-hidden` — it is a texture, and a screen
reader otherwise announces a word the page never actually says.

Author the stroke width in `em`, not pixels. A display line sized with `clamp()`
spans a 2–3× range across breakpoints, and a fixed px stroke tracks none of it:
tuned at the large end it closes apertures on a phone, tuned at the small end it
thins to nothing on a wide screen. One em-relative value holds the proportion at
every size the clamp can resolve. Roughly .03–.05em, and `paint-order: stroke
fill` so the outline sits under the fill rather than eating into the contour.
```css
.word { font-size: clamp(2.6rem, 7vw, 6rem);
        -webkit-text-stroke: .042em var(--accent); paint-order: stroke fill }
```
⚠ `-webkit-text-stroke` resolves `em` against the element's own font-size, so an
inline `<em>` set at a different size inside the line gets a different weight —
set the stroke on the sized element, not on a wrapper.
