---
id: substituted-driver-on-coarse-pointer
category: interaction
tags: [pointer,touch,fallback,ambient,correctness,architecture]
axes: none
cost: 2
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Every pointer-reactive decoration is inert on a touchscreen: the reader sees a
static lattice and never learns it answers to anything. Do not branch the
renderer and do not hide the layer — write a synthetic pose into the same
variable the real pointer writes, so one code path serves both and the effect
demonstrates itself. Sweep the field's own bounds with two sines per axis at
incommensurate frequencies; the path covers the area without a period the eye can
catch. Rate 0.008–0.02 rad/frame, minor term 0.2–0.3 of the major.

```js
const t = ++tick * rate
pose = { x: cx + Math.sin(t) * rx * .9 + Math.sin(t * 2.3 + 1.1) * rx * .25,
         y: cy + Math.cos(t * .8) * ry * .9 + Math.cos(t * 1.7 + .7) * ry * .25 }
```
⚠ This is motion nobody asked for: gate it on `prefers-reduced-motion` and on
whatever already stops the loop offscreen, or it composites forever on a battery.

The substitution is right for decoration and wrong where the interaction *is*
the content — a scatter of marks each holding something to read. A synthetic
pointer then puppets a choice the reader did not make, and the layer costs
layout and images on the device least able to afford them. Drop the scatter
below the width and pointer it needs, promote what it was carrying into an
ordinary flow element, and give that one a rotation on a 5–8s dwell. Two
drivers, one displayed value, chosen by capability rather than suspended by
input.
```js
const fine = matchMedia('(hover: hover) and (min-width: 62rem)')
const shown = fine.matches ? hovered : items[tick]     // interval only when !fine
```
⚠ The rotation must stop off-screen and under `prefers-reduced-motion`, and
every item still has to be reachable without the pointer — a fine-pointer path
that is the only path is the same failure in the other direction.

An interval is not the only stand-in for hover. Where the hovered thing is
positioned down the page, promote *intersection* into the role instead: the
same `data-active` attribute, written by `pointerenter` on a precise pointer
and by an observer crossing 0.2–0.35 on everything else. The reader paces it by
scrolling, so nothing changes unasked, no timer runs, and the two paths differ
only in what writes the attribute — the styling has one selector.
```js
precise ? el.addEventListener('pointerenter', () => on(el))
        : io.observe(el)   // threshold [0, .25] → dataset.active = ratio >= .25
```
⚠ The observer path needs a hysteresis gap or an element resting near the
threshold flickers. Pick the driver on the same `change` subscription as the
media query, not once at startup.

Swapping the driver silently swaps the resource budget too, and it swaps it the
wrong way. Hover is a deliberate act, so the precise-pointer path can sit at
`preload="metadata"` and buffer in the moment between intent and playback;
intersection is not aimed at anything, so the clip has to be decoded *before* it
crosses the threshold — `preload="auto"` on every such element, on the device
class least able to pay for it. Gate the eager tier on `saveData` and on a count,
and reset `currentTime` only on the pointer path, which has a true "left" event.
```js
v.preload = precise ? 'metadata' : (nav.connection?.saveData ? 'none' : 'auto')
```
⚠ Picking the path from a one-shot `innerWidth < 768` read strands it: width is
not pointer capability, and unlike a media query it has no `change` to subscribe
to, so a resized window keeps the wrong driver for the rest of the session.
