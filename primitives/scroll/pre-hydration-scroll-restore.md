---
id: pre-hydration-scroll-restore
category: scroll
tags: [scroll,navigation,hydration,restoration,architecture]
axes: none
cost: 2
seen: 2
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

A forward navigation needs its own reset, and a global `scroll-behavior: smooth`
silently captures it: `scrollTo({ top: 0 })` after a route change animates the
whole document height, so the reader watches the old page scroll away before the
new one arrives. Pass `behavior: 'instant'` explicitly, and run the reset only on
a push — on a pop, do nothing and let the restore above win.
```js
if (type !== 'POP') location.hash
  ? document.querySelector(location.hash)?.scrollIntoView()
  : window.scrollTo({ top: 0, behavior: 'instant' })
```
⚠ Take the navigation type from the router's own signal, not by comparing URLs —
a back button landing on the route it left is indistinguishable that way.
