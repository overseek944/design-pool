---
id: media-query-parity-listeners
category: perf
tags: [responsive,correctness,architecture,motion,breakpoint]
axes: none
cost: 1
seen: 3
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
