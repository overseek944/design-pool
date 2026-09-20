---
id: font-display-per-role
category: perf
tags: [type,font-loading,cls,performance,correctness]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
`font-display` is a decision per face, not per project. Body and UI text takes
`optional`: roughly 100ms to arrive, then the fallback is kept for the rest of
that page view — no flash, no reflow, and the real face lands on the next
navigation from cache. Display and brand faces take `swap`, because a headline
in the fallback costs more than a headline arriving late. Metric-match the
fallback either way so both outcomes occupy the same box.
```css
@font-face { font-family:Body;    font-display:optional; src:url(body.woff2) }
@font-face { font-family:Display; font-display:swap;     src:url(disp.woff2) }
@font-face { font-family:BodyFB;  src:local(Arial); size-adjust:107%; ascent-override:90% }
```
⚠ `optional` means many first visits never show the body face at all.

Preload changes which value is right. `font-display` governs only the
discovery-plus-fetch window, and a face referenced from CSS is not discovered
until the stylesheet parses. `<link rel=preload as=font crossorigin>` starts
that fetch alongside the HTML and collapses the window, so `swap` is safe on
the one or two faces worth preloading; `optional` stays for the rest.

Split each face by `unicode-range` as well as by weight: the browser fetches
only the subsets the rendered glyphs need, so a Latin page never pays for
Cyrillic. The trap is that one stray character — a `№`, a diacritic — pulls a
whole extra subset for one glyph. Audit the copy.
