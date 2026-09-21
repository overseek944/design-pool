---
id: canvas-relayed-video-playback
category: media
tags: [media,video,canvas,chrome,performance]
axes: none
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: [video-as-surface-not-frame]
---
A `<video>` carries chrome no attribute removes — a long-press save menu, a PiP
button, controls a platform shows when it likes. Demote it to a decoder: 1×1,
clipped, `opacity: 0`, and relay its frames into a sibling canvas, an ordinary
surface to grade, mask or composite. Drive from `requestVideoFrameCallback`,
`requestAnimationFrame` where absent, backing store at
`min(devicePixelRatio, 1.5–2)`.

```js
const k = Math.max(c.width / v.videoWidth, c.height / v.videoHeight)   // cover
ctx.drawImage(v, (c.width - v.videoWidth*k)/2, (c.height - v.videoHeight*k)/2,
                 v.videoWidth*k, v.videoHeight*k)
v.requestVideoFrameCallback ? v.requestVideoFrameCallback(tick) : requestAnimationFrame(tick)
```
⚠ Decorative footage only — a canvas has no captions, no transport, nothing to
save. Paint the poster until the first frame decodes; stop the loop with the clip.

Relaying is the answer when the frames must be graded or masked. When the only
chrome in the way is the large start-playback button a mobile engine paints over
an inline autoplay loop, the shadow pseudo-element takes it directly and the
video stays a video — one rule against a decode, a canvas and a frame loop.
`controls` omitted does not cover it; the button is injected regardless.
```css
video::-webkit-media-controls-start-playback-button {
  display: none !important; -webkit-appearance: none }
```
⚠ Vendor-prefixed and unstandardised, so it is a progressive enhancement, not a
guarantee — the loop still needs `muted` and `playsinline` or it will not start
at all, and nothing here suppresses a long-press save menu.
