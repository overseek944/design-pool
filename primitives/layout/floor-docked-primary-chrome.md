---
id: floor-docked-primary-chrome
category: layout
tags: [layout,chrome,nav,fixed,accessibility,correctness]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [safe-area-floor-gutter,stateful-chrome-inset-contract]
tension: []
---

Persistent navigation need not sit at the top. Dock it to the bottom edge as a
floating capsule and every section gets its upper edge back — a heading, a
bleeding image or a tonal seam starts at the frame with nothing over it — while
the primary action lands in the thumb zone. Inset 12–28px, capsule height 48–64px. It costs the *end* of every section instead: the page owes a
scroll floor of the capsule plus the inset.

```css
.dock { position: fixed; z-index: 90; display: flex; justify-content: center;
        inset: auto 0 max(20px, env(safe-area-inset-bottom, 0px)) }
main  { padding-block-end: calc(var(--dock-h, 60px) + 2rem) }
```
⚠ Built as a second copy of the header rather than a relocation, it duplicates
every link and landmark in the tab order — the idle copy needs `inert`. Size
against `100dvh`: this is where a mobile browser parks its own toolbar.
