---
id: language-conditional-type-tokens
category: type
tags: [type,i18n,tokens,localisation,correctness]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
The type scale is a function of script, not only viewport. Redefine size cap,
measure and weight per `:lang()` so a headline that fits one language does not
overflow in another. Romance languages run 15–25% longer and
want a lower cap over a wider `ch` measure; CJK and Thai need 1.2–1.4 leading;
a Latin variable face falling back to a system CJK face renders optically
lighter, so its weight token rises a step.

```css
:where(:lang(zh)) { --w-normal: 400; --w-bold: 500 }
:lang(fr) .title  { --size-cap: var(--fs-sm); max-width: 42ch }
:lang(th) .title  { line-height: 1.25 }
```
⚠ `:lang()` reads the declared `lang` attribute — if missing, the page keeps
Latin values with no visible failure until a translation ships.

Negative display tracking is also a Latin value. Han glyphs sit on a square
em with built-in side space, so a −.03 to −.05em headline token jams them —
zero every tracking token under a CJK `lang`, and lift headline leading to
1.3–1.4. Latin runs embedded in that page (product names, a quoted term) then
need their own `lang="en"` island that restores the Latin tokens, and every
CJK override has to exclude it or the island inherits the reset.
```css
:lang(zh) { --tracking-tight: 0em }
:lang(zh) h1:not([lang=en], [lang=en] *) { letter-spacing: normal; line-height: 1.35 }
[lang=en] { --tracking-tight: -.04em }
```
