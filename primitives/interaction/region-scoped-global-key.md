---
id: region-scoped-global-key
category: interaction
tags: [keyboard,interaction,correctness,accessibility,visibility]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A shortcut bound on the document takes its keys from the whole page, so the
region it drives has to earn them. Require that region to be meaningfully
visible — half of it, or an absolute 150–250px, overlapping the viewport, since
a region taller than a short window never reaches any useful ratio. Require the
key to carry no modifier, and the event not to come from somewhere text is
being edited. A rect alone is not enough: it reports the element's own box and
knows nothing about an ancestor clipping it to nothing, so test that ancestor
directly or the keys drive something nobody can see.

```js
const live = el => {
  const c = el.closest('[data-collapsible]')
  if (c && c.getBoundingClientRect().height < 1) return false
  const r = el.getBoundingClientRect()
  return Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)
       > Math.min(200, r.height * 0.5)
}
```
⚠ A modal above the region keeps its geometry underneath it, so gate on the
overlay as well or the shortcut drives content behind a dialog. Arrow keys are
the page's own horizontal scroll — claiming them for a region that is merely
present, rather than the one a reader is looking at, is a regression the reader
cannot see the cause of.
