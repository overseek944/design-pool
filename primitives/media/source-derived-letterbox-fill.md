---
id: source-derived-letterbox-fill
category: media
tags: [media,video,responsive,aspect,backdrop,blur]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 2
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
