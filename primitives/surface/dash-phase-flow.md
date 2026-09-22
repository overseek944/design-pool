---
id: dash-phase-flow
category: surface
tags: [svg,dash,motion,connector,diagram,precision]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 1
seen: 29
requires: []
conflicts: []
completes: []
tension: []
---
Animating `stroke-dashoffset` on a dashed connector makes a static schematic
read as carrying something, and in a direction. The precision that makes it work
is arithmetic: the offset travelled per cycle must be an exact integer multiple
of the dash period (`dash + gap`), or the pattern snaps back at every repeat and
the line visibly stutters.

```css
.thread { stroke-dasharray: 6 10 }                  /* period 16 */
@keyframes flow { to { stroke-dashoffset: -160px } } /* 10 periods */
.thread { animation: flow 6s linear infinite }
```
⚠ Perpetual peripheral motion is a vestibular trigger and an attention sink — a
`prefers-reduced-motion` branch is required. Hold 20–40px/s; faster and the
dashes strobe rather than flow.

A flowing connector that runs off the edge of its frame needs no hard terminal:
paint the stroke with a `linearGradient` transparent at both ends. In the
default `objectBoundingBox` units the stops span the path's own box, so the
fade tracks the geometry through any edit — which neither a mask nor a CSS
`linear-gradient` manages on a curve. Hold zero alpha to 12–20% and from 78–88%.
```html
<linearGradient id="fade" x1="0" x2="1">
  <stop offset="0" stop-opacity="0"/><stop offset=".18" stop-opacity=".34"/>
  <stop offset=".78" stop-opacity=".36"/><stop offset="1" stop-opacity="0"/>
</linearGradient>
<path d="…" stroke="url(#fade)" stroke-dasharray="10 18"/>
```
⚠ A bounding box has no direction — a route that doubles back fades mid-line.
Straight-ish runs only, else `gradientUnits="userSpaceOnUse"` and place the
stops in viewBox coordinates.

Off SVG the same flow is a `repeating-linear-gradient` on a pseudo-element, and
the arithmetic reappears as one number: animate `background-position` by exactly
one dash period and the tile lands back on itself, so the loop is seamless with
no measured length and no `<path>`. A 2px-tall rule then joins DOM nodes that
were never in a drawing. Period 8–14px, cycle 0.6–0.9s.
```css
.link { background-image: repeating-linear-gradient(to right,
          var(--rule) 0 4px, transparent 4px 9px); height: 2px;
        animation: march .7s linear infinite }
@keyframes march { to { background-position: 9px 0 } }
```
⚠ The period lives in two places — the gradient stops and the keyframe — and
nothing catches them drifting apart. Hold both in one custom property.

A bundle of connectors sharing one period beats in unison and reads as a
mechanism rather than as traffic. Give each run its own duration — 1.2–2.8s,
picked to be mutually non-integer — and add a second, slower `opacity` cycle at
a period unrelated to either, so a line is never in the same state twice running.
The arithmetic constraint is per line and unaffected: each still travels a whole
number of its own dash periods.
```css
.link:nth-child(3n)   { animation-duration: 1.4s }
.link:nth-child(3n+1) { animation-duration: 2.6s }
.link { animation: flow var(--d) linear infinite, breathe 2.2s ease-in-out infinite }
```
⚠ Two infinite animations on one element is two compositor tickets — keep both
on `opacity` and `stroke-dashoffset` only, and kill both in the reduced-motion
branch rather than just the travel.

A pattern that is mostly gap stops being a flowing line and becomes a light
travelling an invisible one. Give the path a multi-segment array whose final gap
is most of the period — `2 2 7 89` against a period of 100 — and only a short
broken cluster is ever painted; the route is implied by where the glimmer goes.
The arithmetic is unchanged: travel a whole number of periods. Cluster 8–15% of
the period, 10–20s for a circuit, and one `animation-delay` per path so a bundle
never flashes in unison.
```css
.filament { stroke-dasharray: 2 2 7 89; stroke-dashoffset: 100;
            animation: glimmer 13s linear infinite var(--delay) }
@keyframes glimmer { to { stroke-dashoffset: -100 } }
```
⚠ At this duty cycle nothing tells a reader the route exists between passes —
lay it over artwork that already carries the geometry, never where the line *is*
the information.

Direction is the cheap half of the meaning and needs no second keyframe:
`animation-direction: reverse` on a modifier class runs the same travel the
other way. One pattern, one period, one arithmetic check, and a bundle can say
*into* and *out of* at the same time — which is the whole point where the two
readings are opposites, a source feeding a document against a document
answering a query. Keep the two tints distinguishable by more than direction;
a reader watching one line at a time cannot see the contrast.
```css
.beam          { stroke-dasharray: 7 6; animation: march .9s linear infinite }
.beam--inbound { animation-direction: reverse }
@keyframes march { to { stroke-dashoffset: -13 } }   /* one period */
```

On a closed circular path the arithmetic stops being a constraint: rotate the
element instead of offsetting the dashes. A full turn returns to identity
whatever the dash period, so the pattern need not divide the circumference and
there is no snap to tune out — the seam rotates with the dashes and is never
resolved into view. It also buys what `stroke-dashoffset` cannot: the travelling
marks can be stroked with a `linearGradient`, since the paint stays put while
the geometry turns. 14–24s for a ring.
```html
<circle r="180" stroke="url(#ramp)" stroke-dasharray="7 264" stroke-linecap="round">
  <animateTransform attributeName="transform" type="rotate"
    from="0 200 200" to="360 200 200" dur="18s" repeatCount="indefinite"/></circle>
```
⚠ SMIL is outside the reduced-motion query — pair it with `svg.pauseAnimations()`
behind `matchMedia`, or the ring runs for everyone.

A single *packet* travelling the line once is the same lever with the arithmetic
removed: `pathLength="1"` makes the dash unitless, so one short dash and one
keyframe run from a start offset to past the end at the same speed on every
path in a diagram regardless of its length. Give each its own offset in a custom
property and one block drives the whole network. `animation-fill-mode: backwards`
plus a `visibility` stop hides each packet through its own delay — without it a
staggered set all paints a static dash at load. Dash 0.04–0.12 of the path,
3–6s per run.
```css
.packet { stroke-dasharray: .08 1; animation: pk 3.4s linear infinite backwards }
@keyframes pk { 0% { stroke-dashoffset: var(--pk-from, .08); visibility: hidden }
                to { stroke-dashoffset: -1px; visibility: visible } }
```
⚠ Unitless dashes still need a stroke that survives scaling — `vector-effect:
non-scaling-stroke` or a packet on a scaled stage thins out with it.

Where the connector marks an *arrival* rather than a continuous flow, the same
DOM rule fills once instead of cycling: a 1px spine whose `::before` runs
`scaleY(0)` to `1` from `transform-origin: top` as the step below it lands. The
head is the other half — a CSS border triangle that inks by changing colour on
a transition delayed to just past the fill, so the arrow completes the stroke
rather than racing it. Fill 300–400ms, head delayed 0.8–1× that.
```css
.pipe::before { transform: scaleY(0); transform-origin: top }
.pipe.on::before { animation: fill .34s ease forwards }
.pipe::after { border: 3px solid transparent; border-top: 4px solid var(--line);
               transition: border-top-color .2s ease .28s }
.pipe.on::after { border-top-color: var(--ink) }
```
⚠ The delay and the fill duration are one decision written twice; retune the
fill and the head fires early, which reads as two unrelated animations.

The two-places drift is fixable on SVG too: publish the dash as one custom
property and derive the offset from it — `stroke-dasharray: var(--dash) var(--dash)`
against `to { stroke-dashoffset: calc(var(--dash) * -2) }` is always exactly one
period, so a selection ring can be retuned 4–10px without touching the keyframe.
