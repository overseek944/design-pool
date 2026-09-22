---
id: idle-hydrated-visible-media
category: media
tags: [media,video,performance,bandwidth,first-paint,scheduling]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: [aspect-locked-media]
tension: []
---
Media already on screen at first paint cannot be approach-loaded — there is no
approach. Move the cost in time rather than in space: ship `preload="none"` with
the URL parked on `data-src`, and hydrate it only once the load event has fired
and the main thread goes idle. The bytes then never compete with the largest
contentful paint, and the clip arrives a moment after the page is usable. Idle
timeout 1.5–3s, 150–400ms for the timer fallback.

```js
const hydrate = () => { const s = v.querySelector('source[data-src]')
  s.src = s.dataset.src; s.removeAttribute('data-src'); v.load() }
const go = () => requestIdleCallback?.(hydrate, { timeout: 2000 }) ?? setTimeout(hydrate, 200)
document.readyState === 'complete' ? go() : addEventListener('load', go, { once: true })
```
⚠ Supply a poster: without one the slot is blank for the whole deferral, which
is longer than the fetch it replaced. `requestIdleCallback` is absent in Safari,
so the timer is the path most readers take.
