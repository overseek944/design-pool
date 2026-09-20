---
id: data-saver-media-branch
category: perf
tags: [performance,media-query,bandwidth,video,progressive-enhancement,accessibility]
axes: none
cost: 1
seen: 1
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
