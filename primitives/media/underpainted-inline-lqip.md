---
id: underpainted-inline-lqip
category: media
tags: [media,loading,performance,correctness,cls]
axes: none
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
The photograph carrying an opening frame arrives after layout, and until it does
the frame is a flat rectangle of ground. Paint a 150–400 byte version of it
first: encode the image 16–24px wide, inline it as a data URI on a `::before`
beneath the picture, blur it well past its own pixel grid, and over-scale a
little so the blur's soft edge is clipped away. No request, no swap, no layer to
tear down — the real image simply covers it. Blur 20–40px, scale 1.05–1.15.

```css
.shot { position: relative; overflow: hidden; display: block }
.shot::before { content: ""; position: absolute; inset: 0;
  background: url(data:image/webp;base64,…) 50%/cover;
  filter: blur(28px); transform: scale(1.1) }
.shot img { position: relative }
```
⚠ Inline bytes are uncacheable and delay the markup — past ~500 bytes the
placeholder costs more than it saves. Opaque photography only: it shows through
any transparency in the final asset.

Where no version of the image exists ahead of time — a source chosen at
runtime, a field the reader supplies — the underpaint can be a loading
treatment rather than a preview, and the architecture is unchanged: a
gradient sweeping under the slot, covered the instant the real pixels land. No
load event, no state, nothing to tear down. Sweep 1.2–1.8s, and keep the band's
lightest stop within 6–10% of the ground or the frame flashes.
```css
.shot::before { background: linear-gradient(100deg, var(--g) 30%,
  var(--g-lit) 50%, var(--g) 70%) 0 0 / 200% 100%; animation: sweep 1.4s infinite }
```
⚠ It never ends on its own — a source that 404s sweeps forever and reads as a
live request. Give the slot an `error` handler that stops the animation and
shows the failed state.

For a CSS background there is no pseudo-element to add: list the inline
placeholder as the *second* layer of the same `background`, beneath the real
URL. It paints immediately and the real layer covers it on arrival, with the
ground colour as the third fallback.
```css
.hero { background: url(hero.webp) 50%/cover no-repeat,
                    url(data:image/jpeg;base64,…) 50%/cover var(--ground) no-repeat }
```
⚠ No blur is applied in this form — keep the placeholder under ~24px wide so
upscaling smooths it, or it reads as a broken low-resolution image.
