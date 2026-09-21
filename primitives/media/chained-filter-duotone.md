---
id: chained-filter-duotone
category: media
tags: [media,color,filter,normalisation,texture]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 8
requires: []
conflicts: []
completes: []
tension: []
---
Supplied photographs come from different cameras, days and light, and a row of
them reads as a scatter however well each is cropped. Collapse the set onto one
hue with a filter chain. Order is the whole trick: `grayscale()` first so
no source colour survives to fight the tint, `sepia()` to lay down one hue
everywhere, then `hue-rotate()` to steer that hue to the palette. Rotate before
sepia and every photograph rotates from a different start. Sepia 0.3–0.6 sets
tint depth; trim saturation and contrast last.

```css
.duotone { filter: grayscale(1) sepia(.4) hue-rotate(175deg)
                   saturate(.75) brightness(.94) contrast(1.02) }
```
⚠ `filter` makes the element a containing block and a stacking context —
absolutely-positioned children re-anchor to it and blending above it stops
reaching the page. Put it on the image, not the card.

Where the tint must be *removable* — revealed on hover or focus — the filter chain
is the wrong shape: it has no term to fade, and re-running it to neutral crossfades
through the wrong hues. Desaturate the image, then lay the palette colour over it in
an `::after` at `mix-blend-mode: color` and animate only that layer's opacity. The
tint is now the token itself rather than a `hue-rotate` angle found by trial, and
`0 → 0.4` is the whole interaction. Overlay 0.35–0.5.
```css
.shot img     { filter: grayscale(1) contrast(1.04); transition: filter .4s }
.shot::after  { content:""; position:absolute; inset:0; background: var(--accent);
                mix-blend-mode: color; opacity:.42; transition: opacity .4s }
.shot:hover img, .shot:focus-within img { filter: none }
```
⚠ Pair every `:hover` with `:focus-within` or the true photograph is mouse-only.
The blend needs `isolation: isolate` on the frame, or on some stacking contexts it
reaches past the image to the page behind it.

Flattening a *set of marks* onto one ink opens the chain differently.
`grayscale(1)` preserves luminance, so a pale wordmark and a dense roundel in
the same row stay light and dark after tinting and the row still reads as a
scatter. Open with `brightness(0)` instead: every source collapses to one
silhouette and the tail of the chain steers that single black to the palette.
Identity of ink is the point — a logo row is a list, not a set of pictures.
Find the tail once against a target swatch and reuse it across the set;
invert 20–40%, saturate 600–1200%, hue-rotate the rest of the way.
```css
.mark { filter: brightness(0) invert(28%) sepia(15%) saturate(950%)
                hue-rotate(78deg) brightness(92%) contrast(88%) }
```
⚠ Only for marks whose meaning is their shape, and only for art with an alpha
channel — a mark on an opaque plate comes out a solid rectangle. Those want
`mask-image` over a painted background instead, which also costs no filter.

Where the set must keep its own colour, grade the chain instead of collapsing
it. Hold hue and step brightness and saturation down by the image's *rank* in
the argument — subject, supporting, background — so a dark page gains
atmospheric depth rather than presenting every picture at equal insistence.
Two terms, three or four rungs, monotonic in both: `brightness` .95 → .70,
`saturate` .85 → .50. Ship the rungs as tokens or the ladder drifts the first
time a section is added.
```css
.fig--subject { filter: brightness(.95) saturate(.82) }
.fig--support { filter: brightness(.80) saturate(.70) }
.fig--ground  { filter: brightness(.72) saturate(.55) }
```
⚠ Text burnt into an image is dimmed with it — a caption at rung three can
drop under 4.5:1 against a ground the unfiltered source cleared. Set captions
in the DOM, never in the picture.

A set mixing monochrome archival material with modern colour does not want the
chain at all. Collapsing everything onto one hue throws away the only colour in
the set that is carrying anything, and leaving it raw lets one saturated frame
outrank six greys. `grayscale()` under about 0.2 is the whole treatment: enough
to pull the outlier toward the page's neutral so the row reads as one register,
not enough for the photograph to stop being in colour. Amount 0.08–0.18 —
past a quarter it starts reading as a deliberate wash rather than as seating,
and the set looks faded instead of composed.
```css
.plate img { filter: grayscale(.14) }
```
⚠ Judge it against the monochrome frames, not against the original — the amount
that seats a photograph beside a grey one is far below the amount that looks
like anything on its own, so it will read as no change at all in isolation.
