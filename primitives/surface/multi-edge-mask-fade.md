---
id: multi-edge-mask-fade
category: surface
tags: [surface,mask,edge,composition,bleed]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 43
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
