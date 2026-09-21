---
id: agent-registered-page-tools
category: interaction
tags: [architecture,progressive-enhancement,interop,capability,lifecycle,feature-detection]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A page can publish a few callable tools to an agent driving the browser instead
of leaving it to scrape rendered DOM. Two shapes are in the wild — per-tool
registration taking an `AbortSignal`, and a whole-set call cleared by passing an
empty list — so detect which exists and keep the teardown each needs, or a
client-side route change leaves stale tools registered. Three to six tools, each
returning text the page already publishes elsewhere, is the useful size; beyond
that the answers drift from the copy.

```js
const mc = navigator.modelContext; if (!mc) return
const ac = new AbortController()
mc.registerTool ? tools.forEach(t => mc.registerTool(t, { signal: ac.signal }))
                : mc.provideContext?.({ tools })
return () => { ac.abort(); mc.provideContext?.({ tools: [] }) }
```
⚠ Absent in most browsers and unstable where present — pure enhancement, never
the only route to anything, and wrap the registration in a `try` because a
partial implementation throws rather than declining.
