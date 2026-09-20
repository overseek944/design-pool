---
id: stylesheet-failure-reload-guard
category: perf
tags: [correctness,performance,progressive-enhancement,architecture,cls]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A hashed stylesheet that 404s after a deploy paints the whole document unstyled,
and nothing retries it. Hide the root before first paint, catch asset failures
on the capture phase, and reload *once* with a cache-busting param; on the
second failure reveal the unstyled page rather than loop. Two escape hatches are
mandatory: a `<noscript>` rule that un-hides immediately, and a ceiling timer, so
no path can leave the document blank.

```html
<style>html.pending{visibility:hidden}</style>
<noscript><style>html.pending{visibility:visible}</style></noscript>
<script>addEventListener('error',e=>{if(e.target.rel!=='stylesheet')return;
if(retry)return reveal();location.replace(bust(location.href))},true)</script>
```
⚠ Poll `link.sheet` for still-parsing sheets, and cap the wait at 5–20s. The
hidden root delays FCP by exactly the stylesheet's fetch — only worth it where
the unstyled flash is worse than the wait.
