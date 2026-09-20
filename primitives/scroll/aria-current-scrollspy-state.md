---
id: aria-current-scrollspy-state
category: scroll
tags: [accessibility,navigation,scroll,state,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A table of contents entry is a location, and the platform has a word for it. Set `aria-current="location"` rather than an `.is-active` class:
the position is announced, styling keys off the attribute a screen reader
already reads, and there is no second source of truth to drift. Mark it with a 2–3px border
pulled back by the rail width so it sits on the line, not beside it.
```css
.toc nav { border-left: 1px solid var(--line) }
.toc a { border-left: 2px solid transparent; margin-left: -1px }
.toc a[aria-current="location"] { border-left-color: currentColor }
```
⚠ `page` marks the current document in a site nav, `location` a position
within it. Both at once reads as two current items.
