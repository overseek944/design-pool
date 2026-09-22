---
id: analytic-stand-in-until-live
category: perf
tags: [data,loading,architecture,visualisation,labelling]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A visual driven by a live feed has three bad first frames: empty, a spinner, or
a stale last value. Paint a closed-form approximation instead — a circular
orbit, a seasonal curve, a nominal distribution — advancing at a believable rate
from the first paint, and swap the source of truth when the fetch resolves. Both
drive the same renderer, so there is no second code path, no layout shift and no
visible handover. The label carries the honesty: it names the model until the
data lands, and only then says live.

```js
let sample = t => model(t)                  // analytic, running immediately
fetch(feed).then(r => r.json()).then(d => {
  sample = t => interpolate(d, t)           // same renderer, new source
  label.textContent = 'live'
}).catch(() => {})                          // model keeps running
```
⚠ Never let the stand-in claim liveness, and gate the label on the data
arriving rather than on the request starting. A page that degrades to plausible
beats one that degrades to empty.

A readout that *polls* has a fourth bad frame the three above miss: the
refresh that fails. Collapsing to the error state there blanks a number the
page has already committed layout to, so a figure the reader was looking at
becomes a dash and the block reflows — for a network blip. Branch the failure
on whether any good value was ever held: no data yet is an error, data already
shown is a stale reading that stays. Refresh on `visibilitychange` as well as
on the interval, and abort the in-flight request before starting the next.
```js
.catch(e => { if (e.name !== 'AbortError')
  setState(s => s.data ? { status: 'ready', data: s.data }   // keep the figure
                       : { status: 'error', data: null }) })
```
⚠ Silent staleness is its own lie past a point — carry the timestamp and say
"as of …" once the value outlives two or three intervals. Intervals under
~60s on a tab left open all day are a cost nobody asked for.
