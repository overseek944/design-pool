---
id: cropped-stage-mock
category: layout
tags: [layout,responsive,overflow,media,scale,detail]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 11
requires: []
conflicts: []
completes: []
tension: []
---
Show a framed artifact — a handset, a browser chrome, a console — as a crop
rather than a whole object: a stage of fixed height, the frame pushed down from
its top edge and running off the bottom. It reads as a live thing continuing
past the panel instead of a product shot, and it costs no vertical space it does
not earn. Drive both from two properties so the scrollable interior can be
derived rather than guessed, and retune only those two per breakpoint.
```css
.stage { --h: clamp(460px, 44vw, 650px); --top: 56px; height: var(--h); overflow: hidden }
.frame { margin: var(--top) auto 0; aspect-ratio: 9 / 19.5; width: 80% }
.feed  { height: calc(var(--h) - var(--top) - 200px); overscroll-behavior: contain }
```
⚠ The crop must fall on filler, never on a control or the last line of content.

Release the crop entirely below the width at which the visible part stops being
enough. A stage that reads as a teaser beside a column of copy is, on a phone,
the only view of that content there is — so drop the height, the `overflow` and
any edge mask together and let the artifact render whole. The crop is a wide-
viewport luxury, not the component's identity.
```css
@media (width <= 520px) { .stage { height: auto; overflow: visible;
  mask-image: none; -webkit-mask-image: none } }
```

The crop also answers the narrow viewport where a real interface will not
reflow. Rather than rebuilding the product's chrome at phone width — which
shows something the reader will never see — render it at its native width
inside the card and let the frame clip it, anchored so the region that carries
the point stays in view. It reads as a window onto a real application; a
reflowed imitation reads as a diagram of one. Native width 900–1280px behind a
300–360px aperture.
```css
.aperture { overflow: hidden; container-type: inline-size }
.aperture > .app { inline-size: 1120px; margin-inline-start: -180px }
```
⚠ Nothing inside is operable at that scale, so make it inert and give the card
one real control of its own — a link out, or a full-screen affordance.

Where the artifact must be shown whole, `scale()` replaces the crop: author the
mock at the width its type and spacing were designed for and shrink it into the
aperture with `transform-origin: top center`, one factor per instance. Three
mocks of different native widths then share an apparent density — which is what
makes them read as one product rather than three screenshots — and none of them
loses a control to a clipped edge. Factors 0.7–0.95; below that body copy stops
being legible at the card's size.
```css
.mock { position: absolute; top: 22px; left: 50%;
        transform: translateX(-50%) scale(.77); transform-origin: top center }
```
⚠ A transform does not shrink the layout box, so the card reserves the mock's
*unscaled* height unless the stage states its own — and text inside is scaled
rather than resized, so it renders at a sub-pixel size the browser's minimum
font setting will not protect.
