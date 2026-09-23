---
id: reader-selected-markdown-twin
category: interaction
tags: [architecture,progressive-enhancement,interop,persistence,view-mode,markdown]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Publish every route again as plain markdown at a derived path and let the
reader choose which the page renders. A header toggle of two, at most three,
modes swaps the layout for the fetched text in a monospace block; the choice
persists locally and `?view=` overrides it, so a link opens into either mode.
Derive the twin path from the route, never a lookup table.

```js
const mode = new URLSearchParams(location.search).get('view') ?? localStorage.getItem(KEY)
const src = (location.pathname.replace(/\/$/, '') || '/index') + '.md'
if (mode === 'text') fetch(src, { headers: { Accept: 'text/markdown' } })
```
⚠ Read storage after hydration or the server render mismatches; on a failed
fetch keep the layout rather than blanking the page.

The toggle does not have to live in the header. A two-segment pill fixed at the
bottom centre, 12–24px off the edge, stays reachable at every scroll depth and
on a 390px viewport where the header has already collapsed into a menu.
Remember that the pill covers content, so reserve its height as bottom padding
on the final section.
