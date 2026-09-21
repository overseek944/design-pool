---
id: centre-converged-mark-family
category: media
tags: [media,svg,icon,ornament,geometry,system]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A set of section marks reads as a family when its members share a construction,
not a subject. Fix one box and one centre, then draw each mark as three to six
straight segments that terminate at or pass through that centre, optionally
closed by a single simple figure — a circle, a diamond. Nothing is depicted, so
no mark can be wrong, and a new section earns one by adding a chord. Box
28–44px, stroke 1–1.4px, `fill: none`, `currentColor` so the marks sit in the
text tier beside them rather than in an icon set.

```html
<svg viewBox="0 0 36 44" aria-hidden="true" fill="none"
     stroke="currentColor" stroke-width="1">
  <path d="M3 3L18 22 33 3M3 41L18 22 33 41M18 3v38"/></svg>
```
⚠ Meaningless by construction: each mark needs a text label beside it and must
never be the only thing telling two sections apart. Below ~24px the converging
strokes fill in at the centre — thin the stroke or drop the interior chords.
