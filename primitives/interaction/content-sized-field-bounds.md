---
id: content-sized-field-bounds
category: interaction
tags: [form,input,layout,detail,progressive-enhancement]
axes: {energy: 1, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
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
