---
id: scroll-coupled-mat-inset
category: scroll
tags: [scroll,clip-path,radius,hero,progress]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
An opening section can be full bleed and, once the page moves, a mounted frame.
Drive `clip-path: inset()` from the first screen of scroll, raising the side
insets and the corner radius on one curve, and the section lifts off the window
edges — nothing reflows, so the headline never shifts. Take both as a fraction
of viewport width under a hard cap — near 1.2% inset and 4.5% radius, capped at
16px and 64px — or a wide display rounds into a pill. Travel 300–500px.

```js
const p = 1 - (1 - Math.min(1, scrollY / 420)) ** 2
const i = Math.min(16, .012 * innerWidth) * p, r = Math.min(64, .045 * innerWidth) * p
el.style.clipPath = `inset(0 ${i}px round ${r}px)`
```
⚠ Coalesce the passive listener into one rAF write and give the section
`contain: paint`, or a clip write per event repaints the viewport.
Under `prefers-reduced-motion` set the settled value once and never track.

Scaling the section is the other construction, and it is not the same picture:
a clip cuts the frame and leaves the type inside at rest, where `transform:
scale()` shrinks the contents with it, so the opening reads as a whole plate
being set down rather than as a window closing. It buys a single threshold and a
CSS transition instead of a value written per frame — nothing to coalesce and
nothing on the main thread. Scale 0.88–0.94, radius 2–4rem, 600–800ms.
```css
.stage { transition: transform .7s cubic-bezier(.4,0,.2,1), border-radius .7s }
[data-scrolled] .stage { transform: scale(.9); border-radius: 3rem }
```
⚠ The text is resampled at a non-integer factor for the whole settled state, not
just in flight — keep the factor close to 1 and never put the page's smallest
type on a scaled stage.
