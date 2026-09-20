---
id: fixed-attachment-band
category: scroll
tags: [scroll,parallax,media,surface,progressive-enhancement,performance]
axes: {energy: 2, density: 1, weight: 3, finish: 3}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A full-bleed decorative band whose image is pinned to the viewport rather than
to the band: the window travels over a still picture and the depth cue costs no
script, no listener, no transform. It earns its place as a breath between two
dense sections — the one interstitial where nothing is being argued. Height
40–85vh.

```css
.band { block-size: 60vh; background: url(x.jpg) center/cover fixed no-repeat }
@media (max-width: 720px) { .band { background-attachment: scroll;
                                    block-size: 45vh } }
```
⚠ Pinned backgrounds repaint the whole surface on every scroll tick: affordable
on an `aria-hidden` band, never behind text. iOS ignores it and paints a static
crop, so the band must still read at rest.

The repaint bill is a property of the *source*, which is what the never-behind-
text limit above is really measuring. A few hundred bytes of inline
`feTurbulence` at a 120–220px tile rasterises once and repeats for almost
nothing, so the same pinned trick will carry a whole document: a grain film the
page slides beneath rather than a texture that scrolls with it — the difference
between paper and a printed picture of paper. Alpha 0.15–0.3, and still detach
below the mobile breakpoint.
```css
body { background: url("data:image/svg+xml,…feTurbulence…") 0 0/180px 180px fixed }
@media (max-width: 900px) { body { background-attachment: scroll } }
```
⚠ One pinned layer for the page, never one per section — the cost is charged per
painted surface and they compound.

Put the film *over* the content instead of behind it and the two costs above
both go away: a fixed pseudo-element on the root is one composited layer that
never repaints on scroll, and iOS honours it where it ignores
`background-attachment`. It buys the same page-slides-beneath read with no
background to coordinate and no per-section opt-in. The price is that it tints
every glyph underneath, so the alpha has to drop by roughly a factor of five —
3–6% rather than 15–30% — and it must be excused from hit-testing.
```css
body::after { content: ""; position: fixed; inset: 0; z-index: 900;
  pointer-events: none; opacity: .04; background: url("data:image/svg+xml,…") }
```
⚠ Without `pointer-events: none` the plane swallows every click on the page.
Audit body-text contrast *through* it — the measured ratio is what ships, not
the token's.
