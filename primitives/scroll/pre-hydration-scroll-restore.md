---
id: pre-hydration-scroll-restore
category: scroll
tags: [scroll,navigation,hydration,restoration,architecture]
axes: none
cost: 2
seen: 10
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

A cold load *at* a fragment is the case no stored offset covers: the browser
jumps before late webfonts have set the final layout, and the reader lands
hundreds of pixels off with no history entry to restore from. Re-run the jump
once on `document.fonts.ready`, then wait two frames — the promise resolves
before the reflow it causes has been laid out. Force `scroll-behavior: auto`
around that one call, or a global `smooth` animates the correction and the page
reads as drifting under the reader.
```js
document.fonts.ready.then(() => rAF(() => rAF(() => {
  const s = document.documentElement.style, was = s.scrollBehavior
  s.scrollBehavior = 'auto'; el.scrollIntoView({ block: 'start' }); s.scrollBehavior = was
})))
```
⚠ Decode the fragment before looking it up — a percent-encoded or non-ASCII id
never matches `getElementById`, and the correction silently never runs.

A reload is not a back navigation, and a page whose opening screen is an
authored entrance should say so. Restoring mid-document there drops the reader
past a sequence that has already played to nobody, with no way back to it but a
manual scroll. Read the navigation type rather than guessing from the URL and
reset to the top on `reload` only, leaving `back_forward` to the restore above.
```js
const nav = performance.getEntriesByType('navigation')[0]
if (nav?.type === 'reload') addEventListener('load', () => scrollTo(0, 0), { once: true })
```
⚠ It is the entrance that earns this, not the preference for a tidy top — a
long document reloaded during reading loses the reader's place for nothing.
Never extend it to a fragment the reader arrived at deliberately.

Everything *derived* from scroll position has the same race and no inline script
of its own. A header's ground, a scrollspy, a progress rail all compute at init
against a document still parked at zero, so a restored page paints its opening
state and corrects a frame later. Persist the derived state beside the offset,
render from it, and hold the first recomputation until `pageshow` — by then the
restore has landed and the reading is true. Mark the pre-rendered state so the
runtime knows to wait rather than to trust its own first measurement.
```js
if (bar.hasAttribute('data-restored'))
  addEventListener('pageshow', settle, { once: true })   // settle() clears the mark, then updates
else update()
```
⚠ `pageshow` does not fire on a same-document router pop — pair it with the
router's own signal, or a client-side back leaves the mark set and the state
frozen. Session state must be keyed by path: one value for the whole origin
restores the wrong chrome on every other route.
