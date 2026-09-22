---
id: mounted-empty-status-slot
category: interaction
tags: [accessibility,correctness,form,layout,state,css-only]
axes: none
cost: 1
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
A live region only announces if it was in the document before the text arrived,
so an error rendered conditionally is silent the first time it fires. The slot
therefore has to stay mounted — and then it holds space it is not using.
`:empty` reclaims that: out of flow while blank, back in flow the moment it is
written, and no second state to track. Where the slot has its own track beside
the content it costs nothing and needs none of this, so scope the rule to the
width at which the layout stacks. Reserve 1–1.2em of `min-block-size` there
instead wherever the reflow on write reads worse than the gap.

```css
@media (width <= 640px) { .status:empty { position: absolute } }
```
⚠ `:empty` counts whitespace as content — a template that leaves a newline
inside the element never matches it. Render the empty string, not a blank line.

One element can be both the placeholder and the filled state with no branch in
script: `:empty::before` carries the idle instruction in the muted colour, and
`:not(:empty)::before/::after` add the quotation marks that only make sense once
there is something to quote. Keep a `min-block-size` on the slot so a sentence
streamed in a word at a time does not shift the page under it. Reserve 1–1.5
lines.
```css
.said { min-block-size: 1.5em }
.said:empty::before { content: 'Hold the shortcut and just ask'; color: var(--muted) }
.said:not(:empty)::before { content: '\201C' }
.said:not(:empty)::after  { content: '\201D' }
```
⚠ Generated content is skipped by find-in-page and announced inconsistently —
only for wording a reader can afford to miss, never for the value itself.
