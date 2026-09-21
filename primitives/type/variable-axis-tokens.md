---
id: variable-axis-tokens
category: type
tags: [type,tokens,opentype,variable-font,precision]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 13
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

Width is the axis nobody spends. A face carrying `wdth` will hold a display line
at 106–112% where the same design would otherwise reach for another weight step
— presence without the stroke thickening, and the counters stay open. Declare
the range in `@font-face` so the engine instances rather than synthesises, then
step the value by role, not by breakpoint: wider as the type gets larger, body
left at 100%.
```css
@font-face { font-family: Display; font-stretch: 62% 125%; src: url(…) }
.h1 { font-stretch: 112% }  .h2 { font-stretch: 108% }  .h3 { font-stretch: 106% }
```
⚠ Past ~115% the tracking the face was drawn with stops holding and words start
to look spaced rather than wide. Fallback fonts ignore the axis entirely, so the
metric override has to be measured at the stretched width or the swap shifts.

Registered axes are the short list. A face may also carry foundry-named ones —
softness at the terminals, a deliberate unbalancing of the forms, a grade — and
they reach a voice no `wght` step does: the same family becomes editorial or
mechanical without a second file. They are per-face, so they belong in a token
named for the *role*, never in a shared base rule that a fallback family will
inherit and ignore.
```css
:root { --display-var: "opsz" 96, "SOFT" 40, "WONK" 1 }
.display { font-variation-settings: var(--display-var) }
```
⚠ A subset request only ships the axes it names. Omit one from the URL and the
declaration is silently valid and does nothing — the page renders at the axis
default and the difference is invisible in review, visible in print-out.
