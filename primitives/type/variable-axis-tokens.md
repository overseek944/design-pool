---
id: variable-axis-tokens
category: type
tags: [type,tokens,opentype,variable-font,precision]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 9
requires: []
conflicts: []
completes: []
tension: []
---
A variable face is a continuum, not nine presets — so name the exact weights the
design wants (510, 590, 680) rather than snapping to the round hundreds, and
hand the optical-size axis back to the browser so small text thickens and
display sizes refine on their own. Park character alternates in one token beside them, and
apply slashed zero only where digits are read, not everywhere.

```css
:root {
  --font-variations: "opsz" auto;
  --font-features: "cv01", "ss03";
  --w-medium: 510; --w-semibold: 590; --w-bold: 680;
}
body { font-variation-settings: var(--font-variations);
       font-feature-settings: var(--font-features) }
.tabular { font-feature-settings: var(--font-features), "zero" }
```
⚠ Non-round weights have no synthetic fallback — set `font-synthesis: none` so a failed font load degrades visibly rather than smearing.

Ship a real italic — a second variable file over the same weight range, not a
synthesised oblique. With `font-synthesis: none` that pair is what keeps
emphasis from shearing. It doubles the payload, so it earns its place only where
italic carries meaning.

`font-feature-settings` inherits, and feature *indices* are per-face: `ss01` set
on `:root` reaches every family below, where the same tag selects an unrelated
alternate or nothing. Reset to `normal` wherever the family changes — the mono
tier especially — or scope the tokens per family.

`opsz: auto` is the right default and the wrong one for a system whose headings
are UI, not display type. Auto binds the axis to the rendered size, so a 40px
heading gets the refined, tightly-spaced cut a poster wants; pin the axis to the
*role's* voice instead — coarsely bucketed, deliberately below the pixel size —
and a large heading keeps the sturdier letterforms of the interface it belongs
to. Three buckets is enough: body, heading, display.
```css
:root { --opsz-body: 14; --opsz-head: 20; --opsz-display: 24 }
h2 { font-size: 40px; font-variation-settings: "opsz" var(--opsz-head), "wght" 520 }
```
⚠ Pinning below the rendered size thickens strokes and opens spacing, so the
optical tracking the face would have applied is now yours to set — expect to
take 0.01–0.02em back out by hand.
