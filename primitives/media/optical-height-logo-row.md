---
id: optical-height-logo-row
category: media
tags: [media,logos,normalisation,scale,responsive]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Supplied marks are drawn to different conventions — a wordmark fills its box, a
roundel or a mark-over-tagline lock-up wastes half of it — so one uniform height
makes the second kind read as small and timid. Size the row by height rather
than by column width, fluid between the narrow and wide ends, and ship a single
outlier class that raises the stacked lock-ups until they carry the same optical
weight. Two heights covers almost every supplied set.

```css
.row  { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)) }
.row img { height: clamp(1.1rem, 4vw, 1.75rem); width: auto;
           max-width: 100%; object-fit: contain }
.row .stacked { height: clamp(2rem, 6vw, 2.9rem) }   /* 1.5–1.75× */
```
⚠ `minmax(0, 1fr)` is load-bearing: plain `1fr` floors at min-content, so one
wide mark blows the row past its container.

Past two outlier classes, give each mark its own authored height and multiply
them all by one variable. The optical decision is made once per logo and never
revisited; the responsive decision is a single number per breakpoint instead of
a clamp retuned on every mark. It scales a set of any size, and a swapped logo
touches one declaration.
```css
.row    { --logo-h: .82 }
@media (width >= 40rem) { .row { --logo-h: 1 } }
.row img { height: calc(var(--h) * var(--logo-h) * 1px); width: auto }
/* <img style="--h:28"> per mark */
```
