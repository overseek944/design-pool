---
id: multi-edge-mask-fade
category: surface
tags: [surface,mask,edge,composition,bleed]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 93
requires: []
conflicts: []
completes: []
tension: []
---
Let an oversized panel run past the layout and dissolve instead of being cropped
by a hard edge. One `linear-gradient` mask layer per side, each with its own
fade distance, so a detailed surface can bleed off two edges while staying
legible on the others. Name the stops as tokens so the rule reads as a list of
edges, not a wall of colour. Fade distances 80–560px, tuned per edge.

```css
:root { --mask-on: #000; --mask-off: transparent }
.stage {
  mask-image:
    linear-gradient(to left,   var(--mask-off) 0, var(--mask-on) var(--fade-r, 400px)),
    linear-gradient(to top,    var(--mask-off) 0, var(--mask-on) var(--fade-b, 300px));
  mask-composite: intersect;
}
```
⚠ `mask-composite` needs the `-webkit-` prefix pair to work in Safari; without `intersect` the layers union and nothing fades.

Percentage stops instead of px when the fade should scale with the element —
`8%`/`92%` on a horizontal rail keeps the same proportion of fade at every width,
where a fixed 400px eats a narrow one whole. Px for fixed-size stages,
percentages for anything fluid.

On a rail that scrolls, the two ends are not the same edge and should not fade
equally. A short fade at the start — 0.5–1× the gutter — reads as a soft crop,
while a longer one at the end, 1.5–2.5×, reads as *more*: content dissolving
because it continues. A symmetric mask says the rail is centred; an asymmetric
one says which way to swipe.
```css
mask-image: linear-gradient(to right, transparent 0, #000 var(--lead),
                            #000 calc(100% - var(--trail)), transparent 100%)
```

Where the fade is focal rather than per-edge, one oversized radial stop replaces
the whole composited stack — no `mask-composite`, no prefix pair, one layer. A
decorative ground then exists only around the content it sits behind and is gone
by the section boundary, so it never has to be terminated. Size the ellipse
1.5–2.5x the content block and push its centre to the optical focus, usually
above middle; opaque to 40–60%, clear by 80–90%.
```css
mask-image: radial-gradient(900px 700px at 50% 30%, #000 50%, transparent 85%)
```
⚠ Percentage stops here are of the *gradient box*, not the element, so an
explicit ellipse size is what keeps the falloff stable across viewports.

Invert the stops on that radial and the same single layer becomes a keep-out
rather than a frame: clear through the middle, opaque at the rim. An ambient
field laid full-bleed behind an article is then incapable of appearing across
the measure — no z-index race, no per-element placement, and the body-text
contrast floor holds by construction instead of by restraint. Clear to 50–60% of
the ellipse, opaque by 75–90%.
```css
mask-image: radial-gradient(48% 68%, transparent 0 54%, #000 78%)
```
⚠ The gradient box is the element, so on a wide viewport a full-bleed field
clears far more than the column it is protecting — size the ellipse against the
measure, and widen the hole again where the column takes most of the width.

Where every edge fades and the panel is decorative rather than legible content,
one radial layer replaces the whole stack: an oversized ellipse centred on the
box holds the middle opaque and falls off on all four sides at once, with no
`mask-composite` and so no Safari caveat. The ellipse is the control — 55–75%
of the box on each axis, opaque to 55–65% of the radius — and it fades corners
harder than edges, which a per-side stack cannot do.
```css
.field { mask-image: radial-gradient(ellipse 65% 50% at 50% 50%, #000 60%, transparent 100%) }
```
⚠ Radial falloff is uniform, so anything that must stay readable near a corner
is the wrong content for this variant.

Over a scroll port on a known solid surface, paint the fade rather than masking
it. A mask makes the content transparent, so a scrollbar, a focus ring or a
selection under the fade goes with it; an absolutely-positioned `::after`
gradient to the surface token covers the pixels and leaves the element intact.
The pairing that makes it read as a fade and not a permanent dimming is padding
on the scrolled content equal to the fade height, so the last line clears it.
```css
.port::after { content:""; position:absolute; inset:auto 0 0 0; height:2rem;
  pointer-events:none; background:linear-gradient(transparent, var(--card)) }
.port > * { padding-block-end: 2rem }
```
⚠ Only over an opaque, known colour — on a gradient or an image the painted
band is a visible rectangle.

Derive the fade distance from the layout rather than tuning it: on a full-bleed
rail inside a fixed measure, `max(<floor>, (100% - <measure>) / 2)` makes the
fade exactly the page gutter, so the track dissolves precisely where the content
column begins instead of at an arbitrary offset. The mask then tracks every
viewport width for free, and the floor keeps it from collapsing to nothing below
the measure.
```css
.rail { --fade: max(32px, calc((100% - 1092px) / 2));
  mask-image: linear-gradient(90deg, #0000 0, #000 var(--fade),
                              #000 calc(100% - var(--fade)), #0000 100%) }
```
⚠ `100%` is the rail's own width — correct only where the rail is genuinely
full-bleed. Nested inside a padded container it resolves to the wrong basis and
the fade lands short of the gutter.

An edge fade on a scroller is a claim that there is more, so retract it at the
widths where the strip fits. A tab row that overflows on a phone and sits whole
on a desktop wants `mask-image: none` above that breakpoint; left on, it dims
real content and promises a swipe that does nothing. Fade the overflowing edge
only, in px rather than percent — the affordance is a fixed optical size, not a
fraction of a container that just changed width. 16–32px.
```css
.strip { mask-image: linear-gradient(90deg, #000 calc(100% - 24px), transparent) }
@media (width >= 64rem) { .strip { mask-image: none } }
```
⚠ A breakpoint only guesses at overflow; where content count is dynamic, key it
off a scroll probe instead so the fade tracks the real condition.

Register each edge's inset as a property and the fade becomes a value rather
than a fixed rule: `@property --fade-t { syntax: "<length-percentage>" }` is
interpolable, so an edge can transition open when a rail gains overflow, or be
driven from scroll. Compose the four into one `syntax: "*"` property and every
consumer applies a single declaration while the utility owns the stop list —
`inherits: false` on all of them so a nested panel does not pick up its parent's
fades.
```css
@property --fade-t { syntax: "<length-percentage>"; inherits: false; initial-value: 0 }
.rail { --fade-mask: linear-gradient(#0000, #000 var(--fade-t)); mask-image: var(--fade-mask);
        transition: --fade-t .3s }
```
⚠ Unregistered, the same declaration silently does not animate — no error, the
edge just snaps. Name the four in logical pairs (`-s`/`-e` beside `-t`/`-b`) or
the mask flips wrong in RTL.

Where the ground behind the element is a known flat colour, an opaque gradient
*overlay* does the same job with no mask at all: an absolutely-positioned strip
on the edge running from `transparent` to that ground. It costs a node per edge
and is defeated the moment the ground becomes a gradient or an image, but it
needs no `mask-composite`, no prefix pair, and it cannot be clipped away by an
ancestor that already owns the element's own mask. Strip 32–64px.
```css
.rail::after { position: absolute; inset: 0 0 0 auto; width: 48px;
  background: linear-gradient(to right, #fff0, var(--ground)) }
```
⚠ `#fff0` and `transparent` are the same premultiplied colour, but a named
`transparent` against a dark ground still ramps through black in sRGB — always
write the ground's own hue at zero alpha.

`closest-side` and `farthest-side` retire the explicit-ellipse caveat above: the
keyword sizes the gradient to the element, so the falloff is written as a
fraction of the box and holds at any width with no px to retune. It is what makes
a square image sit *on* a surface rather than on top of one — the corners go
first, so nothing reads as a cropped rectangle. Opaque to 50–65%, clear by
92–100%; `farthest-side` where the shape must still reach the corners.
```css
img { mask-image: radial-gradient(closest-side, #000 55%, transparent 96%) }
```
⚠ Keep the `-webkit-mask-image` twin — an unprefixed-only rule is ignored
outright in older WebKit and the image ships as a hard square, not a soft one.

Layers need not composite; they can partition. `mask-size` and `mask-position`
cut the box into strips, one layer each — so a top fade over a scrolling pane
can hand the scrollbar gutter a second, fully opaque layer, and the fade stops
washing out the scrollbar sitting inside it. The strips do not overlap, so there
is no `mask-composite` and no prefix pair to get wrong. Gutter 10–16px, matched
to the track the pane actually renders.
```css
mask-image: linear-gradient(to bottom, transparent 0, #000 40px, #000 100%),
            linear-gradient(#000, #000);
mask-size: calc(100% - 14px) 100%, 14px 100%;
mask-position: 0 0, 100% 0; mask-repeat: no-repeat;
```
⚠ An overlay scrollbar reserves no gutter at all and the second strip then eats
14px of the fade for nothing. Measure `offsetWidth - clientWidth` and drop the
layer when it is zero — and remember the gutter is on the left under `rtl`.

Over a flat, known ground the cheap form is two positioned gradient layers in
that ground's own colour instead of a mask — no `mask-composite`, no `-webkit-`
pair, and it composites like any other paint. It fails the moment the ground
stops being flat: a gradient band, an image, a theme swap, and the fade shows as
a pair of coloured bars. Take the mask whenever the surface behind the rail is
not a single token.
```css
.edge { position: absolute; inset-block: 0; inline-size: clamp(3rem, 6vw, 5rem);
  pointer-events: none; background: linear-gradient(90deg, var(--ground), transparent) }
```
⚠ `pointer-events: none` on both, or the fades sit over the track's first and
last items and swallow the drag that scrolls it.

The composited layers need not be the same *kind*. Intersect one directional
ramp with one focal radial and the two answer different questions with
independent controls: the linear layer decides where the pattern is allowed to
begin — killing the hard line where a ruled ground meets the section edge — and
the radial decides where it recedes, holding density under the content and
letting it go at the margins. Per-side stacks can do the first and radials the
second; neither alone does both, and one of each is cheaper than four.
```css
.ground { mask-image: linear-gradient(#0000 0, #0006 40px, #000 130px),
                      radial-gradient(115% 125% at 72% 52%, #000 0, #0000008c 55%, #0000 88%);
          mask-composite: intersect }
```
⚠ `intersect` takes the darker of the two everywhere, so a radial already at 50%
halves the linear ramp's plateau as well as its edge. Author the radial's centre
opaque and put all the falloff in the linear layer, or tune each twice.

The painted form is not actually defeated by a gradient ground — only by
assuming the ground is one token. Where the ground is a *linear* gradient, each
edge's band ramps to the ground's own colour **at that edge**, so the two ends
of the same panel fade to different colours and the pixels under them stay
opaque: a scrollbar, a focus ring and a selection all survive where a mask would
have taken them. It holds only while the band is short enough that the ground is
near-constant across it — 10–18% of the gradient's axis.
```css
.panel { background: linear-gradient(var(--top), var(--bot)) }
.panel::before { inset: 0 0 auto; height: 15%; background: linear-gradient(var(--top), #0000) }
.panel::after  { inset: auto 0 0; height: 15%; background: linear-gradient(#0000, var(--bot)) }
```
⚠ Two tokens to keep in sync with one gradient — derive all three from the same
pair, or a retune moves the ground and leaves the bands behind as visible steps.

Four edges do not need four layers. Two crossed gradients — one per axis, each
opaque between its own pair of stops — intersect to a feathered rectangle, and
the per-edge falloff is then four numbers inside two declarations instead of
four layers to keep in order. Asymmetry survives it: the top can open at 14%
while the left opens at 6%, which is what a photographic plate needs when it
must blend into the ground on its long edges and stay crisp on its short ones.
```css
mask-image: linear-gradient(to bottom, transparent 0, #000 14%, #000 93%, transparent),
            linear-gradient(to right,  transparent 0, #000 6%,  #000 94%, transparent);
mask-composite: intersect;
```
⚠ Percentages here are of the mask box, so a tall crop and a wide one feather by
different absolute distances from the same rule.

`add` is the default composite and not only a mistake to avoid. Layers that
union let a mask be authored as the list of regions an effect is *allowed* into
rather than as one falloff: a linear gradient opaque at both gutters and clear
across the measure, plus a radial blob readmitting the texture at a chosen point
inside it. The keep-out above becomes a keep-out with an exception, and the
exception is a separate, separately-tunable layer. Gutter stops 15–25% and
75–85%; the blob opaque to 6–12%, clear by 70–80%.
```css
.ground { mask-image:                                   /* composited: add */
  linear-gradient(90deg, #000, #0000 19% 81%, #000),
  radial-gradient(at 58% 83%, #000 8%, #0000 76%) }
```
⚠ Union only ever adds coverage, so a blob straying over the column puts texture
straight back under the text the gutter mask was protecting.

A feathered frame has a safe area smaller than its box, and content placed by
the box lands in the fade: the one element the frame exists to show comes out
half dissolved while the furniture around it stays solid. Treat the largest
feather inset as padding when fitting or positioning anything inside — pad
wider than it, not equal to it, so the subject sits in the plateau and only
chrome pays for the dissolve. Feather 8–14% a side means 1.2–1.5× that in pad.
```js
const PAD = { x: feather.x * 1.3, y: feather.y * 1.3 }   /* not feather itself */
z = Math.min(frameW / (w + PAD.x * 2), frameH / (h + PAD.y * 2))
```
⚠ Percentage feathers are of the mask box, so the inset in pixels changes with
every resize — recompute the pad from the live box, never from a constant.

Where the layer is a single SVG over a flat ground, the falloff can be drawn
rather than masked: two full-viewBox `<rect>`s painted last, filled from
gradients whose opaque stop is the page's own background token. No
`mask-composite`, no prefix pair, no second element — and because the stops live
in user space, a `slice` crop scales the dissolve *with* the art instead of
pinning it to the element box, which a CSS mask cannot do. Radial to taste,
plus one linear for the side that must go entirely.
```html
<radialGradient id="v" cx="78%" r="62%"><stop offset="55%" stop-color="var(--bg)"
  stop-opacity="0"/><stop offset="100%" stop-color="var(--bg)"/></radialGradient>
<rect width="100%" height="100%" fill="url(#v)"/>   <!-- after the artwork -->
```
⚠ It occludes rather than reveals: anything layered between the SVG and the
page is painted over, and the fade is wrong the moment the ground stops being
that one flat colour.

The asymmetric rail fade above is static, so it still says *more* at the end of
the track where there is none — the one moment the reader needs to be told to
stop. Register the trailing distance as a length and drive it from the rail's own
scroll progress, so the fade retires as the end arrives. No observer, no class,
and it holds while the rail is being dragged rather than only after it settles.
Trail full at rest, zero by 92–100% of progress.
```css
@property --trail { syntax: '<length>'; inherits: false; initial-value: 48px }
.rail { animation: retire linear both; animation-timeline: scroll(self inline) }
@keyframes retire { 0%,80% { --trail: 48px } 100% { --trail: 0px } }
```
⚠ Scroll-driven timelines have no fallback value — without `@property`'s
`initial-value` the custom property is invalid-at-computed-value-time wherever
they are unsupported, and the mask silently drops entirely.

A two-stop fade has a visible shoulder. Alpha composites linearly, so the
midpoint of the ramp is half-opaque and the eye reads the plateau as ending
early and the tail as dragging. Bend it with one mid stop pulled *below* half —
around 0.35 alpha at the ramp's centre — and finish the ramp short of the edge
so the last stretch is fully clear. Three stops is the whole cost.
```css
mask-image: linear-gradient(#000 0 33%, #00000059 50%, #0000 62%)
```
⚠ The bend is a look, not a correction. The same curve that paces a fade over
artwork holds text legible further into the ramp — check it against the content,
because hiding that text may have been the point.

An edge fade laid over readable content — a scrolling row of quotes, a carousel
of cards — survives `forced-colors`, where the reader has asked for maximum
contrast and the mask still dissolves the text at each end into the system
ground. Drop it there; the hard crop is the honest affordance in that mode.
```css
@media (forced-colors: active) { .rail { mask-image: none; -webkit-mask-image: none } }
```
⚠ Remove both the prefixed and unprefixed property — Safari reads only the
prefixed one.

A single diagonal layer keeps two *opposite corners* and clears the band
between them: `to bottom right`, opaque at 0% and 100%, transparent across the
middle. A decorative field then frames a centred card from top-left and
bottom-right only, which reads as composed where four faded edges read as a
vignette. Clear band 20–25% to 75–80%; widen the band on narrow screens where
the corners crowd the content.
```css
mask-image: linear-gradient(to bottom right, #000 0, transparent 22% 78%, #000 100%)
```
⚠ The diagonal follows the box's aspect ratio, so on a very wide element the
corners become thin slivers along the long edges — size the field, not the page.
