---
id: media-query-parity-listeners
category: perf
tags: [responsive,correctness,architecture,motion,breakpoint]
axes: none
cost: 1
seen: 10
requires: []
conflicts: []
completes: []
tension: []
---
Where script and stylesheet must agree on a layout, ask the browser the same
question the stylesheet asked: `matchMedia` with the media expression copied
character for character, never a measured equivalent. At a fractional viewport —
zoom, a HiDPI scale factor — 1439.5px matches neither `max-width:1439px` nor
`min-width:1440px`, so the cascade and `innerWidth < 1440` disagree. Then
register **one listener per condition**: a comma-separated list's `change` fires
only when the OR of its conditions flips.
```js
['(max-width:1439px)', '(prefers-reduced-motion:reduce)', '(max-height:719px)']
  .forEach(q => matchMedia(q).addEventListener('change', relayout))
```
⚠ Make the handler idempotent — two conditions can flip together. A preference
flip changes layout without firing `resize`, so re-measure here too.

Resize is only one of a page's layout invalidations, and a system that measures
should subscribe to all of them through a single debounced entry point: window
`resize` and `load`, `document.fonts.ready` for the reflow when the real face
arrives, a `ResizeObserver` on the measured container for changes no window
event reports, and — where the page carries more than one language — a
`MutationObserver` on `[lang]`, because swapping copy changes every measurement
without firing anything else at all.
```js
const relayout = debounce(() => { measure(); onScroll() }, 60)   // 50–120ms
document.fonts?.ready.then(relayout)
new MutationObserver(relayout).observe(root, { attributeFilter: ['lang'] })
```
⚠ One entry point or the handlers race — two of these fire together routinely.
Make it idempotent and read every measurement in one pass.

A loop that is already running can afford a cheap backstop for the
invalidations nothing reports at all — a sticky header collapsing, an image
landing above the measured element, a late third-party insert. Re-read the
geometry every 60–120 frames inside the existing frame callback, plus once on a
300–500ms settle timer after mount. Two `getBoundingClientRect` reads a second
is nothing next to the draw, and it removes the class of bug where the scene is
correct until something upstream moves.
```js
if (++frames % 90 === 0) measure()            // inside the rAF you already have
setTimeout(measure, 400)                      // post-mount settle
```
⚠ Only for a loop that runs continuously. Hanging a polling re-measure on a
`setInterval` next to an idle scene is the leak this is supposed to avoid.

Rendered on a server there is no `matchMedia` to ask, so a component deriving
layout or motion from a query must declare what the server believes — and that
choice decides whether a reader who asked for reduced motion gets one frame of
it before hydration corrects. Subscribe/read/server-read as three explicit
functions keeps the answer stable across the first client render instead of
guessing in an effect a frame late.
```js
useSyncExternalStore(
  cb => { const q = matchMedia('(prefers-reduced-motion: reduce)')
          q.addEventListener('change', cb); return () => q.removeEventListener('change', cb) },
  () => matchMedia('(prefers-reduced-motion: reduce)').matches,
  () => false)                      // server: the branch the HTML will carry
```
⚠ Returning the *preference* from the server snapshot is the safer default for
anything that hides content; returning `false` is safer for anything that
animates. Pick per query, not once per project.
