---
id: host-mirrored-frame-route
category: media
tags: [media,iframe,embed,history,routing,postmessage,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: [unowned-frame-message-guard]
tension: []
---
An embedded app has no address bar, so its views cannot be linked and back
leaves the page. Have the child post every route change; the host writes it
into its own fragment — push for real navigation, replace for refinements —
and forwards `hashchange` and the frame's `load` back as a navigate message.
A shared link then deep-opens the embed, and closing a pushed view asks the
host for `history.back()` so the entry is consumed, not stacked.

```js
if (d.type === 'route' && ROUTE.test(d.hash))
  history[d.push ? 'pushState' : 'replaceState'](null, '', d.hash)
addEventListener('hashchange', () => f.contentWindow.postMessage({ type: 'go', hash: location.hash }, origin))
```
⚠ Never let a replace create the first fragment — a bare landing URL stays clean.
