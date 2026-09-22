---
id: em-pitched-slot-rail
category: layout
tags: [layout,type,indicator,correctness,fluid,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A marker that travels between rows — a caret beside a list, a rule against a
stanza — is normally placed from `offsetTop`, which needs a `ResizeObserver`, a
re-measure on `fonts.ready`, and sits wrong for a frame after each. Where every
row is one line the pitch is already a constant: leading plus gap, both authored
in `em`. Publish slot *n* as `n × pitch` in `em` and the marker follows a
`clamp()` scale, a font swap and reader zoom with nothing measured. Leading
0.95–1.15, gap 0.6–0.9em.

```css
.rail { top: calc(.08em + var(--slot-y, 0em)); transition: top .55s var(--ease) }
[data-slot="1"] { --slot-y: 1.77em }        /* 1.05 leading + .72 gap */
```
⚠ Holds only while no row wraps — one wrapped row shifts every slot below it.
Cap the rows' measure, or fall back to measurement.
