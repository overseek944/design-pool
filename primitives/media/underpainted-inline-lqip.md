---
id: underpainted-inline-lqip
category: media
tags: [media,loading,performance,correctness,cls]
axes: none
cost: 2
seen: 1
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
