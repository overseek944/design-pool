---
id: stroke-restored-display-contrast
category: type
tags: [type,display,contrast,accent,accessibility,ornament]
axes: {energy: 1, density: 2, weight: 4, finish: 4}
cost: 1
seen: 8
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

The other answer is to stop rescuing the accent and move it off the load-bearing
glyphs entirely. A display line's closing full stop carries no meaning — a reader
who cannot resolve it has lost nothing — which makes it the one mark a
high-chroma accent can take with no contrast argument to win. Set every
headline's terminal period in the brand hue and the page gets a recurring
chromatic gesture for one character, while the type itself stays at full ink. It
reads as a system only when it is on every display line; on some it is a typo.
```css
h1 .stop, h2 .stop { color: var(--accent) }
```
⚠ Mark the real character in the markup rather than generating one — a
`content: "."` lands after a headline that already ends in a question mark, and
several screen readers announce generated content as part of the heading.

Set the stroke in the *ground* colour rather than an ink one and the same
declaration becomes a knockout. A label sitting on a diagram's own connectors
normally needs an opaque plate behind it, which punches a rectangle through the
drawing; a 2–4px ground stroke under the fill clears only the letterforms, so
the lines run up to the glyphs and stop. `paint-order: stroke fill` is
load-bearing here — without it the halo eats the contour it exists to protect.
```css
.label { color: var(--ink); paint-order: stroke fill;
         -webkit-text-stroke: 3px var(--paper) }
```
⚠ The ground colour is a guess the moment the label crosses onto anything else —
a filled region, a photograph, an inverted band. Scope it to labels that sit on
the drawing's own paper, and give the text a real `fill` first so an engine
without `-webkit-text-stroke` still shows the label.

The same rescue carries to a highlighted series in a chart. A pale high-chroma
line fails against a light plot, so draw it twice from one `d`: an ink casing
underneath, 1.8–2.5× the width, and the accent on top. The series keeps its hue,
gains an edge on every ground it crosses, and outranks the plain hairlines of
the other series without a second colour.
```svg
<path d="…" stroke="var(--ink)"    stroke-width="4" fill="none"/>
<path d="…" stroke="var(--accent)" stroke-width="2" fill="none"/>
```
⚠ Round both joins and caps, or the casing pokes past the core at every vertex.
