---
id: find-reachable-collapse
category: interaction
tags: [accessibility,correctness,disclosure,search,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Collapsed content the browser's own find cannot reach is content a reader
cannot locate. `hidden="until-found"` hides a subtree but leaves it searchable:
find-in-page, fragment navigation and scroll-to-text all reveal it and fire
`beforematch` first, so a panel can open itself without script watching for it.
It survives only if the reset spares it — the usual `[hidden] { display: none }`
matches the attribute whatever its value and destroys the behaviour. Exempt
that one value, and keep the selector at zero specificity with `:where()` so
utilities still win.

```css
[hidden]:where(:not([hidden=until-found])) { display: none !important }
[hidden=until-found] { content-visibility: hidden }
```
⚠ Only `content-visibility: hidden` is revealable. A region also given
`display: none` anywhere else in the cascade stays invisible to find, and so
does anything inside a subtree skipped by `content-visibility: auto`.
