---
id: mount-derived-root-scroll-regime
category: layout
tags: [layout,scroll,architecture,has,routing,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An app shell that locks the root — `html, body { height: 100%; overflow:
hidden }` — has one route that must scroll the document instead. Setting that
imperatively on mount leaves a teardown nobody maintains. Let the root read
its own subtree, so the regime is a fact about what is mounted and unwinds by
itself. Keep a snapshot only for what `:has()` cannot reach — `color-scheme`,
a ground colour — taken before paint and restored from the same record.

```css
html:has(.doc) { height: auto; overflow: hidden auto; overscroll-behavior: none }
body:has(.doc), body:has(.doc) #root { height: auto; overflow: visible }
```
⚠ `:has()` on the root is re-evaluated on every subtree mutation — match one
stable route class, never a state one. Snapshot in a layout effect, not an
effect, or the value recorded is already the override.
