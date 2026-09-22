---
id: three-family-stack
category: type
tags: [type,system]
axes: {energy: 2, density: 3, weight: 3, finish: 4}
cost: 1
seen: 42
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

Both text faces can be serifs — a high-contrast display cut for headings, a
screen text serif for prose, mono for chrome. Nothing about the *category*
separates the two voices any more, so the separation has to be bought in
contrast class and optical size: put real distance between thick-to-thin
ratios, and never let the display cut run below about 28px or the text cut
above about 24px, where they start to look like one face set badly. A stack
this warm needs the mono tier doing more work than usual, since it is now the
page's only technical signal.
⚠ Two serifs is where the fourth-face allowance above disappears — a display
wordmark beside a display heading face reads as a mismatch, not as a mark.

The floor is one, and it costs the separator every other assignment leans on:
with a single text face carrying prose, headings, tables and captions, nothing
can be marked as apparatus by changing family. Slope has to take that job.
Labels, dates, subheads and read-times go italic and one step down in ink, the
roman is reserved for content, and the page reads as a document rather than as
a product. Needs a real italic rather than a synthesised slant, and a weight
range wide enough to set a heading — 400–600 is usually enough.
```css
.meta-label, .post-meta, article h3 { font-style: italic; color: var(--ink-45) }
```
⚠ Slope is then structural, so `em` inside body copy collides with the
apparatus tier — buy emphasis with weight at 600 and leave the italic alone.

A fourth assignment hands the *display* line to the mono. Serif runs the prose,
sans takes the section headings, and the mono is not only the apparatus tier but
the one voice at 48–72px — the page announces itself as an instrument and then
explains itself as a document. It needs the tracking pulled to −0.02 to −0.04em
and the leading down near 1.0–1.1, because a mono's uniform advance widths open
gaps at display size that no other face has; the rag comes out mechanically flat
either way, which is the effect.
```css
h1 { font-family: var(--mono); font-size: clamp(2.25rem, 6vw, 3.75rem);
     letter-spacing: -.03em; line-height: 1.05 }
```
⚠ Only holds for short lines. Past about six words the even colour of a mono at
display size reads as a code block, and the headline stops being read as prose.
