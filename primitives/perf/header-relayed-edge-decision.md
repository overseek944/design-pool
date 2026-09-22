---
id: header-relayed-edge-decision
category: perf
tags: [perf,architecture,ssr,caching,routing,hydration]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A cached HTML shell is byte-identical for every reader, so whatever the edge
decided per request — which route matched, which locale, which bucket — is gone
by the time the document parses, and the client recomputes it or asks again.
Response headers stay per-request while the body stays cacheable: send the fact
as a `Server-Timing` entry and navigation timing hands it back before any script
of yours runs. Pack a few fields into one `description` as a query string, a few
hundred bytes at most.

```js
const d = performance.getEntriesByType('navigation')[0]
  ?.serverTiming?.find(e => e.name === 'route')?.description
const hint = d && new URLSearchParams(d)          // hint.get('locale')
```
⚠ Not every engine exposes `serverTiming`, and a client-side navigation
produces no entry at all — this is a fast path, never the only source, so keep
whatever derives the value from the URL. Cross-origin reads need
`Timing-Allow-Origin`, and everything sent is visible in devtools.
