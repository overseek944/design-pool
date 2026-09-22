---
id: markup-declared-instrumentation
category: perf
tags: [architecture,instrumentation,events,delegation,maintenance]
axes: none
cost: 1
seen: 9
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

A `data-*` declaration is baked at render and lies the moment a script rewrites
what the element does — a call-to-action authored as an in-page jump and
upgraded to a real download URL on load reports every download as a scroll.
Where the destination is runtime-assembled, classify on the `href` *at click
time* instead: match the live URL against the shapes that mean each outcome,
and keep the near-miss ones apart rather than folding them in, or the headline
number quietly counts the wrong thing.
```js
const u = a.getAttribute('href') || ''
send(/\/download\/[^/]+\/.+\.(dmg|zip|tar\.gz)$/.test(u) ? 'download'
   : u.startsWith('#') ? 'jump' : 'outbound', { version: u.match(/\/v[\d.]+\//)?.[0] })
```
⚠ Every one of these links navigates away, so pin `sendBeacon` — an XHR fired
on click races the unload and loses, and it fails as a low number, not an error.
