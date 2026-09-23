---
id: stylesheet-failure-reload-guard
category: perf
tags: [correctness,performance,progressive-enhancement,architecture,cls]
axes: none
cost: 2
seen: 2
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

An app shell behind a service worker fails the same way one layer up: the
worker serves a precached document whose hashed bundles are gone, and no asset
404s visibly. Invert the signal — the app calls a ready hook once mounted, and
a head script armed with a 4–8s timer treats silence as staleness: unregister
every worker, delete every Cache Storage entry, reload once. A `sessionStorage`
flag set before the reload and cleared by the ready hook stops a real crash
from looping.
```js
setTimeout(()=>{if(ready||sessionStorage.heal)return;sessionStorage.heal=1;
navigator.serviceWorker.getRegistrations().then(r=>Promise.all(r.map(x=>x.unregister())))
.then(()=>caches.keys()).then(k=>Promise.all(k.map(c=>caches.delete(c)))).then(()=>location.reload())},5000)
```
⚠ A slow device that mounts past the timer gets a needless reload — measure
real time-to-mount and set the ceiling well past its tail.
