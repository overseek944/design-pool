---
id: column-registered-overlay-chrome
category: layout
tags: [layout,overlay,alignment,correctness,chrome]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Chrome floating over a full-bleed stage — a stat strip, a scrub rail, a caption —
should start on the same line as the centred column below it, or the page runs
two rhythms. Reuse the column's own rule and add `inset-inline: 0`: auto inline
margins are ignored on an absolutely positioned box while either offset is
`auto`, so the wrapper silently left-aligns until both are set. With no wrapper
to reuse, offset onto the column directly — the `max()` is what stops that value
going negative once the viewport drops under the cap.

```css
.overlay { position: absolute; inset-inline: 0; margin-inline: auto;
           width: min(100% - 2 * var(--gutter), var(--max)) }
.rail    { position: absolute; inset-inline: max(var(--gutter), 50% - var(--max) / 2) }
```
⚠ `--max` 1040–1280px, gutter 20–28px — and the same pair the column uses, or
the two drift at the next edit.
