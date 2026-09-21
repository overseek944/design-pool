---
id: preflight-free-cross-origin-post
category: perf
tags: [performance,forms,architecture,correctness,security]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A cross-origin `POST` sent as `application/json` is not a simple request: the
browser sends an `OPTIONS` preflight and waits for it before a byte of the body
moves, and against an endpoint that answers no CORS headers the submission fails
outright. `text/plain` is on the safelist, so the identical JSON body goes in
one round trip and the receiver parses it exactly the same way — 80–300ms back
per submit, on the interaction least able to afford a stall. Where the reply is
genuinely unused, `mode: 'no-cors'` drops the requirement altogether.

```js
fetch(endpoint, { method: 'POST', body: JSON.stringify(payload),
  headers: { 'Content-Type': 'text/plain' } })      // safelisted → no OPTIONS
```
⚠ One custom header puts the preflight straight back, so credentials travel in
the body. A safelisted type is also how cross-site forgery reaches an endpoint —
the receiver must authorise on something other than the request looking like
yours. Under `no-cors` a rejection is indistinguishable from success: never
report "sent" from it.
