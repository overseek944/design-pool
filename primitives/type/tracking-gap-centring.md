---
id: tracking-gap-centring
category: type
tags: [type,tracking,alignment,optical,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Letter-spacing is added after every glyph *including the last*, so a tracked run
carries one invisible trailing gap and any box measured around it is that much
too wide on the right. Centre it — flex, `text-align`, a `translateX(-50%)` —
and the word sits half a gap left of true centre. At the +0.25 to +0.4em a
stamped micro-label wants, that is a visible misalignment on a short string.
Push it back with `text-indent` equal to the tracking, or zero the spacing on
the final glyph where the letters are already separate elements.
```css
.label { letter-spacing: .34em; text-indent: .34em }    /* always equal */
.mark > span:last-child { letter-spacing: 0 }           /* per-glyph markup */
```
⚠ `text-indent` shifts only the first line, so on a run that wraps it throws
every line after it the other way — single-line labels only. Left-aligned text
needs neither fix; the gap matters only where the box is centred on the run.
