---
id: pre-hydration-scroll-restore
category: scroll
tags: [scroll,navigation,hydration,restoration,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A client-routed page that restores scroll after hydration shows the top of the
document first and then jumps. Do it in a blocking inline script in the markup
instead, before first paint: stored offsets for the window and for any named
scroll container, else the URL fragment, else the top. Key the store by history
entry rather than by URL — that is what lets two tabs on the same route restore
to different places.

```html
<script>history.scrollRestoration='manual'
 const s=JSON.parse(sessionStorage.getItem(KEY)||'{}')[history.state?.k]
 if (s) for (const q in s) (q==='window'?window:document.querySelector(q))?.scrollTo(s[q].x,s[q].y)
 else location.hash && document.getElementById(location.hash.slice(1))?.scrollIntoView()</script>
```
⚠ Leave `scrollRestoration` on `auto` and the browser's own restore races this
one. Blocking by design: keep it inline and under ~1KB, since a fetched script
lands after the paint it exists to beat.
