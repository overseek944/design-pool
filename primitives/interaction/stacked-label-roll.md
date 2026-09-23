---
id: stacked-label-roll
category: interaction
tags: [interaction,hover,button,label,motion,clip]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
A button can acknowledge the pointer without changing colour or size: stack two
copies of its label one line apart inside a clipped box, and on hover move both
up by one line so the resting copy exits the top as its twin rises into place.
It reads as the control turning over, keeps the fill still, and costs two
transforms. Travel 100–120% of line height, 300–450ms, strong ease-out.

```css
.btn { overflow: clip; position: relative }
.btn .roll { display: grid; transition: translate .4s cubic-bezier(.4,0,.1,1) }
.btn .roll > * { grid-area: 1 / 1 }
.btn .roll > :last-child { translate: 0 110% }
.btn:is(:hover, :focus-visible) .roll { translate: 0 -110% }
```
⚠ `aria-hidden` the second copy or the name is read twice; drop the travel under reduced motion.

The two travels need not match. Park the twin absolutely at `inset: 0` one line
below and send the resting copy 2–3× further up than the twin rises: it clears
the box before the incoming label seats, so the two never share the clip.

The same turnover works sideways for a directional glyph. Put two copies of an
arrow in a clipped flex row with a small gap and slide the row by one glyph plus
that gap in the direction the arrow points: the resting copy leaves ahead and
its twin takes the seat. Gap 0.2–0.4em, 300–400ms.
```css
.arrows { display: flex; gap: .25rem; transition: translate .35s cubic-bezier(.4,0,.2,1) }
.btn:is(:hover, :focus-visible) .arrows { translate: calc(100% + .25rem) }
```

The twin can be paint rather than DOM. Give the one label a `text-shadow` offset exactly one travel below it, unblurred, in the text colour; the shadow is the incoming copy. One node means one accessible name and nothing to `aria-hidden`. Offset 1.2–1.4em, matching the travel.
```css
.label { display: inline-block; text-shadow: 0 1.3em currentColor; transition: transform .6s cubic-bezier(.625,.05,0,1) }
.btn:is(:hover, :focus-visible) .label { transform: translateY(-1.3em) }
```
⚠ Clip the parent, not the label: a clip on the moving element travels with it and never hides the shadow copy.
