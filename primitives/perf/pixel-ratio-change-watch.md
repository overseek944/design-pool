---
id: pixel-ratio-change-watch
category: perf
tags: [performance,canvas,correctness,resize,media-query,dpr]
axes: none
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
Device pixel ratio changes when a window is dragged between monitors or the
browser is zoomed, and it fires no `resize` and no `change` on any standing
query — a backing store sized for the old ratio then stays soft or oversized
for the rest of the session. Watch it with a query built from the current
value, and rebuild the query inside its own handler, because once the ratio
moves that query is false forever.

```js
let mq
const arm = () => { mq?.removeEventListener('change', onChange)
  mq = matchMedia(`(resolution: ${devicePixelRatio}dppx)`)
  mq.addEventListener('change', onChange) }
const onChange = () => { arm(); resize() }
arm()
```
⚠ Remove the old listener before re-arming or every zoom step leaves one
behind. A `ResizeObserver` does not cover this — the CSS box is unchanged.

Pinch zoom is the leg the resolution query cannot see: it leaves
`devicePixelRatio` alone and changes `visualViewport.scale` instead, so a canvas
stays at the unzoomed backing size and goes visibly soft exactly when someone is
trying to look closely. Multiply the buffer by that scale and re-observe on the
visual viewport's own `resize`, which is the only event the gesture fires.
```js
visualViewport?.addEventListener('resize', onChange)
const buf = Math.round(cssW * devicePixelRatio * (visualViewport?.scale ?? 1))
```
⚠ A pinch can push the buffer past any area budget the effect has — clamp after
multiplying, not before. Cost scales with the square of the gesture, so this is
for a surface someone reads, not a full-bleed decorative field.

The arithmetic above reconstructs something the platform will state outright. A
`ResizeObserver` entry carries `devicePixelContentBoxSize` — the box in real
device pixels, already carrying the ratio, the zoom and whatever sub-pixel
rounding the compositor applied — so the backing store can be set from it and is
exact rather than within a pixel. Keep the multiply as the fallback branch; the
field is absent on older engines.
```js
ro = new ResizeObserver(([e]) => {
  const d = e.devicePixelContentBoxSize?.[0]
  canvas.width = d ? d.inlineSize : Math.round(e.contentRect.width * dpr * scale) })
ro.observe(el, { box: 'device-pixel-content-box' })
```
⚠ Observing with that box throws where it is unsupported — wrap the call and
re-observe with the default box on the catch, or one unsupported engine loses
resize handling altogether rather than losing precision.
