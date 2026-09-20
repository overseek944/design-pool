---
id: smooth-scroll-driving-timeline
category: scroll
tags: [scroll,motion,architecture]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 3
seen: 3
requires: []
conflicts: []
completes: [context-scoped-cleanup]
tension: []
---
Pair a smooth-scroll library (Lenis) with the animation library's scroll plugin
by driving one from the other's RAF loop. Without this they run on separate
clocks and scrubbed animations judder against the eased scroll position.
```js
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add(t => lenis.raf(t * 1000))
gsap.ticker.lagSmoothing(0)
```
Mark any internally-scrolling panel `data-lenis-prevent` or it fights the page.

Script that owns the wheel loses it over any embed: a cross-origin iframe
consumes the event inside its own box, so the page stalls dead under the
cursor while the rest of it scrolls. Take the frame out of the event path for
as long as the smoothing is running, and restore it on a deliberate click to
activate. The stopped state wants `overflow: clip`, not `hidden` — `hidden`
leaves a real scroll container that a programmatic scroll can still move
behind the lock.
```css
.smooth iframe { pointer-events: none }
.smooth-stopped { overflow: clip }
```
⚠ A nested scroller must also opt out of the parent's wheel capture *and*
contain its own overscroll, or reaching its end hands the gesture back to a
page that is not listening.
