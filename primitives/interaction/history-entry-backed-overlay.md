---
id: history-entry-backed-overlay
category: interaction
tags: [interaction,overlay,history,dismiss,mobile,correctness]
axes: none
cost: 2
seen: 1
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
