---
id: decoded-probe-codec-select
category: media
tags: [video,codec,transparency,feature-detection,correctness,media]
axes: none
cost: 3
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
`canPlayType` answers about the container, not about what survives the decode:
an engine reports `probably` for a clip carrying alpha, then composites the
transparent regions to black. The honest test decodes a purpose-built probe —
a clear corner and a known opaque swatch — into a small canvas and reads the
pixels back. Try formats in preference order, keep the first that passes,
memoise the promise so a page of clips pays once. Probe 8–32px, abandon at 2–5s.

```js
const p = ctx.getImageData(0, 0, 16, 16).data          // after drawImage(video)
ok(p[3] === 0 && p[547] > 250 && p[544] > 200)         // clear corner + swatch
```
⚠ An unpainted frame reads as all zeroes and passes the clear test — require
the swatch too, retrying on rAF. Each probe holds a decoder: run them in
series, and default to the opaque encode until the answer lands.

Where a probe is more machinery than the case deserves, the engines can be
partitioned declaratively instead: order `<source>` elements so the HEVC-alpha
MP4 comes first with its codec named in the type string, and the VP9-alpha
WebM second. Native source selection then does the split with no script, no
canvas and no first-frame delay, because the two encodes have almost disjoint
support. The `codecs` parameter is load-bearing — without it the MP4 is offered
to engines that take the container and drop the alpha.
```html
<video autoplay muted loop playsinline>
  <source src="o.mp4"  type='video/mp4; codecs="hvc1"'>
  <source src="o.webm" type="video/webm"></video>
```
⚠ It answers no fallback question: an engine matching neither gets nothing at
all, which on a transparent hero is a hole. Keep a still as the poster.
