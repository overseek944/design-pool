---
id: consent-free-analytics-default
category: perf
tags: [architecture,analytics,third-party,privacy,layout,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
The consent banner is a decision made in the analytics config, not the layout.
Storage is what triggers it, so a tag persisting in memory — no cookie, no
`localStorage` — needs no banner, and the first screen keeps the 60–120px a
desktop bar costs, or the quarter to third of a phone viewport. Turn off what
reintroduces storage: autocapture and session replay both do.

```js
tag.init(KEY, { persistence: 'memory', autocapture: false,
                disable_session_recording: true })
```
⚠ Identity now lasts one pageload: returning readers count as new and
cross-session funnels stop working. Take this where the page is one surface
with one conversion, not where retention is the question being asked.
