---
id: prerender-gated-first-view
category: perf
tags: [performance,correctness,analytics,navigation,prerender]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A page can be fully loaded, scripted and laid out with nobody having seen it —
a speculation-rules prerender runs the whole boot in a hidden tab. Anything
asserting a *view* must wait on activation rather than load: a pageview beacon,
an impression, autoplay, a dwell timer. `document.prerendering` reports the
state and `prerenderingchange` fires once when the tab surfaces; resolve both
into one promise so an ordinary load takes the same path. Start every clock
there too — a prerender can sit unshown for 1–60s, and a timer begun at boot
reports that gap as reading time.

```js
const seen = document.prerendering
  ? new Promise(r => addEventListener('prerenderingchange', r, { once: true }))
  : Promise.resolve()
seen.then(() => { t0 = performance.now(); beacon('pageview') })
```
⚠ Gate only what claims a human was present — deferring the fetch behind the
same promise defeats the prerender.

The rules that cause this are one block, and the only subtraction that matters
is files. A document-scope list can name the whole site with `href_matches:
"/*"`, then exclude anything carrying an extension in a single clause — a
prerendered PDF or archive is a download nobody asked for. `eagerness:
"moderate"` arms on hover and pointerdown rather than on sight, which is what
makes a site-wide pattern affordable at all.
```html
<script type="speculationrules">{"prerender":[{"where":{"and":[
  {"href_matches":"/*"},{"not":{"href_matches":"/*.*"}}]},"eagerness":"moderate"}]}</script>
```
⚠ Exclude logout, delete and any other state-changing GET by path — a prerender
runs it for real. `"eager"` on a site-wide pattern boots every link in the nav
at once, which is two or three full page loads the reader never opens.
