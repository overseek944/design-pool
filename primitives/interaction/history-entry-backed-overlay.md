---
id: history-entry-backed-overlay
category: interaction
tags: [interaction,overlay,history,dismiss,mobile,correctness]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
An overlay opened from a button owns no history entry, so the back gesture — the
primary dismiss on a phone — leaves the site instead of closing it. Push a real
entry when opening, close on `popstate`, and make the close button call
`history.back()` rather than setting state, so both routes run the same
transition and the stack never drifts. The pushed URL can be a route the server
also renders, which makes the overlay linkable for free.

```js
open  = () => (history.pushState(null, '', '/search'), setOpen(true))
close = () => history.back()
useEffect(() => { if (!open) return
  const pop = () => setOpen(false)
  addEventListener('popstate', pop); return () => removeEventListener('popstate', pop) }, [open])
```
⚠ Unmounting without consuming the entry leaves a dead state the reader must
press back through twice. Push once per open, never per state change inside.

In-page state takes `replaceState`, not `pushState`, and the difference is what
the back gesture is expected to undo. An overlay covers the page, so back should
close it; an inline disclosure inside a section does not, so pushing an entry
per open turns back into a panel-by-panel rewind of a page the reader never
left. Replace instead — the URL is copyable and the address bar names what is
open, at no cost to the stack.
```js
history.replaceState(null, '', panel ? '#' + panel.id : '#section')
```

Either verb is a lie until the URL is *read back*. A fragment naming a collapsed
panel has to open it rather than scroll to a hidden box, on cold load and on
every `popstate` — and the same routing has to intercept in-page links, or a
link to the panel from elsewhere on the page scrolls to nothing.
```js
const open = () => { const t = document.getElementById(decodeURIComponent(location.hash.slice(1)))
  if (t) owns(t) ? show(t) : t.scrollIntoView() }
addEventListener('popstate', () => requestAnimationFrame(open))
```
⚠ Decode before the lookup and guard it — a malformed fragment throws out of
`decodeURIComponent` and takes the rest of the boot with it.
