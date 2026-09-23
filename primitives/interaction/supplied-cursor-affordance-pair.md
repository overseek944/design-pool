---
id: supplied-cursor-affordance-pair
category: interaction
tags: [interaction,pointer,detail,chrome,accessibility]
axes: {energy: 2, density: 2, weight: 3, finish: 3}
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Replacing the arrow is a strong voice, and the failure is replacing only the
arrow: one supplied bitmap everywhere kills the hand over links, so nothing
looks clickable. Ship the image twice under different fallback keywords — `auto`
on the ground, `pointer` on anything interactive — and the affordance grammar
survives the art failing as well as the art. Inline it as a data URI. 16–32px,
hotspot on the drawn tip.

```css
body { cursor: url("data:image/png;base64,…") 2 2, auto }
a, button, summary, [role=button] { cursor: url("data:image/png;base64,…") 2 2, pointer }
```
⚠ Platforms cap cursor size near 32px and silently fall back past it. A raster
cursor ignores the OS pointer-size setting, so it shrinks for the readers who
enlarged theirs — and no media query reports that.

A cursor drawn as a DOM element rather than as a `cursor` value cannot express
the pair through fallback keywords, so the grammar has to be rebuilt by hand:
`cursor: none` on the body, the *native* cursor restored by selector on
everything that carries meaning — text takes an I-beam, controls a hand — and
the drawn element hidden whenever `event.target.closest()` matches that same
list. One list, written twice, so keep it in a constant. Give it a kill switch
too: a class on the body that returns every cursor to `auto`, for the routes
where a drawn pointer is wrong.
```css
body { cursor: none }
h1, h2, h3, p, li, label, img, input { cursor: auto }
a, button { cursor: pointer }
body.plain-cursor, body.plain-cursor * { cursor: auto }
```
⚠ Nothing here survives the element failing to render, and unlike the CSS form
there is no fallback keyword behind it — the reader is left with no pointer at
all. Track from `pointermove` on the window, not the layer, or the drawn cursor
stops at the first element that swallows the event.

The warning above about the OS pointer-size setting has one honest answer: stop
guessing and give the reader the switch. A 32px SVG data URI — the largest any
platform honours before falling back silently — swapped in from a root class,
hotspot on the drawn tip, and the whole grammar overridden from two selectors
rather than re-specified per element. Ship it as a light and a dark colourway,
because a single ink vanishes over the ground that matches it, and the reader
choosing the pointer is the one who cannot chase it back.
```css
html.big-cursor-dark, html.big-cursor-dark * {
  cursor: url("data:image/svg+xml,%3Csvg…stroke='white'%3E") 8 4, auto !important }
```
⚠ `!important` and the universal selector are load-bearing here — every
`cursor: pointer` in the product outranks a root class otherwise — and they are
also why this can only be an opt-in state, never the default paint. Persist the
choice; a pointer the reader had to find twice is worse than none.

Variant — a drawn dot 6–10px under `mix-blend-mode: difference` stays visible
over light and dark grounds with one ink; hide it while a modal owns focus.
