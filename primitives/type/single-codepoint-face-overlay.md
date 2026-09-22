---
id: single-codepoint-face-overlay
category: type
tags: [type,webfont,unicode-range,glyph,detail,brand]
axes: {energy: 1, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A licensed face is almost right and one glyph is wrong — an unslashed zero, a
flat-topped one. Redrawing the family is not the answer: ship a face holding
only those glyphs, set its `unicode-range` to exactly their codepoints, and put
it first in the stack. Every other character falls through untouched; the
overlay costs 1–3KB for one to six glyphs. Best where the glyph recurs —
figures in a data column, a mark inside a wordmark.
```css
@font-face { font-family: Over; src: url(over.woff2); unicode-range: U+30 }
:root { --mono: Over, "Base Mono", ui-monospace, monospace }
```
⚠ Match the base face's advance width per cut, or the glyph steps out of a mono
column. `swap` flashes one character mid-paragraph.
