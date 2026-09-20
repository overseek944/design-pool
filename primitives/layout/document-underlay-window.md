---
id: document-underlay-window
category: layout
tags: [layout,stacking,reveal,video,section,fixed]
axes: {energy: 2, density: 1, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Give the document one fixed, full-viewport media layer at a negative stacking
level, then let every section paint its own opaque ground except the one that
should show it. No pin, no sticky, no scroll listener — the sections themselves
are the aperture. Several windows reveal the same continuous layer, which a
per-section background cannot do: the footage runs between them instead of
restarting. Gate playback on intersection or a covered video decodes for the
whole page.

```css
.underlay { position: fixed; inset: 0; z-index: -1; pointer-events: none;
            width: 100vw; height: 100svh; object-fit: cover }
.section  { background: var(--page) }
.section.window { background: transparent }
```
⚠ `z-index: -1` only reaches behind the page while no ancestor opens a stacking
context and `html`/`body` carry no background — one `transform` above it and the
layer disappears.
