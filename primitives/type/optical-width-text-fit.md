---
id: optical-width-text-fit
category: type
tags: [type,fit,measurement,display,responsive]
axes: {energy: 1, density: 2, weight: 4, finish: 5}
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A headline that must fill a fixed box cannot be sized by character count — `i`
and `W` differ threefold in advance width, so two equal-length strings land at
different optical widths. Sum each glyph's advance relative to a reference
glyph, publish the total as one custom property, and let CSS divide the box
width by it. Clamp both ends so an outlier string cannot break the design.

```css
.fit { --fit: calc(var(--box-w) / var(--advance-sum) * var(--tighten, .9));
       font-size: clamp(1.5rem, var(--fit), 4.5rem) }
```
⚠ The advance table belongs to one family at one weight; reusing it across two
faces mis-sizes by 5–15%. Recompute after font load or the first paint fits the
fallback. `--tighten` .75–1.0, floor 12–24px, ceiling 32–128px.

The whole measurement pass disappears if the text is set in SVG. `textLength`
with `lengthAdjust="spacingAndGlyphs"` makes the engine redistribute tracking
*and* glyph widths to land on an exact length, so the line spans its box at
any string, in any face, with no advance table and no recompute after font
load — a fallback fits identically to the real face. Put the length on the
viewBox width and hold the box with `aspect-ratio` so nothing shifts on load.
```html
<svg viewBox="0 0 1310 245" style="width:100%;aspect-ratio:1310/245" aria-hidden="true">
  <text textLength="1310" lengthAdjust="spacingAndGlyphs" dominant-baseline="hanging">…</text>
```
⚠ Distortion is the price: past roughly ±15% of the string's natural width the
glyphs visibly stretch or crush. Use `lengthAdjust="spacing"` to protect the
letterforms and accept a gap, and keep the readable heading in the document —
this SVG is `aria-hidden`.
