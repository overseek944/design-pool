---
id: root-filter-inversion
category: color
tags: [color,dark,filter,invert,theme,effect]
axes: {energy: 2, density: 2, weight: 4, finish: 2}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
`filter: invert(1) hue-rotate(180deg)` on the root flips lightness while
returning hues roughly where they started, so one declaration yields a dark
counterpart to a light design with no token work. The result is a negative
rather than a designed theme — raw, faintly wrong — which is the point when
the mode should read as a switch thrown, not a preference honoured.
Counter-invert photography and marks so they survive, and cross-fade the
filter over .3–.6s or the flip reads as a fault.

```css
html.negative { filter: invert(1) hue-rotate(180deg); transition: filter .45s }
html.negative :is(img, video) { filter: invert(1) hue-rotate(180deg) }
```
⚠ A filtered ancestor becomes the containing block for every descendant
`position: fixed`, so fixed chrome scrolls away. Never the primary dark theme.

That warning is a placement problem, not a law. Put the filter on `body` rather
than on the root and mount everything that must stay unfiltered — the control
that toggles it above all — as a sibling of `body` under `documentElement`, a
node script appends once. Fixed chrome inside the document is still trapped, but
the switch never desaturates or re-anchors itself, which is the failure that
makes the mode unrecoverable.
```js
const host = document.createElement('div')       // sibling of <body>
document.documentElement.appendChild(host)       // portal target
```
```css
html.filtered body { filter: grayscale(1) }
```
⚠ Nothing in the page can reach out of that subtree — a modal portalled to
`body` is filtered, one portalled to the host is not, and a product with both
looks broken in exactly one of its overlays.

Not every root filter is a theme. `grayscale(1)` offered as a reader preference
is the same one-declaration mechanism spent on legibility rather than mood: it
strips hue as a channel, so anything the design encoded in colour alone is
revealed as missing at the moment the reader most needs it. Treat the mode as an
audit you ship — if a status, a chart series or a selected tab becomes
unreadable under it, the fix belongs in the tokens, not behind the switch.
⚠ Persist it and restore it before first paint, or the page flashes in colour on
every navigation for the reader who asked for none.
