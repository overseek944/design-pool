---
id: scroll-contracted-bar
category: layout
tags: [header,scroll,sticky,chrome]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 29
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

One listener, two thresholds. Whether the document has moved at all and whether
the bar has left the opening section are different questions, and a bar that
answers both from one number either draws its edge late or changes its ground
early. Read them in the same passive handler and publish them as separate
attributes, so the edge treatment and anything that depends on what is *behind*
the bar — an inverted mark, a CTA that only appears once the hero's has gone —
are styled apart. A few pixels for the first, 0.6–0.75 of the viewport for the
second.
```js
const y = scrollY
bar.dataset.scrolled = y > 8                    /* detached from the top */
bar.dataset.pastHero = y > innerHeight * .65
```
⚠ The second threshold is a guess at the hero's height until it is measured —
observe the hero itself, or a short one flips the state while the reader is
still inside it.

The threshold is not the only input. A bar that hosts its own menus must not
contract while one is open — the capsule shrinks out from under a panel anchored
to it — so publish a veto as a root attribute the handler ANDs in, and dispatch
an event when it changes so the test re-runs instead of waiting for a scroll that
may never come. Engage and release on different thresholds, 32–64 and 8–24, or a
bar parked on the line flickers.
```js
const apply = () => set(!root.hasAttribute('data-bar-hold') &&
  (contracted ? scrollY > 12 : scrollY > 40))
addEventListener('bar:hold', apply)        // menu open and close both dispatch
```
⚠ Releasing the veto must re-run the test, not restore what was there before — a
menu opened at the top and closed halfway down otherwise leaves the bar expanded
over content it should already have detached from.

The threshold can be a continuous scalar instead of a flip. Publish one 0–1
collapse value on the bar and express every geometry it touches as
`calc(base - delta * var(--c))` — inset, radius, row height, link gap, shadow
alpha — and the contraction interpolates with the scroll, tracks a reversal
exactly and can never be caught half-applied across properties that transition
at different rates. Keep a 0.08–0.15s `linear` transition on the geometry to
smooth the write granularity only.
```css
.plate { width: calc(100% - 32px * var(--c, 0)); border-radius: calc(8px * var(--c, 0));
         transform: translateY(calc(12px * var(--c, 0))); transition: width .1s linear }
```
⚠ Paint properties do not belong on this channel — background and border colour
should still cross at one threshold on their own eased clock, or the bar's
ground fades in gradually and is illegible for the whole middle of the range.

The translucent-plate variant has a second failure that contrast maths does not
catch: blur radius is not decorative, it is what stops the text passing
underneath from staying *legible*. A 10–14px blur dissolves body copy and
dissolves nothing else — a display heading crossing beneath reads straight
through an 80% plate as ghost glyphs colliding with the bar's own labels, which
looks like a rendering fault rather than transparency. Size the radius against
the largest type that can pass under it: roughly its cap height, so 28–40px
where a 50px headline scrolls through.
```css
[data-scrolled] .plate { backdrop-filter: blur(clamp(12px, 0.7 * var(--max-type), 40px)) }
```
⚠ A large radius is a large compositor read every frame of the scroll. Where
that is too expensive, raise the plate to full opacity instead — a solid bar is
always cheaper than a blur wide enough to be honest.

The complement of shedding content is gaining it. Let each block publish its own
title and a one-line gloss while it is the one crossing the bar's baseline, and
the chrome grows a second row carrying them: the reader always has the name of
what they are reading, and the page needs no separate breadcrumb. Animate the
inner plate's height so the sticky box never reflows. Have blocks register and
unregister themselves rather than having the bar hunt for them — overlapping
claims then resolve to the most recent, which a spy scanning a list cannot do
without a tie-break. Row 40–56px, on the plate's own curve.
⚠ Every word in the row duplicates a heading already on screen — mark it
`aria-hidden` or the section title is met twice. Drop the row entirely below the
width where the gloss wraps; two lines of chrome is worse than none.

The threshold form has a continuous twin. Instead of a class flipped once, map
the first 120–220px of scroll to a clamped 0–1 and drive every property off that
one number — radius 16→999px, inset, plate alpha, blur, the inline size — each
its own interpolation. Nothing is timed, so the bar cannot be caught mid-CSS-
transition by a fast flick, a resize or a restored scroll position: the state is
a pure function of where the page is.
```js
const p = Math.min(1, scrollY / 180)
plate.style.borderRadius = `${16 + p * 983}px`
plate.style.backdropFilter = `blur(${p * 12}px)`
```
⚠ Continuous means every frame writes, so guard each write against its own
epsilon and arm `will-change` only once `p` clears a dead zone of 0.02 — held
on permanently it keeps a compositor layer for the whole page.
