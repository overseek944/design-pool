---
id: gradient-through-text
category: light
tags: [color,type,effect]
axes: {energy: 3, density: 2, weight: 4, finish: 3}
cost: 2
seen: 52
requires: []
conflicts: []
completes: []
tension: []
---
`background-clip: text` with a transparent fill turns a headline into a window
onto a gradient or animated layer. Animate the background, not the text, and the
letterforms stay crisp.
```css
background: linear-gradient(...); -webkit-background-clip: text; color: transparent;
```

Build the gradient out of `currentColor` mixed toward transparent and the
effect stops needing a colour of its own: one class shimmers correctly over any
inherited text colour and in both themes, because the highlight *is* the text.
Sweep `background-position` across a `200%` background rather than moving the
element.

```css
.shimmer { background-image: linear-gradient(90deg,
    color-mix(in oklab, currentColor 45%, transparent) 38%, currentColor 50%,
    color-mix(in oklab, currentColor 45%, transparent) 62%);
  background-size: 200% 100%; animation: sweep 2s linear infinite }  /* 1.6–3s */
```
⚠ The reduced-motion branch must restore `-webkit-text-fill-color: currentColor`
and drop the image. `animation: none` alone leaves the fill transparent — the
text is simply gone. Same trap behind any `@supports` fallback.

A gradient across a headline is only as legible as its worst stop, and hues
taken straight off the palette usually put that floor well under the body text's.
Mix every stop 15–30% back toward the foreground colour: the sweep survives, the
contrast floor is set by a token that already passes, and one stop list then
works in both themes.
```css
background: linear-gradient(135deg, var(--fg) 0%,
  color-mix(in oklab, var(--brand) 75%, var(--fg)) 60%, var(--accent) 100%);
```
⚠ Score each stop against the ground on its own — an average of the stops is not
a contrast ratio, and the failing one is usually the saturated middle.

Sweeping `background-position` plays or stops and nothing else. Make the
highlight's *position* a registered `<percentage>` and write every stop relative
to it — `background-size: 100% 100%`, no tiling — and the sweep becomes a value:
transitionable, interruptible, settable from scroll or from state, parkable
mid-travel. Shape it with graded shoulders rather than three stops (±2–3% glint,
±7% soft, ±14–23% falloff) and it reads as a glint over a surface instead of a
band crossing it. Run −18%→118% so it clears both ends.
```css
@property --sweep { syntax: "<percentage>"; inherits: false; initial-value: -18% }
background-image: linear-gradient(100deg, var(--base) 0,
  var(--soft) calc(var(--sweep) - 7%), var(--hot) var(--sweep),
  var(--soft) calc(var(--sweep) + 7%), var(--base) calc(var(--sweep) + 23%));
```
⚠ Wrapped text needs `box-decoration-break: clone` or the gradient spans the
whole inline box and every line after the first gets only its tail.

`background-clip: text` needs `display: inline-block`, and that box clips
ascenders and descenders the moment leading drops below about 1.3em — the tell
is a shorn `g` or a flattened `f` that only appears on the tight headline.
Compensate symmetrically: pad by half the shortfall and pull it back with a
negative margin of the same size, so the paint box grows and the layout box
does not move.
```css
.fill { display: inline-block;
  padding: max(0em, calc((1.3em - var(--lh)) / 2));
  margin:  min(0em, calc((1.3em - var(--lh)) / -2)) }
```

Paint the sweep on a duplicate instead of clipping the real text. A pseudo-
element stacked over the element carries `content: attr(data-text)`, the
gradient and the transparent fill, while the base keeps an ordinary opaque
colour — so every failure of the clip degrades to legible text rather than to
nothing: unsupported engine, forced colours, a dropped background, a
reduced-motion branch that only stops the animation. Selection and find-in-page
still hit the real node, and `drop-shadow` on the duplicate blooms from the
glyph outline, which no fill can do.
```css
.shine { position: relative; color: var(--fg) }
.shine::before { content: attr(data-text); position: absolute; inset: 0;
  background: var(--sweep); -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 5px #ffffff73) }
```
⚠ Mark the duplicate `aria-hidden` and pointer-transparent, and accept that the
string now lives in two places — it will drift the first time one is edited.

The fill can be a photograph rather than a gradient, and then the size is the
whole argument: below roughly 12–15% of the viewport width the picture inside
each counter is unreadable grain and the word just looks dirty. Set it at
25–40vw with the wrapper clipping the overflow, tighten tracking to −0.02 to
−0.04em so the letterforms read as one aperture onto one scene rather than
several, and place the focal band of the image with `background-position`
against the x-height, not the box.
```css
.plate { font-size: 34vw; line-height: 1.2; letter-spacing: -.03em;
  background: url(scene.jpg) center 58% / cover; color: transparent;
  -webkit-background-clip: text; background-clip: text }
```
⚠ No contrast floor is achievable against arbitrary photography — this is
decoration, and the string must exist as real text somewhere else on the page.

Size the glint in `ch` rather than in percent — `calc(3ch + 40px)` — and one
class reads the same over a 12px label and a 72px headline, where a percentage
spread thins to a hairline on the long line. The background then has to be
`calc(200% + spread * 2)` wide so the sweep still clears both ends, and the
travel is `background-position` from `100% 0` to `0 0`. Tilt the gradient
15–25° off vertical and the highlight crosses the letterforms diagonally
instead of wiping them column by column.
```css
.shimmer { --spread: calc(3ch + 40px);
  background-size: calc(200% + var(--spread) * 2) 100% }
[dir=rtl] .shimmer { animation-direction: reverse }
```
⚠ The sweep travels with the writing direction and reads backwards in RTL —
reverse it there, which the percentage form hides and the `ch` form makes
obvious.

An image can be the fill as readily as a gradient, and it carries a failure the
gradient does not: a 404, a blocked request or a slow decode leaves a
transparent fill over nothing and the word is simply gone. Stack a flat colour
beneath it in the same `background-image` list — a two-stop gradient of one
opaque value — and the clip resolves to solid ink whenever the top layer is
missing. It costs one comma.
```css
.mark { background-image: url(fill.avif), linear-gradient(var(--fg), var(--fg));
  background-size: cover; -webkit-background-clip: text; color: transparent }
```
⚠ The fallback is a colour, not the artwork: score it against the ground on its
own, because on a large fill it is what most first paints actually show.

Percentage stops tie the highlight's width to the element, so the same class
gives a thin glint on a headline and a wash across a caption. Set the band in
`ch` instead — one advance width of the face at its own size — and it stays the
same optical fraction of the word at every step of the type scale, with a small
pixel term so short strings still get a readable band. Size the background to
`calc(200% + 2 × band)` so the sweep clears both ends. Band 2–5ch plus 20–50px.
```css
.sweep { --band: calc(3ch + 40px);
  background-size: calc(200% + var(--band) * 2) 100% }
```
⚠ `ch` resolves against the *fallback* face until the webfont lands, so the band
jumps width on swap — acceptable on a loop, visible on a one-shot sweep fired at
load.

Where the fill is the *same* picture already behind the type, the word stops
being a plate and becomes an aperture — but only if it is graded apart from its
surround. Register the clipped background independently (a different
`background-position`, not the parent's) and lift it with a filter on the
clipped node alone: `saturate(.6) brightness(1.2–1.5)` reads as light coming
through. A `-webkit-text-stroke` hairline at 1px and 30–45% alpha is what
answers the contrast problem above — it re-establishes the letterform edge
wherever the fill and the surround agree in luminance, which on a photograph is
somewhere.
```css
.aperture { background: url(scene.jpg) 50% 75% / cover; color: transparent;
  -webkit-background-clip: text; -webkit-text-stroke: 1px #ffffff61;
  filter: saturate(.6) brightness(1.28) }
```
⚠ `-webkit-text-stroke` centres on the outline and eats into thin strokes — at
display weights below about 600 it closes counters before it clears the edge.

One registered coordinate can drive more than one layer. Write it into
`mask-image` on stacked siblings instead of into a single background — one
masked *out* ahead of the position, one banded around it, one masked *in*
behind — and a single tween moves a surface, a texture and a second ink along
the same travelling edge. Nothing can drift, because there is no second value to
keep in step. Band half-width 8–14%, shoulder 6–8% outside it.
```css
.plate { mask-image: linear-gradient(90deg, #000 calc(var(--s) - 11%), #0000 calc(var(--s) + 11%)) }
.band  { mask-image: linear-gradient(90deg, #0000 calc(var(--s) - 18%), #000 calc(var(--s) - 11%),
                                            #000 calc(var(--s) + 11%), #0000 calc(var(--s) + 18%)) }
.after { mask-image: linear-gradient(90deg, #0000 calc(var(--s) + 11%), #000 calc(var(--s) + 18%)) }
```
⚠ Run the coordinate past both ends — −20% to 120% against an 18% shoulder — or
the band is half-born at the start and clipped at the finish. It is one
composited layer per stop of the effect: size it for a control, not a plate.

Ramp one colour to its own transparent rather than between two, and the clip
stops colouring the word and starts dissolving it: a display numeral or a
section watermark fades out along its own height, so it can be set very large
and still sit behind the copy it labels instead of competing with it. `opacity`
cannot do this — it fades the glyph evenly — and this is the cheapest per-glyph
falloff short of a mask layer. Fade from 40–65% of the ink at the reading end to
zero, on the axis the eye leaves by.
```css
.ordinal { font-size: clamp(2rem, 6vw, 5rem); color: transparent;
  background-image: linear-gradient(var(--ink-45) 0%, transparent 100%);
  -webkit-background-clip: text; background-clip: text }
```
⚠ The faded end sits below any contrast floor by construction, so nothing the
reader must actually read can live there. Where the string is pure ornament mark
it `aria-hidden`; where it carries the step number, that number has to exist as
ordinary text somewhere in the card as well.

Clipping the filled copy turns the same mechanism into a gauge. Stack two
identical copies of the text: a solid one underneath, and the image-filled one
over it under `clip-path: inset(L 0 0)`, so the fill appears only below level
`L`. A figure then reads as filled to a line rather than as coloured, and `L`
is one settable number — animatable, scrubbable, bindable to the value it
reports.
```css
.fill { position: absolute; inset: 0; clip-path: inset(calc(100% - var(--l)) 0 0);
  background: var(--texture); -webkit-background-clip: text; color: transparent }
```
⚠ Two copies is two readings: mark the clipped one `aria-hidden` and
`pointer-events: none`. They must share every metric — one inherited
`font-size` or `letter-spacing` apart and the fill slips off the letterforms.

Inside running text the failure is worse than a mistimed gradient. Applied to
an *inline* element — an `<em>` inside a headline rather than a block — WebKit
does not paint the clipped background on inline fragments at all, so the phrase
goes to transparent fill and renders nothing the moment it wraps across a line.
It survives every desktop check and disappears at the widths where the headline
breaks. A phrase inside a line of type is not the place for this: shift its
colour and its style instead, and keep the clip for a block that owns its own
box.
```css
.title em { font-style: italic; color: var(--accent) }   /* not a clipped fill */
```
⚠ A gradient worth losing the words to does not exist. Where the clip must stay,
the duplicate-pseudo construction above is the only form that degrades to
legible text.

The `color: transparent` trap repeated above has a form that avoids it outright.
Leave a real `color` on the element at low alpha — 10–20% of the ink — and let
the fill gradient run behind the glyphs with a hard `transparent` tail. The
filled stretch is the gradient seen through a faint tint, the unfilled stretch
is the tint alone, and nothing depends on the background surviving: a dropped
image, forced colours, an unsupported clip and the reduced-motion branch all
leave dim-but-present text rather than none.
```css
.fill { color: rgb(from var(--ink) r g b / .14); background-clip: text;
  background-image: linear-gradient(90deg, var(--ink) var(--p), transparent var(--p)) }
```
⚠ Dim-but-present is still far under 4.5:1. This is a safety net for the
decorative failure modes, not a licence to leave running text sitting in the
unfilled state.

A vertical fill over a two-line heading can split the lines without a second
token: put the light stop inside the first line and push the dark stop *past*
the box — 150–230% — so the ramp is still mid-travel at the last baseline. Line
one reads near-solid, line two recedes, and the heading stays one element that
reflows without a hard break. Start stop 2–65%; the further past 100% the end
stop, the gentler the recession.
```css
.h { background: linear-gradient(180deg, var(--fg) 20%, var(--fg-dim) 220%);
  -webkit-background-clip: text; color: transparent }
```
⚠ The recession depends on line count — at 390px a third line lands darker than
anything the desktop proof showed; score the lowest line against the ground.

A looping sheen reads as a tick, not a hum, when the keyframes spend the last
20–30% of the cycle parked off-glyph: sweep over 70–80%, hold, repeat on a
3–5s period. For a photographic fill, stack a translucent ink gradient as the
first layer over the image — the texture shows through as variation while the
floor contrast comes from the ink, not the photo.
```css
@keyframes sheen { 0% { background-position: 88% 0 } 76%, to { background-position: 12% 0 } }
.tex { background: linear-gradient(#111b, #111b), url(t.jpg) 14% 26% / 210% }
```
