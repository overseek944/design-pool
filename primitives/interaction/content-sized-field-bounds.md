---
id: content-sized-field-bounds
category: interaction
tags: [form,input,layout,detail,progressive-enhancement]
axes: {energy: 1, density: 1, weight: 2, finish: 4}
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
`field-sizing: content` lets an input measure its own value, retiring the
scroll-inside-a-box and the hidden mirror span that faked it. The declaration
alone is not shippable — the bounds around it are what make it usable. A
`min-width` in `ch` keeps an emptied inline field from collapsing to a zero-width
target, and a `max-height` stops a pasted essay shoving everything under it off
screen; past the ceiling it scrolls again, which is right. Inline floor 1.5–3ch,
composer 2–5 lines resting against a 6–10 ceiling.

```css
.inline-edit { field-sizing: content; min-inline-size: 2ch; padding: 1px 2px }
.compose     { field-sizing: content; min-block-size: 3lh; max-block-size: 8lh;
               resize: none; overflow-y: auto }
```
⚠ Unsupported outside Chromium at time of writing: the declaration is dropped
and the bounds become the size. Pick a resting floor that is a usable box on its
own, not a one-line stub.

At display sizes the floor cannot be in `ch`. A field whose `font-size` is a
`clamp()` has a `ch` that moves with the viewport, so one `3ch` minimum is a
different target at each end of the ramp — set the floor in px and it means one
box. `max-width: 100%` is the other half: a content-sized field has no width of
its own to be constrained by, and a long value walks straight out of its track.
```css
.title { field-sizing: content; font-size: clamp(32px, 4vw, 44px);
         min-width: 180px; max-width: 100% }
```
⚠ An `auto` track grows with the field anyway. The cap needs a track with a
definite maximum — `minmax(0, 1fr)` — or there is nothing for 100% to resolve
against.
