---
id: markup-declared-instrumentation
category: perf
tags: [architecture,instrumentation,events,delegation,maintenance]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Declare the event name and its payload as `data-*` attributes and let one
delegated listener resolve them with `closest()`. Components carry no tracking
calls, every instrumented element in the codebase is a single grep, and markup
rendered after load is covered with no rebinding. Fall back to the element's
collapsed text for the label so a missing attribute degrades to something
readable instead of `undefined`.

```js
addEventListener('click', e => {
  const el = e.target.closest('[data-track]'); if (!el) return
  send(el.dataset.track, { section: el.dataset.trackSection,
    label: el.dataset.trackLabel || el.textContent.trim().replace(/\s+/g, ' ') })
}, { passive: true })
```
⚠ Send session-end metrics on `pagehide` with `sendBeacon`, never `unload` —
`unload` disqualifies the page from the back/forward cache and is skipped
outright on mobile.
