---
id: pre-hydration-scroll-restore
category: scroll
tags: [scroll,navigation,hydration,restoration,architecture]
axes: none
cost: 2
seen: 3
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

A stored pixel offset is only valid if the destination renders at the same
length. Restore across anything that re-flows the same page — a locale switch, a
font that lands late, a density or theme toggle — and the reader arrives near
the right place and then somewhere else entirely, because the paragraph they
were on now sits 400px higher. Store a landmark instead: the id of the topmost
element still crossing the viewport's top edge, plus its offset from that edge,
and restore relative to it, keeping the raw offset only as the fallback for a
document with no ids.
```js
const a = { id: el.id, offset: el.getBoundingClientRect().top }   // at departure
top = scrollY + document.getElementById(a.id).getBoundingClientRect().top - a.offset
```
⚠ Re-apply once on `fonts.ready` and once on `pageshow`, but arm the abandon
first — a correction that lands after the reader has started scrolling is
indistinguishable from the page fighting them.
