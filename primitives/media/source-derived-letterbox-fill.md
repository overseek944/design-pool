---
id: source-derived-letterbox-fill
category: media
tags: [media,video,responsive,aspect,backdrop,blur]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
A fixed-ratio slot fed media of another ratio either crops it (`cover`) or
leaves dead bars (`contain`). Fill the bars from the asset itself: its own
poster still, `object-fit: cover`, scaled past the box and heavily blurred,
sits behind a `contain` foreground. Nothing is cropped, no flat bar fights the
frame, and a still costs one decode where a duplicated video costs two.
Scale 1.05–1.2, blur 24–64px.

```css
.slot { position: relative; overflow: hidden; background: var(--ink) }
.slot > .wash  { position: absolute; inset: 0; object-fit: cover;
                 scale: 1.1; filter: blur(40px) }   /* the poster frame */
.slot > video  { position: absolute; inset: 0; object-fit: contain }
```
⚠ The wash is decoration — `aria-hidden` with empty `alt`, or the same picture
is announced twice. Scale past the box or the blur samples outside the edge and
leaves a pale rim.

Where the subject has margin of its own — a document, a screenshot, a render on
its own plate — push the bars out rather than filling them in. Keep
`object-fit: contain` and scale the element past its box: the subject crops at
its own edges, the box is covered, and it costs no second decode and no
compositing layer. Scale 1.1–1.4, and set the slot's background to the asset's
*baked-in* margin colour, not to the card's.
```css
.slot { overflow: hidden; background: #000 }     /* the asset's own margin */
.slot > img { object-fit: contain; scale: 1.25 }
```
⚠ Only for subjects with real margin. Past about 1.4 a screenshot loses its own
chrome, which is usually what made it read as a screenshot.

The overscale can be a *preview* state rather than a permanent one. While a
muted clip loops behind a caption it is decoration, and its bars are noise —
scale it past them. Once the reader presses play it is content, and the frame
they chose to watch should be whole: drop the scale on the playing class and
transition it, so the bars return as the controls do. Scale 1.1–1.2 for
2.35:1 bars in a 16:9 slot, 0.25–0.4s.
```css
.card video.bars { scale: 1.15; transition: scale .3s ease-in-out }
.card.is-playing video.bars { scale: 1 }
```
⚠ Flag the asset, not the slot — only footage with bars baked in wants the zoom.

A full-bleed opening film is the same choice made per viewport shape. `cover`
on a landscape screen fills; on a portrait phone the same rule crops a 16:9
frame to its middle third and the subject leaves the shot. Letterbox it there
instead — `contain` on the section's own dark ground — and switch to `cover`
once the viewport is wide enough that the crop keeps the subject. Switch on
aspect, not on a phone breakpoint: 1/1–4/3.
```css
.film { object-fit: contain; background: #000 }
@media (min-aspect-ratio: 1/1) { .film { object-fit: cover } }
```
⚠ The bars sit where overlaid chrome and copy usually go — check that header
and caption stay legible against bare ground as well as against footage.
