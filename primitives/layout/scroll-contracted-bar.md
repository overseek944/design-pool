---
id: scroll-contracted-bar
category: layout
tags: [header,scroll,sticky,chrome]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 3
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
