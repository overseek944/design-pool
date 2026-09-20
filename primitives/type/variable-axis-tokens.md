---
id: variable-axis-tokens
category: type
tags: [type,tokens,opentype,variable-font,precision]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
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
