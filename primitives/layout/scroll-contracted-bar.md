---
id: scroll-contracted-bar
category: layout
tags: [header,scroll,sticky,chrome]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
A header can start edge-to-edge and contract into an inset floating capsule
once the page moves — the cue that the chrome has detached from the document. Animate an inner plate's `max-inline-size`,
`border-radius` and background; never the sticky element's own box, which
reflows the page and jitters the links inside it. Threshold 16–48px scrolled.
```css
.plate { max-inline-size: 100%; border-radius: 0; background: transparent;
         transition: max-inline-size .3s, border-radius .3s, background .3s }
[data-scrolled] .plate { max-inline-size: 60rem; border-radius: 999px;
                         background: var(--surface) }
```
⚠ Centre the links inside the plate, not the bar, or they slide during the
contraction. Read the scroll with a passive listener, and keep the outer
height fixed so anchor `scroll-padding-top` stays correct.

The contraction has to shed content, not only width. A bar that loses 30–40% of
its inline size while carrying the same labels crushes them into each other, and
the rounding reads as a bug. Cut the optional half — the secondary clause of a
CTA, the announcement text beside a badge — on the same threshold, so what is
left sits at its rest spacing inside the capsule instead of being squeezed into
it. Whatever is cut has to be redundant; the capsule is the whole nav from that
point down the page.

The change need not be geometric. Hold the box exactly and move only the ground
— transparent over the hero, then a translucent plate with a backdrop blur and a
hairline at the same threshold — and the bar stops reading as chrome over the
art and starts reading as chrome over the document, with nothing to reflow and
no links to re-centre. Plate alpha 0.7–0.85: low enough to show movement behind
it, high enough that its own contrast does not depend on what is passing under.
⚠ The blur holds a compositor layer for the entire scroll. Drop the blur, not
the plate, under `prefers-reduced-transparency` or on a low device tier.

A third ground, with no edge at all: drop the plate and fade in an `aria-hidden`
gradient scrim beneath the bar, taller than it — opaque page colour to
transparent over 4–7rem — on the same threshold. Content dissolves upward into
the chrome instead of being cut by a hairline, so there is no line to keep
aligned at every breakpoint and nothing reads as a bar laid over a document.
```css
.scrim { position: absolute; inset: 0 0 auto; height: 6rem; opacity: 0;
  background: linear-gradient(var(--bg), rgb(var(--bg) / .7) 45%, transparent);
  transition: opacity .3s } [data-scrolled] .scrim { opacity: 1 }
```
⚠ A scrim is not a contrast guarantee — its lower half is nearly transparent, so
the bar's own links must hold their ratio against the darkest thing that can pass
under them. Keep it `pointer-events: none`; it is larger than the controls.

Contract the *label*, not the bar. Animate `max-inline-size` from its measured
width to `0` on the wordmark beside the mark, with `overflow: clip` and
`white-space: nowrap`, and the capsule shrinks around a symbol that never moves
— the mark is the anchor, so nothing in the bar slides and no width has to be
guessed. Fade opacity on the same clock or the last glyphs shear off mid-letter.
```css
.word { max-inline-size: 7.5rem; overflow: clip; white-space: nowrap;
        transition: max-inline-size .5s ease-out, opacity .3s }
[data-scrolled] .word { max-inline-size: 0; opacity: 0 }
```
⚠ A `max-inline-size: 0` label is still in the accessibility tree and still
found by the browser's find — fine for a wordmark the mark already names, wrong
for anything carrying information.

Contract on the compositor instead of on layout. Hold every box still and give
the bar a text-free backing plate as an absolutely-inset sibling, then animate
only that plate's `scaleX` and the two edge clusters' `translateX` — the centre
track is the fixed point, so the links cannot slide because nothing's width ever
changed. Derive the travel from the two widths rather than tuning it. A
`max-inline-size` transition runs on the main thread; this one does not, which is
what it takes to stay smooth *during* the scroll that triggers it.
```js
const target = Math.min(Math.max(840, measured), full)   // 640–1100 target
plate.style.transform = `scaleX(${target / full})`       // plate carries blur, border, radius
edge.style.transform  = `translateX(${(full - target) / 2 + pad}px)`  // pad 8–20px
```
⚠ `scaleX` distorts the plate's `border-radius` into an ellipse — keep it small
(12–20px) or counter-scale a child, and never put text on the plate. Cancel the
edge transforms outright under `prefers-reduced-motion`.

A capsule that animates its own radius has to clip, and clipping is exactly what
a dropdown anchored inside it cannot survive. The clip is only needed where the
morph is visible, so scope it to the widths where it is not needed by the menu:
`overflow: clip` at narrow widths, where navigation is a full sheet rather than
a hung panel, released to `visible` at the breakpoint where the dropdowns
appear.
```css
.plate { overflow: clip }
@media (width >= 64rem) { .plate { overflow: visible } }
```
⚠ Visible overflow gives the corner radius nothing to cut, so any child that
paints to the plate's edge — a grain layer, a gradient — needs `border-radius:
inherit` of its own from that breakpoint up.
