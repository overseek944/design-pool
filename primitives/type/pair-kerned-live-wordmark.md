---
id: pair-kerned-live-wordmark
category: type
tags: [type, wordmark, kerning, logo, optical, detail]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A wordmark set in live text inherits the webfont's kerning, which rarely matches
the drawn logo. Keep it as text and apply the drawing's pair table yourself:
one inline-block span per glyph, each pulled by an em offset for the pair it
closes, so the correction scales with `font-size`. Offsets run −0.12 to +0.02em;
LT, AV and TA take the most.
```css
.mark { font-kerning: none; font-synthesis: none; white-space: nowrap }
.mark > span { display: inline-block }   /* style="margin-left:-.115em" per pair */
```
⚠ Split glyphs are read one letter at a time. Mark the spans `aria-hidden` and
name the link with `aria-label`. Turn native kerning off or it stacks with the table.
