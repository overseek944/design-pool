---
id: three-family-stack
category: type
tags: [type,system]
axes: {energy: 2, density: 3, weight: 3, finish: 4}
cost: 1
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
Geometric sans (body/headline) + mono (chrome/code) + display serif (accent).
Three families is the ceiling before a page reads as unedited — but three with
clear jobs reads richer than two.

Inverted assignment — serif for running body prose, geometric sans for
headlines and UI, mono only for micro-labels. The page reads warm and edited
rather than technical, and it holds at body sizes if the serif is drawn for
screen: 18–20px, line-height 1.4, and a text face rather than a display cut.

Third assignment — display serif for *headlines*, sans for body and UI, mono
for the metadata tier only. Unlike serif-as-body it needs no screen-text cut,
because the serif never runs below about 28px, and it gives a technical product
an editorial voice that the sans-headline arrangement cannot reach.

The ceiling counts *text* faces. A fourth cut used for the wordmark alone —
never for a heading, a label or a line of prose — does not read as a fourth
voice, because it appears once per screen in a fixed position and is understood
as a mark rather than as type. That is the one place to spend a face too
mannered to set anything in.

Assign the face at the content root of the route, not globally and not per
component. The default voice sits on the document element; a marketing route
sets the display family on its own `<main>`, a reading route sets the text
family on its. Everything inside inherits, so one component renders in the right
voice wherever it is mounted and no heading rule ever names a family.
```css
html { font-family: var(--ui) }
main[data-voice="display"] { font-family: var(--display) }
main[data-voice="reading"] { font-family: var(--reading) }
```
⚠ This holds only while components inherit — one `font-family` hardcoded in a
shared component pins it to a single voice, and the mistake is invisible until
the second route ships.
