---
id: data-saver-media-branch
category: perf
tags: [performance,media-query,bandwidth,video,progressive-enhancement,accessibility]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
`prefers-reduced-data: reduce` is a reader saying their connection costs money,
and a decorative hero video is the first thing that should go. The branch is
not a lesser page — it is the same page with every non-informative byte
removed: footage replaced by the ground it was sitting on, decorative image
bands dropped, remaining media deferred. Target 10–25% of the default transfer.

```css
@media (prefers-reduced-data: reduce) {
  video, .decor-band { display: none }
  .hero { background: var(--ink) }
}
```
⚠ It never fires by default and support is partial, so the branch may only
remove. Put no layout, contrast or content decision inside it.

The query has a script-side twin that actually fires: `navigator.connection.saveData`
is set by the browser's own data-saver switch, which readers turn on far more
often than they set a CSS-level preference. Fold it into the same predicate as
reduced motion and resolve one boolean at startup — a reader on a metered
connection and a reader who asked for stillness both want the static branch,
and downstream code should not have to know which one it is serving.
```js
const still = matchMedia('(prefers-reduced-motion: reduce)').matches ||
              !!navigator.connection?.saveData
```
⚠ Chromium-only and absent behind privacy settings, so it may only add
restraint — never gate content or a control on it being false.
