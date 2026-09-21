---
id: zero-box-vector-template-store
category: media
tags: [svg,use,defs,architecture,performance,accessibility,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Vector art that recurs — a mark, a seal, a rule cap — repeats its whole path
payload at every occurrence unless it is declared once and referenced. Hold the
geometry in one inline store and pull it with `<use>`. Hiding that store with
`display: none` is the obvious move and the one that breaks quietly: `<symbol>`
still resolves, but a gradient or pattern referenced as a fill from inside an
undisplayed subtree paints nothing, so flat art survives and gradient art arrives
blank. Keep it rendered and make it free instead.

```html
<svg aria-hidden="true" width="0" height="0"
     style="position:absolute;overflow:hidden;contain:strict">…</svg>
<svg class="mark" role="img" aria-label="…"><use href="#seal"/></svg>
```
⚠ `<use>` cannot cross documents — the store ships inline in the same one, ahead
of its first reference or the opening paint shows gaps. `contain: strict` is safe
only because both dimensions are declared zero.
