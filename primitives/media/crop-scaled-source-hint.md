---
id: crop-scaled-source-hint
category: media
tags: [media,correctness,responsive,performance,loading]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`sizes` states the width the browser has to fill, and under `object-fit: cover`
that is not the layout box. A wide photograph cropped into a tall narrow frame
throws most of its width away, so a `100vw` hint picks a source sharp across the
box and soft across the subject — the one place anyone looks. Declare the width
actually consumed: box width times the crop factor, which is source aspect over
displayed aspect. Usually 1.5–3× at the narrow end, and one `srcset` serves both
crops.

```html
<img srcset="…887w, …1200w, …1774w" sizes="(max-width: 48em) 300vw, 100vw">
```
```css
.shot { object-fit: cover; aspect-ratio: 2/1 }
@media (width < 48em) { .shot { aspect-ratio: auto; height: 78svh } }
```
⚠ It buys sharpness with bandwidth — a phone downloads a desktop-sized file.
Spend it on the one image carrying the page, never on a grid of them.
